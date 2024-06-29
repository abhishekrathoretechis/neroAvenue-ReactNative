import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import NewHeader from '../../components/NewHeader';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  createChat,
  getOtherProfile,
  putFollowing,
  putUnfollowing,
  updateFollowStatus,
  userProfileDetails,
} from '../../redux/reducers/authSlice';
import {FlagButton} from 'react-native-country-picker-modal';
import CommonButton from '../../components/CommonButton';
import LoaderScreen from '../../utils/Loader';
import client from '../../utils/baseUrl';
import {getTrueFalseByYandN} from '../../utils/functions';

export default function NewOtherProfile(props) {
  const dispatch = useDispatch();
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [selected, setSelected] = useState(0);
  const idDetails = props?.route?.params?.IdDetails;

  const otherProfileDetails = useSelector(state => state?.auth?.otherProfile);
  const [otherProfile, setOtherProfile] = useState(otherProfileDetails);
  const isFollowing = useSelector(state => state.auth.followStatus);
  const imageData = otherProfileDetails?.post;
  const [isGallerySticky, setIsGallerySticky] = useState(false);
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [selectedTab, setSelectedTab] = useState('post');
  const [loading, setLoading] = useState(false);
  const [selectedTabData, setSelectedTabData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isFirtstTimeLoad, setFirstTimeLoad] = useState(true);
  const filterActiveNewPost =
    selectedTabData?.filter(e => e.type === 'post') || [];

  const itemsPerLoad = 10;
  const toggleAdditionalContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };
  const groupedImages = filterActiveNewPost?.length
    ? filterActiveNewPost?.reduce((groups, post) => {
        const category = post?.category || ''; // Convert to uppercase, handle undefined
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category]?.push(...post.images);
        return groups;
      }, {})
    : {};
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getProfile();

      getSelectedTabData(1, true);
      setActivePage(1);
      setFirstTimeLoad(false);
    });
    return unsubscribe;
  }, [props.navigation]);

  const getProfile = () => {
    dispatch(getOtherProfile(idDetails));
  };
  useEffect(() => {
    if (!isFirtstTimeLoad) {
      getSelectedTabData(1, true);
      setActivePage(1);
    }
  }, [selectedTab]);
  const getSelectedTabData = (page = 1, isFirtstTime = false) => {
    setLoading(true);
    client
      .get(
        `user/${idDetails}/post/all?type=${selectedTab}&page=${page}&itemSize=${itemsPerLoad}`,
      )
      .then(res => {
        setLoading(false);
        if (res?.status === 200) {
          setSelectedTabData(
            isFirtstTime
              ? res?.data?.data
              : [...selectedTabData, ...res?.data?.data],
          );
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };
  const loadMoreData = () => {
    getSelectedTabData(activePage + 1);
    setActivePage(activePage + 1);
  };
  const callFirstTab = () => {
    setFirst(1);
    setSecond(0);
    setSelected(1);
  };

  const callSecondTab = () => {
    setSelected(2);
    setFirst(0);
    setSecond(1);
  };

  const handleUpdateFollowStatusInPosts = async (userId, status) => {
    try {
      const updatedProfileDetails = {...otherProfileDetails, follow: status};
      setOtherProfile(updatedProfileDetails);
      const res = await dispatch(getOtherProfile(idDetails));
      return res;
    } catch (error) {
      console.error(
        'Error while updating follow status and fetching profile details:',
        error,
      );
      throw error;
    }
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

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderTouch}
        onPress={() =>
          props.navigation.navigate('OtherMagzScrollScreen', {
            idDetails: idDetails,
            singleMagzData: item,
          })
        }>
        <ImageBackground
          source={{uri: item.images?.[0]}}
          style={styles.image}
          // resizeMode='stretch'

          imageStyle={{borderRadius: 12}}>
          <Text variant="bodySmall" style={styles.bgText}>
            {item?.title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const listEmptyComponent = () => {
    return (
      <View style={styles.notFoundView}>
        <Text style={styles.notFoundText}>No data available</Text>
      </View>
    );
  };

  // const AnimatedHeaderView = Animated.createAnimatedComponent(View);
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Adjust the threshold as needed
    const stickyThreshold = responsiveScreenHeight(42);

    setIsGallerySticky(offsetY > stickyThreshold);
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const paddingToBottom = 10;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      loadMoreData();
    }
  };
  const sendIdForCreateChat = async () => {
    const x = await dispatch(createChat(idDetails)).unwrap();
    if (x.chatId !== null || x.chatId !== undefined || x.chatId !== '') {
      props.navigation.navigate('ChatScreen', {
        username: otherProfileDetails.name,
        chatId: x.chatId,
        userImage: otherProfileDetails?.userImage,
      });
    }
  };

  const getPostIdByCategory = (posts, category) => {
    // Filter posts by category
    const postsInCategory = posts.filter(post => post.category === category);

    // If there are posts in the desired category, return the postId of the first post
    if (postsInCategory.length > 0) {
      return postsInCategory[0].postId;
    } else {
      // If no posts found in the specified category, return null
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LoaderScreen data={loading} />
      <NewHeader navigation={props.navigation} rightImage={false} />

      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.rowView}>
          {otherProfileDetails?.userImage ? (
            <Image
              source={{uri: otherProfileDetails?.userImage}}
              style={styles.profileImg}
            />
          ) : (
            <Image source={imageConstant.profile1} style={styles.profileImg} />
          )}
          <View style={styles.columnView}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={styles.nameText}>
                {otherProfileDetails?.username}{' '}
              </Text>
              <Image
                source={
                  otherProfileDetails?.userType === 'collectors'
                    ? imageConstant?.nerocollector
                    : otherProfileDetails?.userType === 'alliance'
                    ? imageConstant?.neroalliance
                    : otherProfileDetails?.userType === 'inner circle'
                    ? imageConstant?.nerocircle
                    : null
                }
                style={styles.memberImg}
              />
            </View>

            <View style={styles.underRowView}>
              {otherProfileDetails?.best == null ||
              otherProfileDetails?.best == '' ? null : (
                <View style={styles.box}>
                  <Text style={styles.boxText} numberOfLines={1}>
                    {otherProfileDetails?.best}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.underRowView1}>
              <View style={styles.colView}>
                <Text style={styles.postText}>Post</Text>
                <Text style={styles.numberText}>
                  {otherProfileDetails?.postCount ?? 0}
                </Text>
              </View>
              <View style={styles.colView}>
                <Text style={styles.postText}>Addicts</Text>
                <Text style={styles.numberText}>
                  {otherProfileDetails?.follower ?? 0}
                </Text>
              </View>
            </View>

            <View style={styles.rowData}>
              <>
                <CommonButton
                  height={responsiveScreenHeight(4)}
                  width={responsiveScreenWidth(20)}
                  marginTop={1}
                  buttonTitle={
                    getTrueFalseByYandN(otherProfileDetails?.follow)
                      ? 'Unfollow'
                      : 'Follow'
                  }
                  fontSize={responsiveScreenFontSize(1.8)}
                  onButtonPress={() => {
                    getTrueFalseByYandN(otherProfileDetails?.follow)
                      ? onUnfollowing(otherProfileDetails?.id)
                      : onFollowing(otherProfileDetails?.id);
                  }}
                />
              </>
              <TouchableOpacity onPress={sendIdForCreateChat}>
                <Image source={imageConstant.msg} style={styles.msgButtom} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.aboutText}>About</Text>
        <Text style={styles.text}>{otherProfileDetails?.about}</Text>

        <View style={styles.portfolioview}>
          <Text style={styles.aboutText}>Portfolio</Text>
          <TouchableOpacity
            onPress={toggleAdditionalContent}
            style={{marginRight: responsiveScreenWidth(3)}}>
            <Image
              source={
                showAdditionalContent
                  ? imageConstant.uparrow
                  : imageConstant.downarrow
              }
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
        {showAdditionalContent && (
          <>
            <TouchableOpacity
              style={{width: responsiveScreenWidth(95)}}
              onPress={() => Linking.openURL(otherProfileDetails.website)}>
              <Text numberOfLines={1} style={styles.text2}>
                {otherProfileDetails?.website}
              </Text>
            </TouchableOpacity>

            <View style={styles.row}>
              {otherProfileDetails?.pinteresturl?.length > 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(otherProfileDetails.pinteresturl)
                  }>
                  <Image source={imageConstant.pinterest} />
                </TouchableOpacity>
              ) : null}
              {otherProfileDetails?.behanceurl?.length > 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(otherProfileDetails.behanceurl)
                  }>
                  <Image source={imageConstant.behance} />
                </TouchableOpacity>
              ) : null}
              {otherProfileDetails?.instagramurl?.length > 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(otherProfileDetails.instagramurl)
                  }>
                  <Image source={imageConstant.instagram} />
                </TouchableOpacity>
              ) : null}
            </View>
          </>
        )}

        <View style={styles.backgroundView}>
          <TouchableOpacity
            style={selectedTab === 'post' ? styles.tab : styles.disableTab}
            onPress={() => setSelectedTab('post')}>
            <Text style={styles.tabText}>Gallery</Text>
            {selectedTab === 'post' ? (
              <Image source={imageConstant.line} style={styles.tabLine} />
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            style={selectedTab === 'mags' ? styles.tab : styles.disableTab}
            onPress={() => setSelectedTab('mags')}>
            <Text style={styles.tabText}>Magz</Text>
            {selectedTab === 'mags' ? (
              <Image source={imageConstant.line} style={styles.tabLine} />
            ) : null}
          </TouchableOpacity>
        </View>

        <View>
          {selectedTab === 'post' && (
            <View style={{marginBottom: responsiveScreenHeight(3)}}>
              {filterActiveNewPost?.length === 0 ? (
                <View style={styles.notFoundView}>
                  <Text style={styles.notFoundText}>No data available</Text>
                </View>
              ) : (
                <View style={styles.imageView}>
                  {Object?.keys(groupedImages)?.map((category, index) => (
                    <View style={styles.objectView}>
                      <TouchableOpacity
                        key={index}
                        style={styles.groupImageView}
                        onPress={() =>
                          props.navigation.navigate('OtherProfileDetailsView', {
                            idDetails: idDetails,
                            postDetails: getPostIdByCategory(
                              filterActiveNewPost,
                              category,
                            ),
                          })
                        }>
                        {groupedImages[category]
                          ?.slice(0, 4)
                          ?.map((imageUrl, imageIndex) => (
                            <Image
                              key={imageIndex}
                              source={{uri: imageUrl}}
                              style={{
                                width:
                                  groupedImages[category].length === 1
                                    ? '98%'
                                    : groupedImages[category].length === 2
                                    ? '98%'
                                    : '47%',
                                height:
                                  groupedImages[category].length === 1
                                    ? responsiveScreenHeight(18.5)
                                    : groupedImages[category].length === 2
                                    ? 70
                                    : 70,
                                borderRadius: 8,
                                marginVertical: responsiveScreenHeight(0.5),
                              }}
                            />
                          ))}
                        {groupedImages[category]?.length > 4 && (
                          <View style={styles.textView}>
                            <Text style={styles.textImg}>
                              +{groupedImages[category].length - 4}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                      <Text style={styles.categoryText}>{category}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>

        {selectedTab === 'mags' && (
          <FlatList
            data={selectedTabData}
            keyExtractor={item => item?.postId?.toString()}
            renderItem={renderItem}
            ListEmptyComponent={listEmptyComponent}
            contentContainerStyle={styles.listContainer}
            numColumns={2}
            nestedScrollEnabled
          />
        )}
      </ScrollView>

      {isGallerySticky && (
        <View style={styles.stickyGalleryText}>
          <View style={styles.backgroundView}>
            <TouchableOpacity
              style={selectedTab === 'post' ? styles.tab : styles.disableTab}
              onPress={() => setSelectedTab('post')}>
              <Text style={styles.tabText}>Gallery</Text>
              {selectedTab === 'post' ? (
                <Image source={imageConstant.line} style={styles.tabLine} />
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              style={selectedTab === 'mags' ? styles.tab : styles.disableTab}
              onPress={() => setSelectedTab('mags')}>
              <Text style={styles.tabText}>Magz</Text>
              {selectedTab === 'mags' ? (
                <Image source={imageConstant.line} style={styles.tabLine} />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colorConstant.black,
    flex: 1,
  },
  portfolioview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    color: 'white',
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2),
    marginLeft: responsiveScreenWidth(1),
  },
  textImg: {
    color: 'white',
    fontSize: 16,
    fontFamily: fontConstant.regular,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: responsiveScreenHeight(1.5),
    marginLeft: responsiveScreenWidth(4),
  },
  textView: {
    width: '100%',
    height: 40,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: responsiveScreenHeight(1),
    left: responsiveScreenWidth(16),
  },
  groupImageView: {
    width: '100%',
    backgroundColor: '#212121',
    borderRadius: 12,
    justifyContent: 'center',
    paddingVertical: responsiveScreenHeight(0.5),

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenWidth(1),
  },
  objectView: {
    width: '49%',
    borderRadius: 12,
    justifyContent: 'center',
    paddingVertical: responsiveScreenHeight(1),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenWidth(1),
  },
  imageView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenWidth(1),
  },
  otherView: {
    width: responsiveScreenWidth(55),
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginTop: 5,
    gap: 3,
  },
  renderView: {
    elevation: responsiveScreenWidth(10),
    shadowColor: 'lightgrey',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 20,
    borderRadius: 20,
    padding: 5,
    marginVertical: responsiveScreenHeight(1),
  },
  renderTouch: {
    width: responsiveScreenWidth(47.5),
    marginTop: responsiveScreenHeight(1.5),
    borderWidth: 0.8,
    borderColor: colorConstant.lightWhite,
    justifyContent: 'center',
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: responsiveScreenHeight(0.5),
  },
  image: {
    resizeMode: 'cover',
    height: responsiveScreenHeight(30),
    width: responsiveScreenWidth(47),
    alignSelf: 'center',
    borderRadius: 12,
  },
  bgText: {
    color: '#ffffff',
    marginHorizontal: 10,
    marginVertical: 10,
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2.2),
    bottom: 10,
    position: 'absolute',
    width: '80%',
    zIndex: 10,
  },
  notFoundView: {
    justifyContent: 'center',
    height: responsiveScreenHeight(20),
    alignSelf: 'center',
  },
  notFoundText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
  },
  listContainer: {
    alignItems: 'flex-start',
    width: responsiveScreenWidth(100),
    marginBottom: responsiveScreenHeight(2),
  },
  memberImg: {width: 30, height: 30, resizeMode: 'contain'},
  text2: {
    color: '#2C6DF4', // You can customize the link color
    textDecorationLine: 'underline',
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2.2),
    textAlign: 'left',
    marginHorizontal: 20,
    lineHeight: 25,
  },
  rowView: {
    width: responsiveScreenWidth(95),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  profileImg: {
    resizeMode: 'cover',
    width: responsiveScreenWidth(35),
    height: responsiveScreenHeight(21),
    borderRadius: 12,
  },
  columnView: {
    width: responsiveScreenWidth(58),
    alignItems: 'flex-start',
  },
  nameText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2),
  },
  usernameText: {
    color: colorConstant.lightText1,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(1.8),
  },
  underRowView: {
    width: responsiveScreenWidth(55),
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  box: {
    backgroundColor: colorConstant.backgroundBlack,
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colorConstant.bordercolor,

    alignItems: 'center',
    flexDirection: 'row',
  },
  boxText: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(1.5),
    alignSelf: 'center',
    margin: responsiveScreenWidth(1.2),
  },
  underRowView1: {
    width: responsiveScreenWidth(43),
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    gap: 25,
    // justifyContent: 'space-around',
    marginTop: 10,
    marginLeft: 10,
  },
  colView: {
    gap: 2,
    alignItems: 'center',
  },
  postText: {
    color: colorConstant.lightText1,
    fontFamily: fontConstant.light,
    fontSize: responsiveScreenFontSize(2.2),
  },
  numberText: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2.2),
  },
  editbutton: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(20),
    marginTop: 5,
  },
  msgButtom: {
    height: 30,
    width: 30,
  },
  rowData: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveScreenHeight(1),
    width: responsiveScreenWidth(35),
    gap: 15,
  },
  aboutText: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2.2),
    marginHorizontal: 20,
    marginVertical: 15,
  },
  text: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2.2),
    textAlign: 'left',
    marginHorizontal: 20,
  },
  text1: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2.2),
    textAlign: 'left',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'red',
    width: responsiveScreenWidth(90),
  },
  backgroundView: {
    width: responsiveScreenWidth(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  tab: {
    width: responsiveScreenWidth(50),
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabLine: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(25),
    height: responsiveScreenHeight(3),
    alignSelf: 'center',
  },
  disableTab: {
    width: responsiveScreenWidth(50),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  tabText: {
    alignSelf: 'center',
    color: colorConstant.white,
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2.2),
  },
  img: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(20),
    width: responsiveScreenWidth(45),
  },
  img1: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(30),
    width: responsiveScreenWidth(50),
  },
  img2: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(30),
    width: responsiveScreenWidth(40),
  },
  stickyGalleryText: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    // backgroundColor: 'green',
    zIndex: 1,
    // paddingVertical: 10,
  },
});
