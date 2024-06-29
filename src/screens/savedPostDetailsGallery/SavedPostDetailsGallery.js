import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Swiper from 'react-native-swiper';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import CommonButton from '../../components/CommonButton';
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
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import CommonTextInput from '../../components/CommonTextInput';
import LoaderScreen from '../../utils/Loader';
import client from '../../utils/baseUrl';
import {getTrueFalseByYandN} from '../../utils/functions';
import {DEFAULT_MESSAGE} from '../../utils/message';
import CommonProfileBottom from '../../components/CommonProfileBottom';
import CommonProfileSingleImage from '../../components/CommonProfileSingleImage';
import CommonProfileImage from '../../components/CommonProfileImage';
import CommonProfileHeader from '../../components/CommonProfileHeader';
import CommonCommentModal from '../../components/CommonCommentModal';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CommonNestedCommentModal from '../../components/CommonNestedCommentModal';

const SavedPostDetailsGallery = props => {
  const dispatch = useDispatch();
  const postId = props?.route?.params?.postDetails;
  const userProfileData = useSelector(state => state?.auth?.curretUser);
  const userProfileId = userProfileData?.id;
  const [isModalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [sideModalVisible, setSideModalVisible] = useState(false);
  const [panGestureEnabled, setPanGestureEnabled] = useState(true);
  const [sideModalId, setSideModalId] = useState('');
  const [hideModalVisible, setHideModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [reportSelected, setReportSelected] = useState('');
  const [reportCategory, setReportCategory] = useState('');
  const [otherDescriptionError, setOtherDescriptionError] = useState('');
  const [checkIdForReport, setCheckIdForReport] = useState('');
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportCategoryModalVisible, setReportCategoryModalVisible] =
    useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [idForShowMsg, setIdForShowMsg] = useState('');
  const [idForShowMsgReport, setIdForShowMsgReport] = useState('');
  const [hiddenMessages, setHiddenMessages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePagePage] = useState(1);
  const itemsPerLoad = 10;
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [activeCommentPage, setActiveCommentPage] = useState(1);
  const [nestedCommentList, setNestedCommentList] = useState([]);
  const [nestedCommentId, setNestedCommentId] = useState('');
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [nestedComment, setNestedComment] = useState('');
  const [totalCommentCount, setTotalCommentCount] = useState(0);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getPostData(1);
      setActivePagePage(1);
      setPosts([]);
    });
    return unsubscribe;
  }, [props.navigation]);

  const loadMoreItem = () => {
    getPostData(activePage + 1);
    setActivePagePage(activePage + 1);
  };

  const getPostData = page => {
    setLoading(true);
    client
      .get(
        `user/savedPosts/${postId}/details?type=post&page=${page}&itemSize=${itemsPerLoad}`,
      )
      .then(res => {
        setLoading(false);
        const uniqueData = res?.data?.data?.filter((obj, index) => {
          return (
            index === res?.data?.data?.findIndex(o => obj.postId === o.postId)
          );
        });
        if (res?.status === 200) {
          setPosts([...posts, ...uniqueData]);
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const handleUpdateSaveStatusInPosts = (pstId, status) => {
    const reqPosts = posts?.map(post => {
      if (post?.postId === pstId) {
        return {...post, savePost: status};
      }
      return post;
    });
    setPosts(reqPosts);
  };

  const handleUpdateLikeStatusInPosts = (pstId, status) => {
    const reqPosts = posts?.map(post => {
      if (post?.postId === pstId) return status;
      return post;
    });
    setPosts(reqPosts);
  };

  const handleUpdateCommentData = data => {
    const reqComemnts = [...commentList, data];
    setCommentList(reqComemnts);
  };

  const handleLikePost = async pstId => {
    try {
      const res = await dispatch(putLikePost(pstId));
      handleUpdateLikeStatusInPosts(pstId, res?.payload?.data);
    } catch (error) {
      console.error('Error while liking post:', error);
    }
  };

  const handleUnlikePost = async pstId => {
    try {
      const res = await dispatch(putUnlikePost(pstId));
      handleUpdateLikeStatusInPosts(pstId, res?.payload?.data);
    } catch (error) {
      console.error('Error while unliking post:', error);
    }
  };

  const handleSavePost = async id => {
    const res = await dispatch(putSavePost(id));
    if (res?.payload?.data === 'Y') {
      handleUpdateSaveStatusInPosts(id, res?.payload?.data);
    }
  };

  const handleUnSavePost = async id => {
    const res = await dispatch(putUnsavePost(id));
    if (res?.payload?.data === 'N') {
      handleUpdateSaveStatusInPosts(id, res?.payload?.data);
    }
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

  const handleUpdateCommentLikes = data => {
    const reqComments = commentList?.map(cmt => {
      if (cmt?.commentId === data?.commentId) return data;
      return cmt;
    });
    setCommentList(reqComments);
  };

  const handleLikeComment = async id => {
    try {
      const res = await dispatch(putLikeComment(id));
      handleUpdateCommentLikes(res?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlikeComment = async id => {
    try {
      const res = await dispatch(putUnlikeComment(id));
      handleUpdateCommentLikes(res?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handeCmntAndLikeCountInPosts = (pstId, ttlCmts) => {
    const reqPosts = posts?.map(post => {
      if (post?.postId === pstId) {
        return {...post, totalComments: ttlCmts};
      }
      return post;
    });
    setPosts(reqPosts);
  };

  const getUniqArray = list => {
    const data = Array.from(new Set(list.map(li => li?.commentId)));
    console.log('data', data);
  };

  const handleCommentByPostId = (pstId, isInitial = false, page = 1) => {
    setLoading(true);
    client
      .get(`post/${pstId}/comments?page=${page}&itemSize=${itemsPerLoad}`)
      .then(res => {
        const result = res?.data?.data ?? [];
        setCommentList(
          isInitial ? result : getUniqArray([...commentList, ...result]),
        );
        handeCmntAndLikeCountInPosts(pstId, res?.data?.totalComments);
        setLoading(false);
        setTotalCommentCount(res?.data?.totalComments ?? 0);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const handleLoadMoreComments = () => {
    if (commentList?.length < totalCommentCount) {
      handleCommentByPostId(selectedPostId, false, activeCommentPage + 1);
      setActiveCommentPage(activeCommentPage + 1);
    }
  };

  const handleComment = id => {
    handleCommentByPostId(id, true);
    setActiveCommentPage(1);
    setSelectedPostId(id);
    setModalVisible(true);
  };

  const listEmptyComponentModal = () => {
    if (commentList?.length === 0 && !loading && !refreshing) {
      return (
        <View
          style={[styles.notFoundView, {height: responsiveScreenHeight(45)}]}>
          <Text style={styles.notFoundText}>No Comments yet</Text>
        </View>
      );
    } else {
      return null;
    }
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
      const res = await client.post(`comment/${id}/nested`, data);
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

  const sideModal = id => {
    setSideModalVisible(true);
    setSideModalId(id);
  };

  const handleCommentModalClose = () => {
    setCommentList([]);
    setActiveCommentPage(1);
    setModalVisible(false);
  };

  const gotoProfilePage = id => {
    if (userProfileId == id) {
      props.navigation.navigate('DrawerTabNavigation');

      props.navigation.navigate('BottomTabNavigation');

      props.navigation.navigate('NewMyProfile');
    } else {
      props.navigation.navigate('OtherProfileView', {
        IdDetails: id,
      });
    }
  };

  const toggleHiddenMessage = postId => {
    if (hiddenMessages.includes(postId)) {
      setHiddenMessages(hiddenMessages.filter(id => id !== postId));
    } else {
      setHiddenMessages([...hiddenMessages, postId]);
    }
  };
  const handleUpdateFollowStatusInPosts = (userId, status) => {
    const reqPosts = posts?.map(post => {
      if (post?.user?.id === userId) {
        return {...post, follow: status};
      }
      return post;
    });
    setPosts(reqPosts);
  };

  const onFollowing = async id => {
    try {
      const res = await dispatch(putFollowing(id));
      if (res?.payload?.data === 'Y') {
        handleUpdateFollowStatusInPosts(id, res?.payload?.data);
      }
    } catch (error) {
      console.error('Error while following:', error);
    }
  };

  const onUnfollowing = async id => {
    try {
      const res = await dispatch(putUnfollowing(id));
      if (res?.payload?.data === 'N') {
        handleUpdateFollowStatusInPosts(id, res?.payload?.data);
      }
    } catch (error) {
      console.error('Error while unfollowing:', error);
    }
  };

  const renderItem = ({item, index}) => {
    const idState = item?.postId ? item.postId : item?.id;
    const isHidden = hiddenMessages.includes(idState);

    if (idState === idForShowMsg) {
      return (
        <View
          style={{
            alignSelf: 'center',
            width: responsiveScreenWidth(95),
            marginVertical: responsiveScreenHeight(2),
          }}>
          {!isHidden && (
            <>
              <Text
                style={{
                  color: colorConstant.white,
                  fontFamily: fontConstant.bold,
                  fontSize: responsiveScreenFontSize(2.5),
                  alignSelf: 'center',
                }}>
                You won't see this post again
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: responsiveScreenFontSize(2),
                  fontFamily: fontConstant.regular,
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                We will use your feedback to improve our algorithm to offer you
                a better experience
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
                style={{position: 'absolute', right: 0, bottom: 60}}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    } else if (idState === idForShowMsgReport) {
      return (
        <View
          style={{
            alignSelf: 'center',
            width: responsiveScreenWidth(95),
            marginVertical: responsiveScreenHeight(2),
          }}>
          {!isHidden && (
            <>
              <Text
                style={{
                  color: colorConstant.white,
                  fontFamily: fontConstant.bold,
                  fontSize: responsiveScreenFontSize(2.5),
                  alignSelf: 'center',
                }}>
                Thanks for reporting this post
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: responsiveScreenFontSize(2),
                  fontFamily: fontConstant.regular,
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                We have received your feedback and will take necessary action to
                keep the community safe.
              </Text>
            </>
          )}

          {!isHidden && (
            <TouchableOpacity
              onPress={() => toggleHiddenMessage(idState)}
              style={{position: 'relative'}}>
              <Image
                source={imageConstant.cross}
                style={{position: 'absolute', right: 0, bottom: 60}}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginTop: responsiveScreenHeight(3),
          }}>
          <CommonProfileHeader
            item={item}
            gotoProfilePage={gotoProfilePage}
            sideModal={sideModal}
            setCheckIdForReport={setCheckIdForReport}
            getTrueFalseByYandN={getTrueFalseByYandN}
            handleFollow={() => {
              getTrueFalseByYandN(item?.follow)
                ? onUnfollowing(item?.user?.id)
                : onFollowing(item?.user?.id);
            }}
          />

          <View style={styles.mainimage}>
            {item?.images?.length > 1 ? (
              <Swiper
                style={styles.swiperContainer}
                showsPagination={true}
                loop={false}
                horizontal={true}
                activeDotColor="white"
                dotColor="grey">
                {item?.images?.map((imageUrl, imageIndex) => (
                  <CommonProfileImage
                    key={imageIndex}
                    imageUrl={imageUrl}
                    getTrueFalseByYandN={getTrueFalseByYandN}
                    handleLike={() => {
                      getTrueFalseByYandN(item?.userLike)
                        ? handleUnlikePost(item?.postId)
                        : handleLikePost(item?.postId);
                    }}
                    handleComment={() => handleComment(item?.postId)}
                    handleSave={() => {
                      getTrueFalseByYandN(item?.savePost)
                        ? handleUnSavePost(item?.postId)
                        : handleSavePost(item?.postId);
                    }}
                    item={item}
                  />
                ))}
              </Swiper>
            ) : (
              <View style={styles.relativeView}>
                <CommonProfileSingleImage
                  getTrueFalseByYandN={getTrueFalseByYandN}
                  handleLike={() => {
                    getTrueFalseByYandN(item?.userLike)
                      ? handleUnlikePost(item?.postId)
                      : handleLikePost(item?.postId);
                  }}
                  handleComment={() => handleComment(item?.postId)}
                  handleSave={() => {
                    getTrueFalseByYandN(item?.savePost)
                      ? handleUnSavePost(item?.postId)
                      : handleSavePost(item?.postId);
                  }}
                  item={item}
                />
              </View>
            )}
          </View>

          <CommonProfileBottom item={item} onCreditHandle={gotoProfilePage} />
        </View>
      );
    }
  };

  const hideModal = () => {
    setSideModalVisible(false);
    setHideModalVisible(true);
  };

  const onHandleHidePost = async () => {
    const data = new FormData();
    data.append('postId', sideModalId);
    data.append('text', selectedOption);

    await dispatch(hidePost(data));
    setIdForShowMsg(sideModalId);
    setHideModalVisible(false);
    setSideModalVisible(false);
    setSelectedOption('');
    // dispatch(await getAllHomePostDetails());
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
      setIdForShowMsgReport(sideModalId);

      setSideModalVisible(false);
      setReportModalVisible(false);
      setReportCategoryModalVisible(false);
      setSelectedOption('');
      setReportCategory('');
      setReportSelected('');
    } else {
      setOtherDescriptionError(selectedOption ? '' : DEFAULT_MESSAGE);
    }
  };

  const RadioButton = ({label, selected, onSelect}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          width: responsiveScreenWidth(87),
          marginVertical: responsiveScreenHeight(0.8),
        }}
        onPress={onSelect}>
        {selected ? (
          <ImageBackground
            source={imageConstant.black}
            style={{width: 20, height: 20, justifyContent: 'center'}}>
            <Image
              source={imageConstant.white}
              style={{width: 12, height: 12, alignSelf: 'center'}}
            />
          </ImageBackground>
        ) : (
          <Image source={imageConstant.black} style={{width: 20, height: 20}} />
        )}
        <Text
          style={{
            color: colorConstant.white,
            fontFamily: fontConstant.medium,
            fontSize: responsiveScreenFontSize(2),
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };
  const SelectReport = ({label, selected, onSelect}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          width: responsiveScreenWidth(87),
          marginVertical: responsiveScreenHeight(0.8),
        }}
        onPress={onSelect}>
        <Image
          source={imageConstant.leftarrow}
          style={{
            resizeMode: 'contain',
            width: responsiveScreenWidth(5),
            height: responsiveScreenHeight(2),
          }}
        />
        <Text
          style={{
            color: selected ? colorConstant.gray : colorConstant.white,
            fontFamily: fontConstant.medium,
            fontSize: responsiveScreenFontSize(2),
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const onHandleOther = text => {
    if (text.length !== 0) {
      setSelectedOption(text);
      setOtherDescriptionError('');
    } else {
      setSelectedOption('');
      setOtherDescriptionError(DEFAULT_MESSAGE);
    }
  };
  const ListEmptyComponentForAllPost = () => {
    if (loading || refreshing) return Placeholder();
    return (
      <View style={styles.notFoundView}>
        <Text style={styles.notFoundText}>No data available</Text>
      </View>
    );
  };

  const Placeholder = () => (
    <SkeletonPlaceholder
      backgroundColor={colorConstant.backgroundBlack}
      highlightColor={colorConstant.bordercolor}
      speed={800}>
      <View style={styles.placeholderContainer}>
        <View style={styles.placeholderHeader} />
        <View style={styles.placeholderImage} />
        <View style={styles.placeholderText} />
        <View style={styles.placeholderHeader} />
      </View>
    </SkeletonPlaceholder>
  );

  const getAllCommentsByPostId = id => {
    const reqComments = posts?.find(post => post?.postId === id);
    return reqComments?.totalComments ?? 0;
  };

  const onShare = async () => {
    // props.navigation.closeDrawer();
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

  const getPostByPostId = id => {
    const res = posts?.find(pst => pst?.postId == id);
    return getTrueFalseByYandN(res?.savePost);
  };

  return (
    <>
      <LoaderScreen data={loading} />
      <SafeAreaView style={styles.maincontainer}>
        {/* <StatusBar hidden={true} /> */}

        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={ListEmptyComponentForAllPost}
          onScroll={({nativeEvent}) => {
            const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
            const paddingToBottom = 10;
            if (
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - paddingToBottom
            ) {
              loadMoreItem();
            }
          }}
        />

        {/* comment modal */}
        <Modal
          isVisible={isModalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={1000}
          animationOutTiming={1000}
          onBackdropPress={handleCommentModalClose}
          onBackButtonPress={handleCommentModalClose}
          backdropOpacity={0}
          // swipeDirection="down"
        >
          <View style={styles.modalContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: responsiveScreenWidth(93),
                paddingRight: responsiveScreenWidth(1.5),
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: colorConstant.white,
                  fontFamily: fontConstant.medium,
                  fontSize: responsiveScreenFontSize(2),
                  alignSelf: 'flex-start',
                  padding: 10,
                }}>
                COMMENTS ({getAllCommentsByPostId(selectedPostId)})
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image
                  source={imageConstant?.arrow}
                  style={{
                    height: responsiveScreenHeight(3),
                    width: responsiveScreenWidth(5),
                  }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              style={{marginBottom: responsiveScreenHeight(4)}}
              data={commentList}
              ListEmptyComponent={listEmptyComponentModal}
              renderItem={modalRenderItem}
              keyExtractor={(item, index) =>
                item?.commentId?.toString() ||
                item?.id?.toString() ||
                index?.toString()
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

            <View
              style={{
                alignSelf: 'center',
                backgroundColor: '#272727',
                width: responsiveScreenWidth(100),
                height: responsiveScreenHeight(8),
                position: 'absolute',
                bottom: responsiveScreenHeight(-7),
                justifyContent: 'center',
              }}>
              <View style={styles.textinputcontainer}>
                <TextInput
                  placeholder="Type your Comment here..."
                  placeholderTextColor={colorConstant.white}
                  style={styles.input}
                  onChangeText={e => setComment(e)}
                  value={comment}
                />
                <TouchableOpacity
                  onPress={() => handlePostComment(selectedPostId)}>
                  <Image
                    source={imageConstant.cta}
                    style={{marginRight: responsiveScreenWidth(1)}}
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
          // swipeDirection="down"
        >
          <View style={styles.modalContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: responsiveScreenWidth(93),
                paddingRight: responsiveScreenWidth(1.5),
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: colorConstant.white,
                  fontFamily: fontConstant.medium,
                  fontSize: responsiveScreenFontSize(2),
                  alignSelf: 'flex-start',
                  padding: 10,
                }}>
                COMMENTS({nestedCommentList.length})
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setReplyModalVisible(false);
                }}>
                <Image
                  source={imageConstant?.arrow}
                  style={{
                    height: responsiveScreenHeight(3),
                    width: responsiveScreenWidth(5),
                  }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              style={{marginBottom: responsiveScreenHeight(4)}}
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
              style={{
                alignSelf: 'center',
                backgroundColor: '#272727',
                width: responsiveScreenWidth(100),
                height: responsiveScreenHeight(8),
                position: 'absolute',
                bottom: responsiveScreenHeight(-7),
                justifyContent: 'center',
              }}>
              <View style={styles.textinputcontainer}>
                <TextInput
                  placeholder="Type your Comment here..."
                  placeholderTextColor={colorConstant.white}
                  style={styles.input}
                  onChangeText={e => setNestedComment(e)}
                  value={nestedComment}
                />
                <TouchableOpacity
                  onPress={() => handlePostNestedComment(nestedCommentId)}>
                  <Image
                    source={imageConstant.cta}
                    style={{marginRight: responsiveScreenWidth(1)}}
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
          style={{
            position: 'absolute',
            bottom: responsiveScreenHeight(-7),
            alignSelf: 'center',
          }}>
          <View style={styles.sideModalContainer}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(5),
                marginHorizontal: responsiveScreenWidth(5),
                marginVertical: responsiveScreenHeight(1),
                width: responsiveScreenWidth(90),
              }}
              onPress={() =>
                getPostByPostId(sideModalId)
                  ? handleUnSavePost(sideModalId)
                  : handleSavePost(sideModalId)
              }>
              <Image
                source={
                  getPostByPostId(sideModalId)
                    ? imageConstant.save
                    : imageConstant.unsave
                }
                style={styles.bottomImg}
              />
              <Text
                style={{
                  color: colorConstant.white,
                  fontFamily: fontConstant.regular,
                  fontSize: responsiveScreenFontSize(2.3),
                }}>
                Save
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onShare}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(5),
                marginHorizontal: responsiveScreenWidth(5),
                marginVertical: responsiveScreenHeight(1),
                width: responsiveScreenWidth(90),
              }}>
              <Image source={imageConstant.upload} />
              <Text
                style={{
                  color: colorConstant.white,
                  fontFamily: fontConstant.regular,
                  fontSize: responsiveScreenFontSize(2.3),
                }}>
                Share
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(5),
                marginHorizontal: responsiveScreenWidth(5),
                marginVertical: responsiveScreenHeight(1),
                width: responsiveScreenWidth(90),
              }}
              onPress={hideModal}>
              <View>
                <Feather
                  name={'eye-off'}
                  size={24}
                  color={colorConstant.white}
                />
              </View>
              <Text
                style={{
                  color: colorConstant.white,
                  fontFamily: fontConstant.regular,
                  fontSize: responsiveScreenFontSize(2.3),
                }}>
                Hide
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={reportModal}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(4),
                marginHorizontal: responsiveScreenWidth(5),
                marginVertical: responsiveScreenHeight(1),
                width: responsiveScreenWidth(90),
              }}>
              <Image
                source={imageConstant.report}
                style={{width: 27, height: 27}}
              />
              <Text
                style={{
                  color: 'red',
                  fontFamily: fontConstant.regular,
                  fontSize: responsiveScreenFontSize(2.3),
                }}>
                Report
              </Text>
            </TouchableOpacity>
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
          style={{
            position: 'absolute',
            bottom: responsiveScreenHeight(-7),
            alignSelf: 'center',
          }}>
          <View
            style={[
              styles.sideModalContainer,
              {height: responsiveScreenHeight(40)},
            ]}>
            <Text
              style={{
                color: colorConstant.white,
                fontFamily: fontConstant.bold,
                fontSize: responsiveScreenFontSize(2.3),
                width: '90%',
                marginVertical: responsiveScreenWidth(2),
              }}>
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
          style={{
            position: 'absolute',
            bottom: responsiveScreenHeight(-7),
            alignSelf: 'center',
          }}>
          {reportSelected === '' ? (
            <View
              style={[
                styles.sideModalContainer,
                {height: responsiveScreenHeight(35)},
              ]}>
              <Text
                style={{
                  color: colorConstant.white,
                  fontFamily: fontConstant.bold,
                  fontSize: responsiveScreenFontSize(2.3),
                  width: '90%',
                  marginVertical: responsiveScreenWidth(2),
                  marginBottom: responsiveScreenHeight(2),
                }}>
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
                  <Text
                    style={{
                      color: colorConstant.white,
                      fontFamily: fontConstant.bold,
                      fontSize: responsiveScreenFontSize(2.3),
                      marginVertical: responsiveScreenWidth(2),
                      marginBottom: responsiveScreenHeight(2),
                    }}>
                    Misleading or Spam
                  </Text>

                  <RadioButton
                    label="Wrong information"
                    selected={selectedOption === 'Wrong information'}
                    onSelect={() => setSelectedOption('Wrong information')}
                  />

                  <RadioButton
                    label="Repetitive information"
                    selected={selectedOption === 'Repetitive information'}
                    onSelect={() => setSelectedOption('Repetitive information')}
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
                  <Text
                    style={{
                      color: colorConstant.white,
                      fontFamily: fontConstant.bold,
                      fontSize: responsiveScreenFontSize(2.3),
                      marginVertical: responsiveScreenWidth(2),
                      marginBottom: responsiveScreenHeight(2),
                    }}>
                    Violations
                  </Text>

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
                  <Text
                    style={{
                      color: colorConstant.white,
                      fontFamily: fontConstant.bold,
                      fontSize: responsiveScreenFontSize(2.3),
                      marginVertical: responsiveScreenWidth(2),
                      marginBottom: responsiveScreenHeight(2),
                    }}>
                    Offensive
                  </Text>

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
                  <Text
                    style={{
                      color: colorConstant.white,
                      fontFamily: fontConstant.bold,
                      fontSize: responsiveScreenFontSize(2.3),
                      marginVertical: responsiveScreenWidth(2),
                      marginBottom: responsiveScreenHeight(2),
                    }}>
                    Others
                  </Text>

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
          style={{
            position: 'absolute',
            bottom: responsiveScreenHeight(-7),
            alignSelf: 'center',
          }}>
          <View
            style={[
              styles.sideModalContainer,
              {height: responsiveScreenHeight(35)},
            ]}>
            {reportCategory === 'Privacy' ? (
              <View>
                <Text
                  style={{
                    color: colorConstant.white,
                    fontFamily: fontConstant.bold,
                    fontSize: responsiveScreenFontSize(2.3),
                    marginVertical: responsiveScreenWidth(2),
                    marginBottom: responsiveScreenHeight(2),
                  }}>
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
                <Text
                  style={{
                    color: colorConstant.white,
                    fontFamily: fontConstant.bold,
                    fontSize: responsiveScreenFontSize(2.3),
                    marginVertical: responsiveScreenWidth(2),
                    marginBottom: responsiveScreenHeight(2),
                  }}>
                  Copyright
                </Text>
                <RadioButton
                  label="Copyright infringement"
                  selected={selectedOption === 'Copyright infringement'}
                  onSelect={() => setSelectedOption('Copyright infringement')}
                />

                <RadioButton
                  label="Trademark infringement"
                  selected={selectedOption === 'Trademark infringement'}
                  onSelect={() => setSelectedOption('Trademark infringement')}
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
                <Text
                  style={{
                    color: colorConstant.white,
                    fontFamily: fontConstant.bold,
                    fontSize: responsiveScreenFontSize(2.3),
                    marginVertical: responsiveScreenWidth(2),
                    marginBottom: responsiveScreenHeight(2),
                  }}>
                  Abuse and Attacks
                </Text>
                <RadioButton
                  label="Its a personal attack on me"
                  selected={selectedOption === 'Its a personal attack on me'}
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
                <Text
                  style={{
                    color: colorConstant.white,
                    fontFamily: fontConstant.bold,
                    fontSize: responsiveScreenFontSize(2.3),
                    marginVertical: responsiveScreenWidth(2),
                    marginBottom: responsiveScreenHeight(2),
                  }}>
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
                <Text
                  style={{
                    color: colorConstant.white,
                    fontFamily: fontConstant.bold,
                    fontSize: responsiveScreenFontSize(2.3),
                    marginVertical: responsiveScreenWidth(2),
                    marginBottom: responsiveScreenHeight(2),
                  }}>
                  Violence
                </Text>
                <RadioButton
                  label="Illegal goods"
                  selected={selectedOption === 'Illegal goods'}
                  onSelect={() => setSelectedOption('Illegal goods')}
                />

                <RadioButton
                  label="Graphical violence"
                  selected={selectedOption === 'Graphical violence'}
                  onSelect={() => setSelectedOption('Graphical violence')}
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
      </SafeAreaView>
    </>
  );
};

export default SavedPostDetailsGallery;
const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: 'black',
    flex: 1,
  },
  descriptionText: {
    fontFamily: fontConstant.medium,
    color: colorConstant.gray,
    fontSize: responsiveScreenFontSize(2.2),
  },
  tagsView: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(2),
    alignItems: 'center',
    width: responsiveScreenWidth(95),
    flexWrap: 'wrap',
  },
  tagsContainer: {
    backgroundColor: '#2C2C2C',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: responsiveScreenHeight(1),
  },
  notFoundView: {
    justifyContent: 'center',
    height: responsiveScreenHeight(100),
    alignSelf: 'center',
  },
  errorView: {
    marginTop: '1%',
    marginLeft: '1%',
    marginBottom: '-2%',
  },
  errorText: {
    color: 'red',
    fontSize: responsiveScreenFontSize(1.7),
    fontFamily: fontConstant.regular,
  },
  sideModalContainer: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(30),
    alignSelf: 'center',
    backgroundColor: colorConstant.black,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: colorConstant.bordercolor,
    borderWidth: 1,
    paddingTop: responsiveScreenHeight(1),
  },
  searchcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchneros: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(93),
    borderRadius: 5,
    marginTop: responsiveScreenHeight(3),
  },
  inputText: {
    fontSize: responsiveScreenFontSize(2),
    fontFamily: fontConstant.medium,
    color: colorConstant.white,
    width: responsiveScreenWidth(80),
  },
  boldText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2.2),
  },
  iconImg: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(8),
    height: responsiveScreenHeight(2.5),
  },
  sideModalView: {
    justifyContent: 'center',
    width: 15,
    height: 30,
    zIndex: 1,
  },
  dotImg: {height: 20, alignSelf: 'center', width: 20},
  regularText: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2),
  },
  swiperContainer: {
    height: responsiveScreenHeight(55),
  },
  header: {
    marginBottom: responsiveScreenHeight(1),
    height: 60,
  },
  nameText: {
    fontFamily: fontConstant.regular,
    color: colorConstant.white,
    fontSize: responsiveScreenFontSize(2),
  },
  profiledetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(2.5),
  },
  profiledetailsView: {flexDirection: 'row', alignItems: 'center', gap: 10},
  mainimage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenHeight(1.5),
  },
  imageStyle: {
    alignSelf: 'center',
    borderRadius: 18,
  },
  mainImgStyle: {
    alignSelf: 'center',
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(55),
  },
  userImg: {
    resizeMode: 'cover',
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  placeholderImg: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(10),
    borderRadius: responsiveScreenWidth(5),
  },
  relativeView: {
    width: responsiveScreenWidth(95),
    // height: responsiveScreenHeight(55),
    position: 'relative',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: responsiveScreenWidth(95),
    position: 'absolute',
    bottom: 0,
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    opacity: 0.8,
  },
  underRowView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'auto',
    alignItems: 'center',
    width: responsiveScreenWidth(30),
  },
  bottomImg: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: responsiveScreenWidth(7),
    height: responsiveScreenHeight(3),
  },
  img: {
    resizeMode: 'cover',
    height: responsiveScreenHeight(20),
    width: responsiveScreenWidth(40),
    borderRadius: 8,
  },
  headerText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Sulphur Point',
    color: colorConstant.black,
    fontWeight: '600',
  },
  btn: {
    backgroundColor: '#C2C1C1',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 31,
  },
  commentItem: {
    flexDirection: 'row',
    marginTop: responsiveScreenHeight(4),
    gap: responsiveScreenWidth(3),
    // height: responsiveScreenHeight(8),
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: responsiveScreenWidth(89),
  },
  profilepic: {
    // backgroundColor: 'green',
    width: 25,
    height: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commenterName: {
    fontSize: 16,
    fontFamily: fontConstant.bold,
    color: colorConstant.white,
    marginBottom: responsiveScreenHeight(0.5),
  },
  commentText: {
    fontFamily: fontConstant.medium,
    color: colorConstant.white,
    marginBottom: responsiveScreenHeight(0.5),
  },
  commentTextContainer: {
    width: responsiveScreenWidth(65),
    paddingBottom: responsiveScreenHeight(2),
  },
  commenterProfileImage: {
    resizeMode: 'contain',
    width: 26,
    height: 26,
    borderRadius: 12.5,
  },
  modalContainer: {
    position: 'absolute',
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(46),
    alignSelf: 'center',
    bottom: responsiveScreenHeight(5),
    backgroundColor: colorConstant.black,
    borderRadius: 5,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 1,
    elevation: 11,
  },
  modalContainerShare: {
    position: 'absolute',
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(60),
    alignSelf: 'center',
    bottom: responsiveScreenHeight(4),
    backgroundColor: colorConstant.black,
    borderRadius: 5,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 1,
    elevation: 11,
  },
  textinputcontainer: {
    backgroundColor: '#5A5A5A',
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: responsiveScreenWidth(2),
    borderRadius: 20,
    // bottom: -30,
    position: 'absolute',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colorConstant.bordercolor,
  },
  input: {
    width: responsiveScreenWidth(78),
    color: 'white',
    paddingHorizontal: responsiveScreenWidth(2),
  },
  listcontainer: {
    height: responsiveScreenHeight(45),
  },
  notFoundText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
  },
  bottomRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    // justifyContent:'space-between',
    width: responsiveScreenWidth(93),
    marginTop: responsiveScreenHeight(1.5),
  },
  bottomProfile: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  commentTextView: {
    marginLeft: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(2),
  },
  dateText: {
    color: colorConstant.lightText,
    marginLeft: responsiveScreenWidth(2.5),
    marginTop: responsiveScreenWidth(2),
    marginBottom: responsiveScreenWidth(2),
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: fontConstant.regular,
  },
  titleText: {
    color: colorConstant.white,
    width: responsiveScreenWidth(95),
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(2),
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: fontConstant.regular,
  },
  placeholderContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    width: responsiveScreenWidth(100),
    gap: responsiveScreenHeight(2),
  },
  placeholderHeader: {
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(7),
    borderRadius: 12,
    backgroundColor: '#E1E9EE',
    marginBottom: responsiveScreenHeight(0.5),
  },
  placeholderImage: {
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(55),
    borderRadius: 12,
    backgroundColor: '#E1E9EE', // Placeholder background color
    // marginRight: 10,
  },

  placeholderText: {
    // flex: 1,
    height: responsiveScreenHeight(10),
    width: responsiveScreenWidth(95),
    borderRadius: 12,
    backgroundColor: '#E1E9EE', // Placeholder background color
  },
});
