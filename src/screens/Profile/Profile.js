import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
} from 'react-native';
// import {FlagButton} from 'react-native-country-picker-modal';
// import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import CommonButton from '../../components/CommonButton';
import NewHeader from '../../components/NewHeader';
import {userProfileDetails} from '../../redux/reducers/authSlice';
import client from '../../utils/baseUrl';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CountryFlag from 'react-native-country-flag';

export default function NewMyProfile(props) {
  const userProfileData = useSelector(state => state?.auth?.curretUser);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('post');
  const [isGallerySticky, setIsGallerySticky] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMagz, setLoadingMagz] = useState(false);
  const [selectedTabData, setSelectedTabData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isFirtstTimeLoad, setFirstTimeLoad] = useState(true);
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const itemsPerLoad = 10;
  const countryCodes = require('country-codes-list');
  const myCountryCodesObject = countryCodes.customList(
    'countryCode',
    '[{countryNameEn}]',
  );

  const getCountryCodeByCountryName = countryName => {
    const lowerCaseCountryName = countryName?.toLowerCase();

    const entry = Object?.entries(myCountryCodesObject)?.find(
      ([code, name]) => {
        const lowerCaseCurrentCountryName = name?.toLowerCase();
        return (
          lowerCaseCurrentCountryName &&
          lowerCaseCurrentCountryName?.includes(lowerCaseCountryName)
        );
      },
    );

    return entry ? entry[0] : 'India';
  };

  // Example usage:
  const inputCountryName = userProfileData?.country; // Replace with the actual country name you have
  const countryCode = getCountryCodeByCountryName(inputCountryName);

  // if (countryCode) {
  //   // console.log(`Country Code for ${inputCountryName}: ${countryCode}`);
  // } else {
  //   // console.log(`Country Code not found for ${inputCountryName}`);
  // }

  const toggleAdditionalContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  const groupedImages = selectedTabData?.reduce((groups, post) => {
    if (selectedTabData && post && post?.type === 'post') {
      const category = post?.category;
      const subCategory = post?.subCategory;

      // Check if category is present
      if (category) {
        // If the group for this category doesn't exist, create it
        if (!groups[category]) {
          groups[category] = {subCategory, images: []};
        }

        // Check if post.images is an array and not null or undefined
        if (Array?.isArray(post?.images)) {
          groups[category]?.images?.push(
            ...post?.images?.filter(
              image => image !== null && image !== undefined,
            ),
          );
        }
      }
    }
    return groups;
  }, {});

  const groupedImagesMagz = selectedTabData?.reduce((groups, post) => {
    if (selectedTabData && post && post?.type === 'mags') {
      const category = post?.category;
      const subCategory = post?.subCategory;

      // Check if category is present
      if (category) {
        // If the group for this category doesn't exist, create it
        if (!groups[category]) {
          groups[category] = {subCategory, images: []};
        }

        // Check if post.images is an array and not null or undefined
        if (Array.isArray(post.images)) {
          groups[category].images.push(
            ...post.images.filter(
              image => image !== null && image !== undefined,
            ),
          );
        }
      }
    }
    return groups;
  }, {});

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      loadInitialValues();
      getSelectedTabData(1, true);
      setActivePage(1);
      setFirstTimeLoad(false);
    });

    // Update the selectedTab state when navigating back
    const unsubscribeBlur = props.navigation.addListener('blur', () => {
      setSelectedTab('post'); // Assuming 'post' is the default tab
    });

    return () => {
      unsubscribe();
      unsubscribeBlur();
    };
  }, [props.navigation]);

  useEffect(() => {
    if (!isFirtstTimeLoad) {
      getSelectedTabData(1, true);
      setActivePage(1);
    }
  }, [selectedTab]);

  const loadInitialValues = async () => {
    dispatch(userProfileDetails());
  };

  const getSelectedTabData = (page = 1, isFirtstTime = false) => {
    setLoading(true);
    setLoadingMagz(true);
    client
      .get(
        `user/post/all?type=${selectedTab}&page=${page}&itemSize=${itemsPerLoad}`,
      )
      .then(res => {
        setLoading(false);
        setLoadingMagz(false);
        if (res?.status === 200) {
          if (res.data.data !== null) {
            setSelectedTabData(
              isFirtstTime
                ? res?.data?.data
                : [...selectedTabData, ...res?.data?.data],
            );
            // Set selectedTab here to ensure it gets updated correctly
            setSelectedTab(selectedTab);
          }
        }
      })
      .catch(function (error) {
        setLoading(false);
        setLoadingMagz(false);
      });
  };

  const loadMoreData = () => {
    getSelectedTabData(activePage + 1);
    setActivePage(activePage + 1);
  };

  const listEmptyMagzComponent = () => {
    if (loadingMagz)
      return (
        <SkeletonPlaceholder
          backgroundColor={colorConstant.backgroundBlack}
          highlightColor={colorConstant.bordercolor}
          speed={800}>
          <View style={styles.placeholderContainer}>
            <View style={styles.placeholderImage} />
            <View style={styles.placeholderImage} />
            <View style={styles.placeholderImage} />
            <View style={styles.placeholderImage} />
          </View>
        </SkeletonPlaceholder>
      );
  };

  const listEmptyGalleryComponent = () => {
    if (loading)
      return (
        <SkeletonPlaceholder
          backgroundColor={colorConstant.backgroundBlack}
          highlightColor={colorConstant.bordercolor}
          speed={800}>
          <View style={styles.placeholderContainer}>
            <View style={styles.placeholderImage} />
            <View style={styles.placeholderImage} />
            <View style={styles.placeholderImage} />
            <View style={styles.placeholderImage} />
          </View>
        </SkeletonPlaceholder>
      );
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
      // loadMoreData();
    }
  };

  return (
    <>
      {/* <LoaderScreen data={loading} /> */}
      <SafeAreaView style={styles.mainContainer}>
        <NewHeader
          navigation={props.navigation}
          rightNavigation={() => props.navigation.openDrawer()}
        />

        <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
          <View style={styles.rowView}>
            {userProfileData?.userImage ? (
              <Image
                source={{uri: userProfileData?.userImage}}
                style={styles.profileImg}
              />
            ) : (
              <Image
                source={imageConstant.profile1}
                style={styles.profileImg}
              />
            )}
            <View style={styles.columnView}>
              <View style={styles.flexRowAliCenG5}>
                <Text style={styles.nameText} numberOfLines={1}>
                  {userProfileData?.username}
                </Text>
                <Image
                  source={
                    userProfileData?.userType === 'collectors'
                      ? imageConstant?.nerocollector
                      : userProfileData?.userType === 'alliance'
                      ? imageConstant?.neroalliance
                      : userProfileData?.userType === 'inner circle'
                      ? imageConstant?.nerocircle
                      : null
                  }
                  style={styles.memberImg}
                />

                <CountryFlag isoCode={countryCode} size={20} />
              </View>

              <View style={styles.underRowView}>
                {userProfileData?.best == null ||
                userProfileData?.best == '' ? null : (
                  <View style={styles.box}>
                    <Text style={styles.boxText} numberOfLines={1}>
                      {userProfileData?.best}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.underRowView1}>
                <View style={styles.colView}>
                  <Text style={styles.postText}>Post</Text>
                  <Text style={styles.numberText}>
                    {userProfileData?.postCount ?? 0}
                  </Text>
                </View>
                <View style={styles.colView}>
                  <Text style={styles.postText}>Addicts</Text>
                  <Text style={styles.numberText}>
                    {userProfileData?.follower ? userProfileData?.follower : 0}
                  </Text>
                </View>
              </View>

              <CommonButton
                height={responsiveScreenHeight(4)}
                width={responsiveScreenWidth(20)}
                marginTop={5}
                buttonTitle={'Edit'}
                fontSize={responsiveScreenFontSize(1.8)}
                onButtonPress={() => props.navigation.navigate('EditProfile')}
              />
            </View>
          </View>

          <Text style={styles.aboutText}>About</Text>
          <Text style={styles.text}>{userProfileData?.about}</Text>
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
              {userProfileData?.website !== '' &&
              userProfileData?.website !== null ? (
                <TouchableOpacity
                  style={{width: responsiveScreenWidth(95)}}
                  onPress={() => Linking.openURL(userProfileData.website)}>
                  <Text numberOfLines={1} style={styles.text2}>
                    {userProfileData?.website}
                  </Text>
                </TouchableOpacity>
              ) : null}

              <View style={styles.row}>
                {userProfileData?.pinteresturl !== '' &&
                userProfileData?.pinteresturl !== null ? (
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(userProfileData.pinteresturl)
                    }>
                    <Image source={imageConstant.pinterest} />
                  </TouchableOpacity>
                ) : null}
                {userProfileData?.behanceurl !== '' &&
                userProfileData?.behanceurl !== null ? (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(userProfileData.behanceurl)}>
                    <Image source={imageConstant.behance} />
                  </TouchableOpacity>
                ) : null}
                {userProfileData?.instagramurl !== '' &&
                userProfileData?.instagramurl !== null ? (
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(userProfileData.instagramurl)
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

          {selectedTab === 'post' && (
            <View>
              {loading ? (
                listEmptyGalleryComponent()
              ) : (
                <View>
                  {Object.keys(groupedImages).length === 0 ? (
                    <View style={styles.notFoundView}>
                      <Text style={styles.notFoundText}>No data available</Text>
                    </View>
                  ) : (
                    <View style={styles.mainView}>
                      {Object?.keys(groupedImages)?.map((category, index) => (
                        <View key={index} style={styles.profileView}>
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              const images = groupedImages[category]?.images;
                              const subCategory =
                                groupedImages[category]?.subCategory;

                              if (subCategory) {
                                // If subCategory is present, navigate to SubCategoryFolder
                                props.navigation.navigate('SubCategoryFolder', {
                                  category: category,
                                  subCategory: subCategory,
                                  images: images,
                                });
                              } else {
                                // If subCategory is null, navigate to ImageMappingScreen
                                props.navigation.navigate(
                                  'ImageMappingScreen',
                                  {
                                    category: category,
                                    images: images,
                                  },
                                );
                              }
                            }}
                            style={styles.groupedImagesView}>
                            {groupedImages[category].images
                              .slice(0, 4)
                              .map((imageUrl, imageIndex) => (
                                <Image
                                  key={imageIndex}
                                  source={{uri: imageUrl}}
                                  style={{
                                    width:
                                      groupedImages[category].images.length ===
                                      1
                                        ? '98%'
                                        : groupedImages[category].images
                                            .length === 2
                                        ? '98%'
                                        : '47%',
                                    height:
                                      groupedImages[category].images.length ===
                                      1
                                        ? responsiveScreenHeight(18.5)
                                        : groupedImages[category].images
                                            .length === 2
                                        ? responsiveScreenHeight(9)
                                        : responsiveScreenHeight(9),
                                    borderRadius: 8,
                                    marginVertical: responsiveScreenHeight(0.4),
                                    // resizeMode:'stretch'
                                  }}
                                />
                              ))}
                            {groupedImages[category].images.length > 4 && (
                              <View style={styles.groupImgView}>
                                <Text style={styles.numberText}>
                                  +{groupedImages[category].images.length - 4}
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
          )}
          {selectedTab === 'mags' && (
            <View>
              {loadingMagz ? (
                listEmptyMagzComponent()
              ) : (
                <View>
                  {Object.keys(groupedImagesMagz).length === 0 ? (
                    <View style={styles.notFoundView}>
                      <Text style={styles.notFoundText}>No data available</Text>
                    </View>
                  ) : (
                    <View style={styles.mainView}>
                      {Object?.keys(groupedImagesMagz)?.map(
                        (category, index) => (
                          <View key={index} style={styles.profileView}>
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                const images =
                                  groupedImagesMagz[category].images;
                                const subCategory =
                                  groupedImagesMagz[category].subCategory;

                                if (subCategory) {
                                  // If subCategory is present, navigate to SubCategoryFolder
                                  props.navigation.navigate(
                                    'SubCategoryFolder',
                                    {
                                      category: category,
                                      subCategory: subCategory,
                                      images: images,
                                    },
                                  );
                                } else {
                                  // If subCategory is null, navigate to ImageMappingScreen
                                  props.navigation.navigate(
                                    'ImageMappingScreenMagz',
                                    {
                                      category: category,
                                      images: images,
                                    },
                                  );
                                }
                              }}
                              style={styles.groupedImagesView}>
                              {groupedImagesMagz[category].images
                                .slice(0, 4)
                                .map((imageUrl, imageIndex) => (
                                  <Image
                                    key={imageIndex}
                                    source={{uri: imageUrl}}
                                    style={{
                                      width:
                                        groupedImagesMagz[category].images
                                          .length === 1
                                          ? '98%'
                                          : groupedImagesMagz[category].images
                                              .length === 2
                                          ? '98%'
                                          : '47%',
                                      height:
                                        groupedImagesMagz[category].images
                                          .length === 1
                                          ? responsiveScreenHeight(18.5)
                                          : groupedImagesMagz[category].images
                                              .length === 2
                                          ? responsiveScreenHeight(9)
                                          : responsiveScreenHeight(9),
                                      borderRadius: 8,
                                      marginVertical:
                                        responsiveScreenHeight(0.4),
                                      // resizeMode:'stretch'
                                    }}
                                  />
                                ))}
                              {groupedImagesMagz[category].images.length >
                                4 && (
                                <View style={styles.groupImgView}>
                                  <Text style={styles.numberText}>
                                    +
                                    {groupedImagesMagz[category].images.length -
                                      4}
                                  </Text>
                                </View>
                              )}
                            </TouchableOpacity>
                            <Text style={styles.categoryText}>{category}</Text>
                          </View>
                        ),
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        </ScrollView>
        {/* </Animated.ScrollView> */}
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
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colorConstant.black,
    flex: 1,
  },
  categoryText: {
    color: 'white',
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2),
    marginLeft: responsiveScreenWidth(1),
  },
  numberText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fontConstant.regular,
  },
  groupImgView: {
    width: '100%',
    height: 40,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 8,
    left: responsiveScreenWidth(16),
  },
  groupedImagesView: {
    width: '100%',
    backgroundColor: '#212121',
    borderRadius: 12,
    justifyContent: 'center',
    padding: responsiveScreenHeight(0.5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor:'green'
  },
  mainView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenWidth(1),
    marginBottom: responsiveScreenHeight(2),
  },
  profileView: {
    width: '49%',
    borderRadius: 12,
    justifyContent: 'center',
    // marginVertical: 5,
    paddingVertical: responsiveScreenHeight(1),
    marginTop: responsiveScreenHeight(1),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenWidth(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: responsiveScreenHeight(1.5),
    marginLeft: responsiveScreenWidth(4),
  },
  boxView: {
    width: responsiveScreenWidth(55),
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginTop: 5,
    gap: 3,
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
    lineHeight: 25,
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
    // backgroundColor: 'red',
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%',
    alignSelf: 'center',
  },
  gridItem: {
    width: '47%',
    marginTop: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(1),
  },
  image: {
    resizeMode: 'cover',
    height: responsiveScreenHeight(30),
    width: responsiveScreenWidth(47),
    alignSelf: 'center',
    borderRadius: 12,
  },
  imageMainView: {
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
  listContainer: {
    alignItems: 'flex-start',
    width: responsiveScreenWidth(100),
    marginBottom: responsiveScreenHeight(2),
  },
  memberImg: {width: 30, height: 30, resizeMode: 'contain'},
  mh5: {marginHorizontal: 5},
  flexRowAliCenG5: {flexDirection: 'row', alignItems: 'center', gap: 5},
  portfolioview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    // justifyContent: 'center',
    width: responsiveScreenWidth(100),
    flexWrap: 'wrap',
  },
  placeholderImage: {
    width: responsiveScreenWidth(47),
    height: responsiveScreenHeight(20),
    borderRadius: 12,
    backgroundColor: '#E1E9EE', // Placeholder background color
    marginRight: 5,
    marginLeft: 5,
    marginTop: responsiveScreenHeight(2),
  },
});
