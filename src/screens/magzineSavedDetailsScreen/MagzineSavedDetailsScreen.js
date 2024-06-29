import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
  Share,
  ImageBackground,
  Linking,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, imageConstant} from '../../utils/constant';
import CommonMagzHeader from '../../components/CommonMagzHeader';
import CommonMagzImage from '../../components/CommonMagzImage';
import CommonMagzBottom from '../../components/CommonMagzBottom';
import Modal from 'react-native-modal';
import {
  getAllNestedComment,
  hidePost,
  postAllComment,
  putFollowing,
  putLikeComment,
  putLikePost,
  putSavePost,
  putUnfollowing,
  putUnlikeComment,
  putUnlikePost,
  putUnsavePost,
  reportPost,
} from '../../redux/reducers/authSlice';
import {getTrueFalseByYandN} from '../../utils/functions';
import {useDispatch, useSelector} from 'react-redux';
import CommonCommentModal from '../../components/CommonCommentModal';
import Feather from 'react-native-vector-icons/Feather';
import CommonButton from '../../components/CommonButton';
import CommonTextInput from '../../components/CommonTextInput';
import apiClient from '../../utils/baseUrl';
import CommonNestedCommentModal from '../../components/CommonNestedCommentModal';
import toastShow from '../../utils/Toast';
import styles from './Styles';

