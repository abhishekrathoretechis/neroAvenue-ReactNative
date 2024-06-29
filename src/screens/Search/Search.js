import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import LoaderScreen from '../../utils/Loader';
import client from '../../utils/baseUrl';
import {colorConstant, fontConstant} from '../../utils/constant';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CommonPlaceholder from '../../components/CommonPlaceholder';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MasonryList from '@react-native-seoul/masonry-list';
import AutoHeightImage from 'react-native-auto-height-image';

export default function NewSearch(props) {
  const dispatch = useDispatch();
  const search = useSelector(state => state?.auth?.searchDetails);
  const [searchText, setSearchText] = useState('');
  const [refreshingPost, setRefreshingPost] = useState(false);
  const [type, setType] = useState('top');
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDataList, setSearchDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerLoad = 10;

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setType('top');
      setSearchDataList([]);
      getSearchData(1);
      setSearchText('');
      setCurrentPage(1);
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    getSearchData(1, true);
    setCurrentPage(1);
  }, [type, searchText]);

  const getSearchData = async (page, isTypeChanged = false) => {
    setLoading(true);
    client
      .get(
        `post/all/search?type=${type}&page=${page}&itemSize=${itemsPerLoad}${
          searchText?.length > 0 ? `&search=${searchText}` : ''
        }`,
      )
      .then(res => {
        setLoading(false);
        if (res?.status === 200) {
          if(res.data.data !== null){
            setSearchDataList(
              isTypeChanged
                ? res?.data?.data
                : [...searchDataList, ...res?.data?.data],
            );
          }

         
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const loadMoreItem = () => {
    setLoadingMore(true);
    getSearchData(currentPage + 1);
    setCurrentPage(currentPage + 1);
    setLoadingMore(false);
  };

  const onRefreshPostData = () => {
    setRefreshingPost(true);
    getSearchData(1, true);
    setCurrentPage(1);
    setRefreshingPost(false);
  };

  const renderItemPost = ({item, index}) => {
    const imageStyle = {
      width: responsiveScreenWidth(47),
      height: responsiveScreenHeight(23),
    };

    return (
      <View>
        <TouchableOpacity
          style={[styles.mainView]}
          onPress={() =>
            props.navigation.navigate('HomeDetails', {postDetails: item.postId})
          }>
          <AutoHeightImage
            width={responsiveScreenWidth(46.5)}
            source={{uri: item?.images[0]}}
            borderRadius={12}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItemMagz = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.mainView}
          onPress={() =>
            props.navigation.navigate('MagzScrollScreen', {
              singleMagzData: item,
            })
          }>
          <AutoHeightImage
            width={responsiveScreenWidth(46.5)}
            source={{uri: item?.images[0]}}
            borderRadius={12}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const gotoDetailsPage = item => {
    props.navigation.navigate('MagzScrollScreen', {
      singleMagzData: item,
    });
  };

  const renderItemFavourite = ({item, index}) => {
    const imageStyle = {
      width: responsiveScreenWidth(47),
      height: responsiveScreenHeight(23),
    };

    return (
      <View>
        <TouchableOpacity
          style={[styles.mainView]}
          onPress={() => {
            item?.type === 'post'
              ? props.navigation.navigate('HomeDetails', {
                  postDetails: item.postId,
                })
              : gotoDetailsPage(item);
          }}>
          <AutoHeightImage
            width={responsiveScreenWidth(46.5)}
            source={{uri: item?.images[0]}}
            borderRadius={12}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const listEmptyComponent = () => {
    if (loading || refreshingPost)
      return type === 'trend' ? <CommonPlaceholder /> : PlaceholderTrend();
    return (
      <View style={styles.notFoundView}>
        <Text style={styles.notFoundText}>No data available</Text>
      </View>
    );
  };

  

  const PlaceholderTrend = () => (
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
  return (
    <>
      {/* <LoaderScreen data={loading} /> */}
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.searchcontainer}>
          <View style={styles.searchneros}>
            <EvilIcons
              name="search"
              size={20}
              style={{marginLeft: responsiveScreenWidth(2)}}
              color={colorConstant.white}
            />

            <TextInput
              placeholder="Search"
              placeholderTextColor={colorConstant.placeholdercolor}
              style={styles.inputText}
              value={searchText}
              onChangeText={text => setSearchText(text)}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => setType('top')}
            style={
              type === 'top' ? styles.toggleActiveView : styles.toggleView
            }>
            <Text style={styles.toggleText}>Top</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType('trend')}
            style={
              type === 'trend' ? styles.toggleActiveView : styles.toggleView
            }>
            <Text style={styles.toggleText}>Trending Magz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType('my')}
            style={type === 'my' ? styles.toggleActiveView : styles.toggleView}>
            <Text style={styles.toggleText}>My Favourite</Text>
          </TouchableOpacity>
        </View>

        <GestureHandlerRootView style={{flex: 1}}>
          <MasonryList
            style={{marginBottom:responsiveScreenHeight(3)}}
            data={searchDataList}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={listEmptyComponent}
            renderItem={
              type === 'top'
                ? renderItemPost
                : type === 'trend'
                ? renderItemMagz
                : renderItemFavourite
            }
            ListFooterComponent={() =>
              loadingMore ? (
                <ActivityIndicator
                  size="large"
                  color={colorConstant.white}
                  style={{marginVertical: 10}}
                />
              ) : null
            }
            onScroll={({nativeEvent}) => {
              const {layoutMeasurement, contentOffset, contentSize} =
                nativeEvent;
              const paddingToBottom = 10;
              if (
                layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom
              ) {
                loadMoreItem();
              }
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshingPost}
                onRefresh={onRefreshPostData}
              />
            }
          />
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  searchcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputText: {
    fontSize: responsiveScreenFontSize(2),
    fontFamily: fontConstant.medium,
    color: colorConstant.white,
    width: responsiveScreenWidth(80),
  },
  text: {
    color: colorConstant.white,
    marginHorizontal: 10,
    marginVertical: 10,
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
    bottom: 10,
    position: 'absolute',
    width: '80%',
  },
  searchneros: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(95),
    borderRadius: 5,
    marginTop: responsiveScreenHeight(3),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.black,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
  },
  toggleText: {
    color: colorConstant.black,
    alignSelf: 'center',
    marginLeft: 15,
    marginRight: 15,
    padding: 3,
    fontFamily: fontConstant.regular,
    fontSize: 12,
  },
  toggleView: {
    backgroundColor: colorConstant.lightGrey,
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 10,
  },
  toggleActiveView: {
    backgroundColor: colorConstant.white,
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 10,
  },
  rowContainerImg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },
  leftImg: {
    width: responsiveScreenWidth(45),
    height: responsiveScreenHeight(25),
    resizeMode: 'contain',
  },
  rightImg: {
    width: responsiveScreenWidth(45),
    height: responsiveScreenHeight(25),
    resizeMode: 'contain',
  },
  longImg: {
    width: responsiveScreenWidth(50),
    height: responsiveScreenHeight(47),
  },
  image: {
    resizeMode: 'cover',
    height: responsiveScreenHeight(23),
    width: responsiveScreenWidth(47),
    alignSelf: 'center',
  },
  image1: {
    height: responsiveScreenHeight(29),
    width: responsiveScreenWidth(47),
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  mainView: {
    width: responsiveScreenWidth(47.5),
    marginTop: responsiveScreenHeight(1.5),
    justifyContent: 'center',
    // borderWidth: 0.8,
    // borderColor: colorConstant.lightWhite,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  notFoundView: {
    justifyContent: 'center',
    height: responsiveScreenHeight(45),
    alignSelf: 'center',
  },
  notFoundText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
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
    height: responsiveScreenHeight(23),
    borderRadius: 12,
    backgroundColor: '#E1E9EE', // Placeholder background color
    marginRight: 10,
    marginBottom: 10,
  },
  //   placeholderText: {
  //     flex: 1,
  //     height: responsiveScreenHeight(30),
  //     borderRadius: 12,
  //     backgroundColor: '#E1E9EE', // Placeholder background color
  //   },
});
