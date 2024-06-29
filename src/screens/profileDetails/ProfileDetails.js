import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FlatList,
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
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
  getAllByUserPost,
  getAllNestedComment,
  getUserFollowing,
  postAllComment,
  putFollowing,
  putLikeComment,
  putLikePost,
  putSavePost,
  putUnfollowing,
  putUnlikeComment,
  putUnlikePost,
  putUnsavePost,
  putUserHidePost,
  putUserShowPost,
} from '../../redux/reducers/authSlice';
import LoaderScreen from '../../utils/Loader';
import client from '../../utils/baseUrl';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {
  getTrueFalseByYandN,
  getUniqArrayByCommentId,
} from '../../utils/functions';
import CommonProfileBottom from '../../components/CommonProfileBottom';
import CommonProfileSingleImage from '../../components/CommonProfileSingleImage';
import CommonProfileImage from '../../components/CommonProfileImage';
import CommonHideImage from '../../components/CommonHideImage';
import CommonProfileDetailsHeader from '../../components/CommonProfileDetailsHeader';
import CommonCommentModal from '../../components/CommonCommentModal';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CommonNestedCommentModal from '../../components/CommonNestedCommentModal';
import toastShow from '../../utils/Toast';

const ProfileDetails = props => {
  const dispatch = useDispatch();
  const userPost = useSelector(state => state?.auth?.userAllPost);
  const postId = props?.route?.params?.postDetails;

  const userProfileData = useSelector(state => state?.auth?.curretUser);
  const userProfileId = userProfileData?.id;
  const [isModalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [sideModalVisible, setSideModalVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [followUser, setFollowUser] = useState({});
  const [panGestureEnabled, setPanGestureEnabled] = useState(true);
  const [sideModalId, setSideModalId] = useState('');
  const [status, setStatus] = useState('');
  const initialIndexFilterUserPost = userPost?.findIndex(
    item => item?.id === props?.route?.params?.postDetails?.id,
  );
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerLoad = 10;
  const [commentList, setCommentList] = useState([]);
  const [activeCommentPage, setActiveCommentPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [nestedCommentList, setNestedCommentList] = useState([]);
  const [nestedCommentId, setNestedCommentId] = useState('');
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [nestedComment, setNestedComment] = useState('');
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getPostData(1, true);
      // callUserFollowing();
      setActivePage(1);
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedFollowStatus = await AsyncStorage.getItem('followStatus');
        if (storedFollowStatus) {
          setFollowUser(JSON.parse(storedFollowStatus));
        }
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataForLike = async () => {
      try {
        const storedLikedPosts = await AsyncStorage.getItem('likedPosts');
        if (storedLikedPosts) {
          setLikedPosts(JSON.parse(storedLikedPosts));
        }
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    };

    fetchDataForLike();
  }, []);

  // ...

  const getPostData = (page, isFirstTime = false) => {
    setLoading(true);
    client
      .get(`post/${postId}/mypostdetails?page=${page}&itemSize=${itemsPerLoad}`)
      .then(res => {
        const result = res?.data?.data;
        setPosts(isFirstTime ? result : [...posts, ...result]);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const loadMorePosts = () => {
    getPostData(activePage + 1);
    setActivePage(activePage + 1);
  };

  const handleUpdateLikeStatusInPosts = (pstId, data) => {
    const reqPosts = posts?.map(post => {
      if (post?.postId === pstId) return data;
      return post;
    });
    setPosts(reqPosts);
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

  const handleCommentByPostId = (pstId, isInitial = false, page = 1) => {
    setLoading(true);
    client
      .get(`post/${pstId}/comments?page=${page}&itemSize=${itemsPerLoad}`)
      .then(res => {
        const result = res?.data?.data ?? [];
        setCommentList(
          isInitial
            ? result
            : getUniqArrayByCommentId([...commentList, ...result]),
        );
        handeCmntAndLikeCountInPosts(pstId, res?.data?.totalComments);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const handleComment = id => {
    handleCommentByPostId(id, true);
    setActiveCommentPage(1);
    setSelectedPostId(id);
    setModalVisible(true);
  };

  const handleLikePost = async postId => {
    try {
      const res = await dispatch(putLikePost(postId));
      handleUpdateLikeStatusInPosts(postId, res?.payload?.data);
    } catch (error) {
      console.error('Error while liking post:', error);
    }
  };

  const handleUnlikePost = async postId => {
    try {
      const res = await dispatch(putUnlikePost(postId));
      handleUpdateLikeStatusInPosts(postId, res?.payload?.data);
    } catch (error) {
      console.error('Error while unliking post:', error);
    }
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
  const getPostByPostId = id => {
    const res = posts?.find(pst => pst?.postId == id);
    return getTrueFalseByYandN(res?.savePost);
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

  const listEmptyComponentModal = () => {
    if (loading) return;

    return (
      <View style={[styles.notFoundView, {height: responsiveScreenHeight(50)}]}>
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

  const sideModal = id => {
    setSideModalVisible(true);
    setSideModalId(id);
  };
  const gotoProfilePage = id => {
    if (userProfileId == id) {
      props.navigation.navigate('DrawerTabNavigation');

      // Navigate to BottomTabNavigation within DrawerTabNavigation
      props.navigation.navigate('BottomTabNavigation');

      // Now navigate to the NewMyProfile screen within BottomTabNavigation
      props.navigation.navigate('NewMyProfile');
    } else {
      props.navigation.navigate('OtherProfileView', {
        IdDetails: id,
      });
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          marginTop: responsiveScreenHeight(3),
        }}>
        <CommonProfileDetailsHeader
          item={item}
          gotoProfilePage={gotoProfilePage}
          sideModal={sideModal}
          setStatus={setStatus}
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
                <View key={imageIndex}>
                  {item.status !== 'Y' ? (
                    <CommonHideImage source={imageUrl} value={false} />
                  ) : (
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
                  )}
                </View>
              ))}
            </Swiper>
          ) : (
            <View>
              {item.status !== 'Y' ? (
                <CommonHideImage source={item?.images[0]} value={true} />
              ) : (
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
              )}
            </View>
          )}
        </View>

        <CommonProfileBottom item={item} onCreditHandle={gotoProfilePage} />
      </View>
    );
  };

  const updateActiveStatusPost = (id, stus) => {
    const reqPosts = posts?.map(pst => {
      if (pst?.postId === id) return {...pst, status: stus};
      return pst;
    });
    setPosts(reqPosts);
  };

  const userHidePost = async () => {
    const data = new FormData();
    data.append('postId', sideModalId);
    const res = await dispatch(putUserHidePost(data));
    if (res?.payload?.data?.status === 200) {
      updateActiveStatusPost(sideModalId, 'N');
    }
    setSideModalVisible(false);
  };

  const userShowPost = async () => {
    const data = new FormData();
    data.append('postId', sideModalId);
    const res = await dispatch(putUserShowPost(data));
    if (res?.payload?.data?.status === 200) {
      updateActiveStatusPost(sideModalId, 'Y');
    }
    setSideModalVisible(false);
  };

  const getAllCommentsByPostId = id => {
    const reqComments = posts?.find(post => post?.postId === id);
    return reqComments?.totalComments ?? 0;
  };

  const handleLoadMoreComments = () => {
    handleCommentByPostId(selectedPostId, false, activeCommentPage + 1);
    setActiveCommentPage(activeCommentPage + 1);
  };

  const handleCommentModalClose = () => {
    setCommentList([]);
    setActiveCommentPage(1);
    setModalVisible(false);
  };

  const ListEmptyComponentForAllPost = () => {
    if (loading) return Placeholder();
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
  const handleDeletePost = () => {
    client
      .delete(`post/delete?postIds=${sideModalId}`)
      .then(res => {
        if (res?.status === 200) {
          getPostData(1, true);
          toastShow(res.data.message, 'green');
          setDeleteModalVisible(false);
          setSideModalVisible(false);
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  };

  return (
    <>
      {/* <LoaderScreen data={loading} /> */}
      <SafeAreaView style={styles.maincontainer}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          gestureEnabled={panGestureEnabled} // Control whether the list responds to gestures
          initialScrollIndex={initialIndexFilterUserPost}
          initialNumToRender={posts?.length}
          ListEmptyComponent={ListEmptyComponentForAllPost}
          getItemLayout={(data, index) => ({
            length: responsiveScreenHeight(81),
            offset: responsiveScreenHeight(79) * index,
            index,
          })}
          onScroll={({nativeEvent}) => {
            const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
            const paddingToBottom = 10;
            if (
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - paddingToBottom
            ) {
              loadMorePosts();
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
            <View style={styles.modalmaincontainer}>
              <Text style={styles.modaltext}>
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
                item?.commentId?.toString() || index?.toString()
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

            <View style={styles.commentcontainer}>
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
            <View style={styles.modalmaincontainer}>
              <Text style={styles.modaltext}>
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
            <View style={styles.commentcontainer}>
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
              style={styles.modaltouchable}
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

            <TouchableOpacity onPress={onShare} style={styles.onsharecontainer}>
              <Image source={imageConstant.upload} />
              <Text style={styles.onsharetext}>Share</Text>
            </TouchableOpacity>

            {status == 'Y' ? (
              <TouchableOpacity
                style={styles.onsharecontainer}
                onPress={userHidePost}>
                <View>
                  <Feather
                    name={'eye-off'}
                    size={24}
                    color={colorConstant.white}
                  />
                </View>
                <Text style={styles.onsharetext}>Hide</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={userShowPost}
                style={styles.onsharecontainer}>
                <View>
                  <Feather name={'eye'} size={24} color={colorConstant.white} />
                </View>
                <Text style={styles.onsharetext}>Unhide</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setDeleteModalVisible(true)}
              style={styles.onsharecontainer}>
              <Image
                source={imageConstant.deletes}
                style={{width: 24, height: 24, resizeMode: 'contain'}}
              />
              <Text style={styles.onsharetext}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* delete modal visible */}

        <Modal
          animationType="slide"
          transparent={true}
          backdropOpacity={0.7}
          visible={isDeleteModalVisible}>
          <View style={styles.modalContainerdelete}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(false)}
                style={styles.crossTouch}>
                <Image source={imageConstant.cross} />
              </TouchableOpacity>
              <Text style={styles.deleteText}>Delete</Text>
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
      </SafeAreaView>
    </>
  );
};

export default ProfileDetails;
const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: 'black',
    flex: 1,
  },
  text1: {
    color: 'white',
    marginTop: responsiveScreenHeight(1),
    fontSize: responsiveScreenFontSize(2.2),
    fontFamily: fontConstant.regular,
    color: '#979797',
    textAlign: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: responsiveScreenFontSize(2.5),
    fontFamily: fontConstant.bold,
    marginTop: responsiveScreenHeight(1),
  },
  crossTouch: {position: 'absolute', right: 7, top: 15},
  deleteTouch: {justifyContent: 'center', alignItems: 'center', gap: 7},

  descriptionText: {
    fontFamily: fontConstant.medium,
    color: colorConstant.gray,
    fontSize: responsiveScreenFontSize(2.2),
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
    fontSize: responsiveScreenFontSize(2),
  },
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
    fontFamily: fontConstant.light,
    color: colorConstant.white,
    fontSize: responsiveScreenFontSize(2),
  },
  profiledetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(2.5),
  },
  mainimage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenHeight(1.5),
    // backgroundColor:'red'
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
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
  modalmaincontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(93),
    paddingRight: responsiveScreenWidth(1.5),
    marginTop: 5,
  },

  modaltext: {
    color: colorConstant.white,
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
    alignSelf: 'flex-start',
    padding: 10,
  },
  commentcontainer: {
    alignSelf: 'center',
    backgroundColor: '#272727',
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(8),
    position: 'absolute',
    bottom: responsiveScreenHeight(-7),
    justifyContent: 'center',
  },

  modaltouchable: {
    alignSelf: 'center',
    backgroundColor: '#272727',
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(8),
    position: 'absolute',
    bottom: responsiveScreenHeight(-7),
    justifyContent: 'center',
  },
  onsharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveScreenWidth(5),
    marginHorizontal: responsiveScreenWidth(5),
    marginVertical: responsiveScreenHeight(1),
    width: responsiveScreenWidth(90),
  },
  onsharetext: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2.3),
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
  notFoundView: {
    justifyContent: 'center',
    height: responsiveScreenHeight(45),
    alignSelf: 'center',
    width: responsiveScreenWidth(100),
    backgroundColor: 'red',
  },
  notFoundText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
    textAlignVertical: 'center',
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
    marginLeft: responsiveScreenWidth(2.5),
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
  notFoundView: {
    justifyContent: 'center',
    height: responsiveScreenHeight(100),
    alignSelf: 'center',
  },
  notFoundText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
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
  modalContent: {
    backgroundColor: 'black',
    height: responsiveScreenHeight(20),
    width: responsiveScreenWidth(85),
    borderRadius: responsiveScreenWidth(5),

    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(3),
  },
  modalContainerdelete: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: responsiveScreenHeight(10),
  },
});
