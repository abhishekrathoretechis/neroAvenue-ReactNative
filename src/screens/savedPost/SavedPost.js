import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import LoaderScreen from '../../utils/Loader';
import client from '../../utils/baseUrl';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import NewHeader from '../../components/NewHeader';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
export default function SavedPost(props) {
  const [savedPost, setSavedPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePagePage] = useState(1);
  const [selectedTab, setSelectedTab] = useState('post');

  const itemsPerLoad = 30;

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getSavedPost(selectedTab, 1);
      setActivePagePage(1);
      setSavedPost([]);
    });
    return unsubscribe;
  }, [props.navigation,selectedTab]);

  const getSavedPost = async (type, page) => {
    setLoading(true);
    client
      .get(`user/savedPosts?type=${type}&page=${page}&itemSize=${itemsPerLoad}`)
      .then(res => {
        setLoading(false);
        if (res?.status === 200) {
          setSavedPost(prevSavedPost => [...prevSavedPost, ...res?.data?.data]);
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const groupPostsByCategory = () => {
    const groupedPosts = savedPost.reduce((result, post) => {
      const category = post.category;
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(post);
      return result;
    }, {});

    return groupedPosts;
  };
  const ListEmptyComponentForAllPost = () => {
    if (loading)
      return Placeholder();
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
        {[1, 2, 3, 4, 5, 6].map(key => (
          <View key={key} style={styles.placeholderImage} />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
  const renderGroupedImages = () => {
    const groupedPosts = groupPostsByCategory();
    if (savedPost.length === 0) {
      return ListEmptyComponentForAllPost();
    } else {
      return (
        <View style={styles.mainView}>
          {Object.keys(groupedPosts).map((category, index) => (
            <View key={index} style={styles.profileView}>
              <TouchableOpacity
                key={index}
                style={styles.groupedImagesView}
                onPress={() =>
                  selectedTab === 'post'
                    ? props.navigation.navigate('SavedPostDetailsGallery', {
                        postDetails: groupedPosts[category][0].postId,
                      })
                    : props.navigation.navigate('MagzScrollSavedScreen', {
                        singleMagzData: groupedPosts[category][0],
                      })
                }>
                {groupedPosts[category].slice(0, 4).map((post, imageIndex) => (
                  <Image
                    key={imageIndex}
                    source={{uri: post.images[0]}}
                    style={{
                      width:
                        groupedPosts[category].length === 1
                          ? '98%'
                          : groupedPosts[category].length === 2
                          ? '98%'
                          : '47%',
                      height:
                        groupedPosts[category].length === 1
                          ? responsiveScreenHeight(18.5)
                          : groupedPosts[category].length === 2
                          ? responsiveScreenHeight(9)
                          : responsiveScreenHeight(9),
                      borderRadius: 8,
                      marginVertical: responsiveScreenHeight(0.4),
                      // resizeMode:'stretch'
                    }}
                  />
                ))}
                {groupedPosts[category].length > 4 && (
                  <View style={styles.groupImgView}>
                    <Text style={styles.numberText}>
                      +{groupedPosts[category].length - 4}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>
      );
    }
  };

 

  const onEndReached = () => {
    getSavedPost(selectedTab, activePage + 1);
    setActivePagePage(activePage + 1);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LoaderScreen data={loading} />
      <NewHeader
        rightImage={false}
        navigation={props.navigation}
        title={'Collections'}
      />
      <View style={styles.backgroundView}>
        <TouchableOpacity
          style={selectedTab === 'post' ? styles.tab : styles.disableTab}
          onPress={() => {
            setSelectedTab('post');
            setActivePagePage(1);
            setSavedPost([]);
            getSavedPost('post', 1);
          }}>
          <Text style={styles.tabText}>Gallery</Text>
          {selectedTab === 'post' ? (
            <Image source={imageConstant.line} style={styles.tabLine} />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedTab === 'mags' ? styles.tab : styles.disableTab}
          onPress={() => {
            setSelectedTab('mags');
            setActivePagePage(1);
            setSavedPost([]);
            getSavedPost('mags', 1);
          }}>
          <Text style={styles.tabText}>Magz</Text>
          {selectedTab === 'mags' ? (
            <Image source={imageConstant.line} style={styles.tabLine} />
          ) : null}
        </TouchableOpacity>
      </View>
      <ScrollView
        onScroll={({nativeEvent}) => {
          const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
          const paddingToBottom = 10;
          if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
          ) {
            onEndReached();
          }
        }}>
        {renderGroupedImages()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colorConstant.black,
    flex: 1,
  },
  notFoundView: {
    justifyContent: 'center',
    height: responsiveScreenHeight(70),
    alignSelf: 'center',
  },
  notFoundText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
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
  backgroundView: {
    width: responsiveScreenWidth(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: -20,
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
  placeholderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    backgroundColor: 'red',
    width: responsiveScreenWidth(100),
    flexWrap: 'wrap',
  },
  placeholderImage: {
    width: responsiveScreenWidth(47),
    height: responsiveScreenHeight(20),
    borderRadius: 12,
    backgroundColor: '#E1E9EE', // Placeholder background color
    marginRight: 10,
    marginBottom: 10,
  },
  
 
});