const MagzineSavedDetailsScreen = ({
  item,
  index,
  navigation,
  updateFollowStatus,
  updateLikeStatus,
  updateSaveStatus,
  updateCommentsLike,
  handleCommentByPostId,
  handeCmntAndLikeCountInPosts,
  commentList,
  setCommentList,
}) => {
  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const userProfileData = useSelector(state => state?.auth?.curretUser);
  const userProfileId = userProfileData?.id;
  const [sideModalVisible, setSideModalVisible] = useState(false);
  const [sideModalId, setSideModalId] = useState('');
  const [checkIdForReport, setCheckIdForReport] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [activeCommentPage, setActiveCommentPage] = useState(1);
  const [hideModalVisible, setHideModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [reportSelected, setReportSelected] = useState('');
  const [otherDescriptionError, setOtherDescriptionError] = useState('');
  const [reportCategory, setReportCategory] = useState('');
  const [reportCategoryModalVisible, setReportCategoryModalVisible] =
    useState(false);
  const [hiddenMessages, setHiddenMessages] = useState([]);
  const [idForShowMsg, setIdForShowMsg] = useState('');
  const [idForShowMsgReport, setIdForShowMsgReport] = useState('');
  const [nestedCommentList, setNestedCommentList] = useState([]);
  const [nestedCommentId, setNestedCommentId] = useState('');
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [nestedComment, setNestedComment] = useState('');
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isDelete, setDelete] = useState('');
  const idState = item?.postId;
  const isHidden = hiddenMessages.includes(idState);

  const handleGestureEvent = ({nativeEvent}) => {
    if (nativeEvent?.translationX > 100) {
      console.log('Swipe right');
      navigation.goBack();
    } else if (nativeEvent?.translationX < -100) {
      console.log('Swipe left');
      navigateToMagzBrowser();
    }
  };

  const handleHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent?.state === State.END) {
      scrollViewRef?.current?.setNativeProps({
        translationX: 0,
        translationY: 0,
      });
    }
  };
  const navigateToMagzBrowser = () => {
    Linking.openURL(item.link);
  };
  const sideModal = id => {
    setSideModalVisible(true);
    setSideModalId(id);
  };
  const gotoProfilePage = id => {
    if (userProfileId == id) {
      navigation.navigate('DrawerTabNavigation');
      navigation.navigate('BottomTabNavigation');
      navigation.navigate('NewMyProfile');
    } else {
      navigation.navigate('OtherProfileView', {
        IdDetails: id,
      });
    }
  };

  const onFollowing = async id => {
    try {
      const res = await dispatch(putFollowing(id));
      if (res?.payload?.data === 'Y') {
        updateFollowStatus(id, res?.payload?.data);
      }
    } catch (error) {
      console.error('Error while following:', error);
    }
  };

  const onUnfollowing = async id => {
    try {
      const res = await dispatch(putUnfollowing(id));
      if (res?.payload?.data === 'N') {
        updateFollowStatus(id, res?.payload?.data);
      }
    } catch (error) {
      console.error('Error while unfollowing:', error);
    }
  };

  const handleLikePost = async pstId => {
    try {
      const res = await dispatch(putLikePost(pstId));
      updateLikeStatus(pstId, res?.payload?.data);
    } catch (error) {
      console.error('Error while liking post:', error);
    }
  };

  const handleUnlikePost = async pstId => {
    try {
      const res = await dispatch(putUnlikePost(pstId));
      updateLikeStatus(pstId, res?.payload?.data);
    } catch (error) {
      console.error('Error while unliking post:', error);
    }
  };

  const handleSavePost = async id => {
    const res = await dispatch(putSavePost(id));
    if (res?.payload?.data === 'Y') {
      updateSaveStatus(id, res?.payload?.data);
    }
  };

  const handleUnSavePost = async id => {
    const res = await dispatch(putUnsavePost(id));
    if (res?.payload?.data === 'N') {
      updateSaveStatus(id, res?.payload?.data);
    }
  };

  const handleLikeComment = async id => {
    try {
      const res = await dispatch(putLikeComment(id));
      updateCommentsLike(res?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlikeComment = async id => {
    try {
      const res = await dispatch(putUnlikeComment(id));
      updateCommentsLike(res?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCommentData = data => {
    const reqComemnts = [...commentList, data];
    setCommentList(reqComemnts);
  };
  const handlePostComment = async id => {
    try {
      if (comment !== '') {
        const data = {comment, id};
        const res = await dispatch(postAllComment(data));
        handleUpdateCommentData(res?.payload?.data);
        handeCmntAndLikeCountInPosts(id, res?.payload?.totalComments);
        setComment('');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleComment = id => {
    handleCommentByPostId(id, true);
    setActiveCommentPage(1);
    setModalVisible(true);
  };

  const handleLoadMoreComments = () => {
    handleCommentByPostId(item?.postId, false, activeCommentPage + 1);
    setActiveCommentPage(activeCommentPage + 1);
  };

  const listEmptyComponentModal = () => {
    return (
      <View style={styles.notFoundView}>
        <Text style={styles.notFoundText}>No Comments yet</Text>
      </View>
    );
  };

  const modalRenderItem = ({item, index}) => {
    return (
      <CommonCommentModal
        item={item}
        handleCommentLike={() =>
          getTrueFalseByYandN(item?.userLike)
            ? handleUnlikeComment(item.commentId)
            : handleLikeComment(item.commentId)
        }
        getTrueFalseByYandN={getTrueFalseByYandN}
        handleReply={() => handleReply(item.commentId)}
      />
    );
  };

  const modalNestedRenderItem = ({item, index}) => {
    return <CommonNestedCommentModal item={item} />;
  };

  const handleReply = id => {
    setReplyModalVisible(true);
    setNestedCommentId(id);
    dispatch(getAllNestedComment(id)).then(response => {
      if (response.payload !== null) {
        setNestedCommentList(response.payload);
        setNestedViewModal(true);
      } else {
        setNestedCommentList([]);
      }
    });
  };

  const handlePostNestedComment = async id => {
    if (nestedComment !== '') {
      const data = {
        comment: nestedComment,
      };
      const res = await apiClient.post(`comment/${id}/nested`, data);
      if (res.status === 200) {
        handleUpdateNestedCommentData(res.data.data);
        setNestedComment('');
      }
    }
  };

  const handleUpdateNestedCommentData = data => {
    const reqComemnts = [...nestedCommentList, data];
    setNestedCommentList(reqComemnts);
  };

  const onShare = async () => {
    try {
      const shareOptions = {
        title: 'Share via',
        message: `You are invited to experience the Nero. Please download the app to get started: will update soon`,
        url: 'https://www.google.com',
        subject: 'subject',
      };
      const result = await Share.share(shareOptions);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        console.log(
          'props.navigation.navigateprops.navigation.navigate',
          result.action,
        );
        props.navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const hideModal = () => {
    setSideModalVisible(false);
    setHideModalVisible(true);
  };

  const reportModal = () => {
    setReportModalVisible(true);
    setSideModalVisible(false);
  };

  const onHandleReportPost = () => {
    if (selectedOption) {
      const data = new FormData();
      data.append('postId', sideModalId);
      data.append('reportType', reportSelected);
      data.append('reportCategory', reportCategory);
      data.append('report', selectedOption);

      dispatch(reportPost(data));
      setSideModalVisible(false);
      setIdForShowMsgReport(sideModalId);
      setReportModalVisible(false);
      setReportCategoryModalVisible(false);
      setSelectedOption('');
      setReportCategory('');
      setReportSelected('');
      // getAllPostData();
    } else {
      // setOtherDescriptionError(selectedOption ? '' : DEFAULT_MESSAGE);
    }
  };

  const onHandleHidePost = () => {
    const data = new FormData();
    data.append('postId', sideModalId);
    data.append('text', selectedOption);

    dispatch(hidePost(data));
    setIdForShowMsg(sideModalId);
    setHideModalVisible(false);
    setSideModalVisible(false);
    setSelectedOption('');
  };
  const onHandleOther = text => {
    if (text.length !== 0) {
      setSelectedOption(text);
      setOtherDescriptionError('');
    } else {
      setSelectedOption('');
    }
  };
  const RadioButton = ({label, selected, onSelect}) => {
    return (
      <TouchableOpacity style={styles.radioTouch} onPress={onSelect}>
        {selected ? (
          <ImageBackground source={imageConstant.black} style={styles.radiobg}>
            <Image source={imageConstant.white} style={styles.radioImg} />
          </ImageBackground>
        ) : (
          <Image source={imageConstant.black} style={styles.radioelse} />
        )}
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const SelectReport = ({label, selected, onSelect}) => {
    return (
      <TouchableOpacity style={styles.radioTouch} onPress={onSelect}>
        <Image
          source={imageConstant.leftarrow}
          style={styles.selectImg}
        />
        <Text
          style={{
            ...styles.selectText,
            color: selected ? colorConstant.gray : colorConstant.white,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const toggleHiddenMessage = postId => {
    if (hiddenMessages.includes(postId)) {
      setHiddenMessages(hiddenMessages.filter(id => id !== postId));
    } else {
      setHiddenMessages([...hiddenMessages, postId]);
    }
  };
  const handleDeletePost = () => {
    apiClient
      .delete(`post/delete?postIds=${sideModalId}`)
      .then(res => {
        if (res?.status === 200) {
          toastShow(res.data.message, 'green');
          setDeleteModalVisible(false);
          setSideModalVisible(false);
          setDelete(sideModalId);
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  };
  return (
    <>
      <GestureHandlerRootView>
        <PanGestureHandler
          onGestureEvent={handleGestureEvent}
          onHandlerStateChange={handleHandlerStateChange}>
          <View style={styles.mainView}>
            {idState === idForShowMsg ? (
              <View style={styles.hideView}>
                {!isHidden && (
                  <>
                    <Text style={styles.hideViewText}>
                      You won't see this post again
                    </Text>
                    <Text style={styles.hideViewSubText}>
                      We will use your feedback to improve our algorithm to
                      offer you a better experience
                    </Text>
                  </>
                )}
                {/* Cross icon to hide the message */}
                {!isHidden && (
                  <TouchableOpacity
                    onPress={() => toggleHiddenMessage(idState)}
                    style={{position: 'relative'}}>
                    <Image
                      source={imageConstant.cross}
                      style={styles.crossImg}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ) : idState === idForShowMsgReport ? (
              <View style={styles.hideView}>
                {!isHidden && (
                  <>
                    <Text style={styles.hideViewText}>
                      Thanks for reporting this post
                    </Text>
                    <Text style={styles.hideViewSubText}>
                      We have received your feedback and will take necessary
                      action to keep the community safe.
                    </Text>
                  </>
                )}

                {!isHidden && (
                  <TouchableOpacity
                    onPress={() => toggleHiddenMessage(idState)}
                    style={{position: 'relative'}}>
                    <Image
                      source={imageConstant.cross}
                      style={styles.crossImg}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ) : idState === isDelete ? null : (
              <>
                <CommonMagzHeader
                  index={index}
                  magzList={item}
                  getTrueFalseByYandN={getTrueFalseByYandN}
                  handleFollow={() => {
                    getTrueFalseByYandN(item?.follow)
                      ? onUnfollowing(item?.user?.id)
                      : onFollowing(item?.user?.id);
                  }}
                  gotoProfilePage={gotoProfilePage}
                  sideModal={sideModal}
                  setCheckIdForReport={setCheckIdForReport}
                />

                <CommonMagzImage
                  magzList={item}
                  index={index}
                  handleLike={() =>
                    getTrueFalseByYandN(item?.userLike)
                      ? handleUnlikePost(item?.postId)
                      : handleLikePost(item?.postId)
                  }
                  getTrueFalseByYandN={getTrueFalseByYandN}
                  handleComment={() => {
                    handleComment(item?.postId);
                  }}
                  handleSave={() =>
                    getTrueFalseByYandN(item?.savePost)
                      ? handleUnSavePost(item.postId)
                      : handleSavePost(item.postId)
                  }
                />

                <CommonMagzBottom
                  magzList={item}
                  index={index}
                  onCreditHandle={gotoProfilePage}
                />

                {/* comments modal visible */}
                <Modal
                  isVisible={isModalVisible}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  animationInTiming={1000}
                  animationOutTiming={1000}
                  onBackdropPress={() => setModalVisible(false)}
                  onBackButtonPress={() => setModalVisible(false)}>
                  <View style={styles.modalContainer}>
                    <View style={styles.commentMainContainer}>
                      <Text style={styles.cmtTextContainer}>
                        COMMENTS ({item?.totalComments ?? 0})
                      </Text>
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Image
                          source={imageConstant.arrow}
                          style={styles.arrowImg}
                        />
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      style={styles.mb20}
                      data={commentList}
                      ListEmptyComponent={listEmptyComponentModal}
                      renderItem={modalRenderItem}
                      keyExtractor={(item, ind) =>
                        item?.commentId?.toString() || ind?.toString()
                      }
                      onScroll={({nativeEvent}) => {
                        const {layoutMeasurement, contentOffset, contentSize} =
                          nativeEvent;
                        const paddingToBottom = 10;
                        if (
                          layoutMeasurement.height + contentOffset.y >=
                          contentSize.height - paddingToBottom
                        ) {
                          handleLoadMoreComments();
                        }
                      }}
                    />
                    <View style={styles.textinputView}>
                      <View style={styles.textinputcontainer}>
                        <TextInput
                          placeholder="Type your Comment here..."
                          placeholderTextColor={colorConstant.white}
                          style={styles.input}
                          onChangeText={e => setComment(e)}
                          value={comment}
                        />
                        <TouchableOpacity
                          onPress={() => handlePostComment(item?.postId)}>
                          <Image
                            source={imageConstant.cta}
                            style={styles.mr10}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>

                {/* replay modal */}
                <Modal
                  isVisible={replyModalVisible}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  animationInTiming={1000}
                  animationOutTiming={1000}
                  onBackdropPress={() => setReplyModalVisible(false)}
                  onBackButtonPress={() => setReplyModalVisible(false)}
                  backdropOpacity={0}
                >
                  <View style={styles.modalContainer}>
                  <View style={styles.commentMainContainer}>
                      <Text style={styles.cmtTextContainer}>
                        COMMENTS({nestedCommentList.length})
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setReplyModalVisible(false);
                        }}>
                        <Image
                          source={imageConstant?.arrow}
                          style={styles.arrowImg}

                        />
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      style={styles.mb20}
                      data={nestedCommentList}
                      ListEmptyComponent={listEmptyComponentModal}
                      renderItem={modalNestedRenderItem}
                      keyExtractor={(item, index) =>
                        item?.commentId?.toString() ||
                        item?.id?.toString() ||
                        index?.toString()
                      }
                    />
                    <View
                      style={styles.textinputView}>
                      <View style={styles.textinputcontainer}>
                        <TextInput
                          placeholder="Type your Comment here..."
                          placeholderTextColor={colorConstant.white}
                          style={styles.input}
                          onChangeText={e => setNestedComment(e)}
                          value={nestedComment}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            handlePostNestedComment(nestedCommentId)
                          }>
                          <Image
                            source={imageConstant.cta}
                            style={styles.mr10}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>

                {/* sideModal visible */}
                <Modal
                  isVisible={sideModalVisible}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  animationInTiming={1000}
                  animationOutTiming={1000}
                  onBackdropPress={() => setSideModalVisible(false)}
                  onBackButtonPress={() => setSideModalVisible(false)}
                  backdropOpacity={0}
                  style={styles.sideModalMainStyle}>
                  <View style={styles.sideModalContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        getTrueFalseByYandN(item?.savePost)
                          ? handleUnSavePost(item?.postId)
                          : handleSavePost(item?.postId)
                      }
                      style={styles.sidemodalimageView}>
                      <Image
                        source={
                          getTrueFalseByYandN(item?.savePost)
                            ? imageConstant.save
                            : imageConstant.unsave
                        }
                        style={styles.bottomImg}
                      />
                      <Text style={styles.sidemodaltext}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.sidemodalimageView}
                      onPress={onShare}>
                      <Image source={imageConstant.upload} />
                      <Text style={styles.sidemodaltext}>Share</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.sidemodalimageView}
                      onPress={hideModal}>
                      <View>
                        <Feather
                          name={'eye-off'}
                          size={24}
                          color={colorConstant.white}
                        />
                      </View>
                      <Text style={styles.sidemodaltext}>Hide</Text>
                    </TouchableOpacity>

                    {userProfileId !== checkIdForReport ? (
                      <TouchableOpacity
                        onPress={reportModal}
                        style={styles.reportMainView}>
                        <Image
                          source={imageConstant.report}
                          style={styles.reportImage}
                        />
                        <Text style={styles.reportText}>Report</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.deleteMainView}
                        onPress={() => setDeleteModalVisible(true)}>
                        <Image
                          source={imageConstant.deletes}
                          style={styles.deleteImg}
                        />
                        <Text style={styles.deleteText}>Delete</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </Modal>

                {/* hide modal visible */}
                <Modal
                  isVisible={hideModalVisible}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  animationInTiming={1000}
                  animationOutTiming={1000}
                  onBackdropPress={() => {
                    setHideModalVisible(false);
                    setSideModalVisible(false);
                    setSelectedOption('');
                  }}
                  onBackButtonPress={() => {
                    setHideModalVisible(false);
                    setSideModalVisible(false);
                    setSelectedOption('');
                  }}
                  backdropOpacity={0}
                  style={styles.hideModalMainStyle}>
                  <View
                    style={[
                      styles.sideModalContainer,
                      {height: responsiveScreenHeight(40)},
                    ]}>
                    <Text style={styles.hideModalMainText}>
                      Why do you want to hide this?
                    </Text>

                    <RadioButton
                      label="It's irrelevant"
                      selected={selectedOption === "It's irrelevant"}
                      onSelect={() => setSelectedOption("It's irrelevant")}
                    />

                    <RadioButton
                      label="Seen it many times"
                      selected={selectedOption === 'Seen it many times'}
                      onSelect={() => setSelectedOption('Seen it many times')}
                    />
                    <RadioButton
                      label="It's not in good quality or unclear to interpret"
                      selected={
                        selectedOption ===
                        "It's not in good quality or unclear to interpret"
                      }
                      onSelect={() =>
                        setSelectedOption(
                          "It's not in good quality or unclear to interpret",
                        )
                      }
                    />
                    <RadioButton
                      label="Others"
                      selected={selectedOption === 'Others'}
                      onSelect={() => setSelectedOption('Others')}
                    />

                    <CommonButton
                      buttonTitle={'Submit'}
                      width={responsiveScreenWidth(30)}
                      height={responsiveScreenHeight(5)}
                      onButtonPress={onHandleHidePost}
                    />
                  </View>
                </Modal>
                {/* report modal visible */}
                <Modal
                  isVisible={reportModalVisible}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  animationInTiming={1000}
                  animationOutTiming={1000}
                  onBackdropPress={() => {
                    setReportModalVisible(false);
                    setReportSelected('');
                    setSideModalVisible(false);
                    setSelectedOption('');
                    setReportCategory('');
                  }}
                  onBackButtonPress={() => {
                    setReportModalVisible(false);
                    setReportSelected('');
                    setSideModalVisible(false);
                    setSelectedOption('');
                    setReportCategory('');
                  }}
                  backdropOpacity={0}
                  style={styles.hideModalMainStyle}>
                  {reportSelected === '' ? (
                    <View
                      style={[
                        styles.sideModalContainer,
                        {height: responsiveScreenHeight(35)},
                      ]}>
                      <Text style={styles.reportModleMainText}>
                        Why are you reporting this?
                      </Text>

                      <SelectReport
                        label="Misleading or Spam"
                        selected={reportSelected === 'Misleading or Spam'}
                        onSelect={() => setReportSelected('Misleading or Spam')}
                      />
                      <SelectReport
                        label="Violations"
                        selected={reportSelected === 'Violations'}
                        onSelect={() => setReportSelected('Violations')}
                      />
                      <SelectReport
                        label="Offensive"
                        selected={reportSelected === 'Offensive'}
                        onSelect={() => setReportSelected('Offensive')}
                      />
                      <SelectReport
                        label="Others"
                        selected={reportSelected === 'Others'}
                        onSelect={() => setReportSelected('Others')}
                      />
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.sideModalContainer,
                        {height: responsiveScreenHeight(35)},
                      ]}>
                      {reportSelected === 'Misleading or Spam' ? (
                        <View style={{width: '90%'}}>
                          <Text style={styles.reportmainText}>
                            Misleading or Spam
                          </Text>

                          <RadioButton
                            label="Wrong information"
                            selected={selectedOption === 'Wrong information'}
                            onSelect={() =>
                              setSelectedOption('Wrong information')
                            }
                          />

                          <RadioButton
                            label="Repetitive information"
                            selected={
                              selectedOption === 'Repetitive information'
                            }
                            onSelect={() =>
                              setSelectedOption('Repetitive information')
                            }
                          />

                          <RadioButton
                            label="Scam"
                            selected={selectedOption === 'Scam'}
                            onSelect={() => setSelectedOption('Scam')}
                          />

                          <CommonButton
                            buttonTitle={'Submit'}
                            width={responsiveScreenWidth(30)}
                            height={responsiveScreenHeight(5)}
                            marginBottom={responsiveScreenHeight(5)}
                            onButtonPress={onHandleReportPost}
                          />
                        </View>
                      ) : reportSelected === 'Violations' ? (
                        <View style={{width: '90%'}}>
                          <Text style={styles.reportmainText}>Violations</Text>

                          <SelectReport
                            label="Privacy"
                            selected={reportCategory === 'Privacy'}
                            onSelect={() => {
                              setReportCategory('Privacy');
                              setReportModalVisible(false);
                              setReportCategoryModalVisible(true);
                            }}
                          />
                          <SelectReport
                            label="Copyright"
                            selected={reportCategory === 'Copyright'}
                            onSelect={() => {
                              setReportCategory('Copyright');
                              setReportModalVisible(false);
                              setReportCategoryModalVisible(true);
                            }}
                          />
                        </View>
                      ) : reportSelected === 'Offensive' ? (
                        <View style={{width: '90%'}}>
                          <Text style={styles.reportmainText}>Offensive</Text>

                          <SelectReport
                            label="Abuse and Attacks"
                            selected={reportCategory === 'Abuse and Attacks'}
                            onSelect={() => {
                              setReportCategory('Abuse and Attacks');
                              setReportModalVisible(false);
                              setReportCategoryModalVisible(true);
                            }}
                          />
                          <SelectReport
                            label="Sexual content"
                            selected={reportCategory === 'Sexual content'}
                            onSelect={() => {
                              setReportCategory('Sexual content');
                              setReportModalVisible(false);
                              setReportCategoryModalVisible(true);
                            }}
                          />
                          <SelectReport
                            label="Violence"
                            selected={reportCategory === 'Violence'}
                            onSelect={() => {
                              setReportCategory('Violence');
                              setReportModalVisible(false);
                              setReportCategoryModalVisible(true);
                            }}
                          />
                        </View>
                      ) : reportSelected === 'Others' ? (
                        <View style={{width: responsiveScreenWidth(90)}}>
                          <Text style={styles.reportmainText}>Others</Text>

                          <CommonTextInput
                            multiline={true}
                            placeholder="Please provide more details about the issue"
                            width={responsiveScreenWidth(87)}
                            height={responsiveScreenHeight(12)}
                            textAlignVertical={'top'}
                            numberOfLines={3}
                            marginTop={responsiveScreenHeight(0.5)}
                            borderColor={colorConstant.bordercolor}
                            value={selectedOption}
                            onChangeText={text => onHandleOther(text)}
                          />

                          {otherDescriptionError ? (
                            <View style={styles.errorView}>
                              <Text style={styles.errorText}>
                                {otherDescriptionError}
                              </Text>
                            </View>
                          ) : null}

                          <CommonButton
                            buttonTitle={'Submit'}
                            width={responsiveScreenWidth(30)}
                            height={responsiveScreenHeight(5)}
                            marginBottom={responsiveScreenHeight(2)}
                            onButtonPress={onHandleReportPost}
                          />
                        </View>
                      ) : null}
                    </View>
                  )}
                </Modal>

                {/* reportCategory */}
                <Modal
                  isVisible={reportCategoryModalVisible}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  animationInTiming={1000}
                  animationOutTiming={1000}
                  onBackdropPress={() => {
                    setReportModalVisible(false);
                    setReportSelected('');
                    setSideModalVisible(false);
                    setSelectedOption('');
                    setReportCategory('');
                    setReportCategoryModalVisible(false);
                  }}
                  onBackButtonPress={() => {
                    setReportModalVisible(false);
                    setReportSelected('');
                    setSideModalVisible(false);
                    setSelectedOption('');
                    setReportCategory('');
                    setReportCategoryModalVisible(false);
                  }}
                  backdropOpacity={0}
                  style={styles.hideModalMainStyle}>
                  <View
                    style={[
                      styles.sideModalContainer,
                      {height: responsiveScreenHeight(35)},
                    ]}>
                    {reportCategory === 'Privacy' ? (
                      <View>
                        <Text style={styles.reportSelectTabText}>
                          Violations
                        </Text>
                        <RadioButton
                          label="Contains private or sensitive information"
                          selected={
                            selectedOption ===
                            'Contains private or sensitive information'
                          }
                          onSelect={() =>
                            setSelectedOption(
                              'Contains private or sensitive information',
                            )
                          }
                        />

                        <RadioButton
                          label="Others"
                          selected={selectedOption === 'Others'}
                          onSelect={() => setSelectedOption('Others')}
                        />

                        <CommonButton
                          buttonTitle={'Submit'}
                          width={responsiveScreenWidth(30)}
                          height={responsiveScreenHeight(5)}
                          marginBottom={responsiveScreenHeight(2)}
                          onButtonPress={onHandleReportPost}
                        />
                      </View>
                    ) : reportCategory === 'Copyright' ? (
                      <View>
                        <Text style={styles.reportSelectTabText}>
                          Copyright
                        </Text>
                        <RadioButton
                          label="Copyright infringement"
                          selected={selectedOption === 'Copyright infringement'}
                          onSelect={() =>
                            setSelectedOption('Copyright infringement')
                          }
                        />

                        <RadioButton
                          label="Trademark infringement"
                          selected={selectedOption === 'Trademark infringement'}
                          onSelect={() =>
                            setSelectedOption('Trademark infringement')
                          }
                        />

                        <CommonButton
                          buttonTitle={'Submit'}
                          width={responsiveScreenWidth(30)}
                          height={responsiveScreenHeight(5)}
                          onButtonPress={onHandleReportPost}
                        />
                      </View>
                    ) : reportCategory === 'Abuse and Attacks' ? (
                      <View>
                        <Text style={styles.reportSelectTabText}>
                          Abuse and Attacks
                        </Text>
                        <RadioButton
                          label="Its a personal attack on me"
                          selected={
                            selectedOption === 'Its a personal attack on me'
                          }
                          onSelect={() =>
                            setSelectedOption('Its a personal attack on me')
                          }
                        />

                        <RadioButton
                          label="Others"
                          selected={selectedOption === 'Others'}
                          onSelect={() => setSelectedOption('Others')}
                        />

                        <CommonButton
                          buttonTitle={'Submit'}
                          width={responsiveScreenWidth(30)}
                          height={responsiveScreenHeight(5)}
                          onButtonPress={onHandleReportPost}
                        />
                      </View>
                    ) : reportCategory === 'Sexual content' ? (
                      <View>
                        <Text style={styles.reportSelectTabText}>
                          Sexual content
                        </Text>
                        <RadioButton
                          label="Child nudity"
                          selected={selectedOption === 'Child nudity'}
                          onSelect={() => setSelectedOption('Child nudity')}
                        />

                        <RadioButton
                          label="Adult nudity"
                          selected={selectedOption === 'Adult nudity'}
                          onSelect={() => setSelectedOption('Adult nudity')}
                        />

                        <CommonButton
                          buttonTitle={'Submit'}
                          width={responsiveScreenWidth(30)}
                          height={responsiveScreenHeight(5)}
                          onButtonPress={onHandleReportPost}
                        />
                      </View>
                    ) : reportCategory === 'Violence' ? (
                      <View>
                        <Text style={styles.reportSelectTabText}>Violence</Text>
                        <RadioButton
                          label="Illegal goods"
                          selected={selectedOption === 'Illegal goods'}
                          onSelect={() => setSelectedOption('Illegal goods')}
                        />

                        <RadioButton
                          label="Graphical violence"
                          selected={selectedOption === 'Graphical violence'}
                          onSelect={() =>
                            setSelectedOption('Graphical violence')
                          }
                        />

                        <RadioButton
                          label="Self-abuse"
                          selected={selectedOption === 'Self-abuse'}
                          onSelect={() => setSelectedOption('Self-abuse')}
                        />

                        <CommonButton
                          buttonTitle={'Submit'}
                          width={responsiveScreenWidth(30)}
                          height={responsiveScreenHeight(5)}
                          marginBottom={responsiveScreenHeight(2)}
                          onButtonPress={onHandleReportPost}
                        />
                      </View>
                    ) : null}
                  </View>
                </Modal>

                {/* delete modal visible */}

                <Modal
                  animationType="slide"
                  transparent={true}
                  backdropOpacity={0.75}
                  visible={isDeleteModalVisible}>
                  <View style={styles.modalContainerdelete}>
                    <View style={styles.modalContent}>
                      <TouchableOpacity
                        onPress={() => setDeleteModalVisible(false)}
                        style={styles.crossTouch}>
                        <Image source={imageConstant.cross} />
                      </TouchableOpacity>
                      <Text style={styles.deleteText1}>Delete</Text>
                      <Text style={styles.text1}>
                        Are you sure you want to delete this post?
                      </Text>
                      <CommonButton
                        height={responsiveScreenHeight(5)}
                        width={responsiveScreenWidth(35)}
                        buttonTitle={'Delete'}
                        fontSize={responsiveScreenFontSize(2.3)}
                        onButtonPress={handleDeletePost}
                        marginBottom={responsiveScreenHeight(8)}
                        marginTop={responsiveScreenHeight(4)}
                      />

                      <View style={styles.lastView}></View>
                    </View>
                  </View>
                </Modal>
              </>
            )}
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </>
  );
};
export default MagzineSavedDetailsScreen;
