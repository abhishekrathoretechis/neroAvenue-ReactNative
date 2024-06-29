import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import NewHeader from '../../components/NewHeader';
import {categoryList} from '../../utils/arrayList';
import client from '../../utils/baseUrl';
import CommonPlaceholder from '../../components/CommonPlaceholder';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MasonryList from '@react-native-seoul/masonry-list';
import AutoHeightImage from 'react-native-auto-height-image';
import styles from './Styles';
export default function NewGallery(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const itemsPerLoad = 10;
  const [galleryPosts, setGalleryPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getGallaryData(1, null, true);
      setGalleryPosts([]);
      setCurrentPage(1);
    });
    return unsubscribe;
  }, [props.navigation]);

  const onEndReached = () => {
    if (!loading) {
      getGallaryData(currentPage + 1, selectedCategory);
      setCurrentPage(currentPage + 1);
    }
  };

  const onRefresh = () => {
    getGallaryData(1, selectedCategory, true);
    setCurrentPage(1);
    setGalleryPosts([]);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getGallaryData = async (page, category = null, isInitial = false) => {
    setLoading(true);
    client
      .get(
        `post/all/galary?category=${
          category ?? ''
        }&page=${page}&itemSize=${itemsPerLoad}`,
      )
      .then(res => {
        setLoading(false);
        if (res?.status === 200) {
          setGalleryPosts(
            isInitial ? res?.data?.data : [...galleryPosts, ...res?.data?.data],
          );
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const handleSelectCategory = category => {
    setSelectedCategory(category);
    setGalleryPosts([]);
    setCurrentPage(1);
    getGallaryData(1, category, true);
  };

  const renderItemUpperData = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.renderUpperTouch}
          onPress={() => handleSelectCategory(item?.value)}>
          <Image source={item?.image} style={{...styles.upperImg,tintColor:selectedCategory == item?.value ? 'white' : 'gray'}} />
        </TouchableOpacity>
        <Text style={{...styles.upperTitleText,color : selectedCategory == item?.value ? 'white' : 'gray' }}>{item.name}</Text>
      </View>
    );
  };

  
  const ListEmptyComponentForAllPost = () => {
    if (loading || refreshing)
      return <CommonPlaceholder height={responsiveScreenHeight(30)} />;
    return (
      <View style={styles.notFoundView}>
        <Text style={styles.notFoundText}>No data available</Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <NewHeader navigation={props.navigation} rightImage={false} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
          <Text style={styles.headerText}>Gallery</Text>
          <View>
            <FlatList
              data={categoryList}
              renderItem={renderItemUpperData}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'stretch',
            }}>
            <GestureHandlerRootView style={{flex: 1}}>
              <MasonryList
                data={galleryPosts}
                ListEmptyComponent={ListEmptyComponentForAllPost}
                style={{marginBottom: responsiveScreenHeight(3)}}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('HomeDetails', {
                        postDetails: item.postId,
                      })
                    }
                    style={styles.touchMapView}>
                    <AutoHeightImage
                      width={responsiveScreenWidth(46.5)}
                      source={{uri: item?.images[0]}}
                      borderRadius={12}
                    />
                  </TouchableOpacity>
                )}
              />
            </GestureHandlerRootView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   renderUpperTouch:{
//     justifyContent: 'center',
//     elevation: 4, // Android elevation for shadow
//     // shadowColor: 'grey', // Shadow color
//     shadowOpacity: 0.9, // Shadow opacity
//     shadowRadius: 4, // Shadow radius
//     borderRadius: 12,
//     alignItems: 'center',
//     alignSelf: 'center',
//     height: responsiveScreenHeight(11.5),
//     width: responsiveScreenWidth(33),
//     gap: 10,
//     marginHorizontal: responsiveScreenWidth(2),
    
//   },
//   headerText: {
//     color: colorConstant.white,
//     fontFamily: fontConstant.bold,
//     fontSize: responsiveScreenFontSize(3.2),
//     marginHorizontal: 15,
//     marginBottom: 15,
//   },
//   upperImg: {
//     resizeMode: 'cover',
//     height: responsiveScreenHeight(10),
//     width: responsiveScreenWidth(30),
//     alignSelf: 'center',
//     borderRadius: 12,
//     // backgroundColor:'red',
//   },
//   upperTitleText: {
//     color: colorConstant.grey1,
//     alignSelf: 'center',
//     marginTop: 1,
//     fontFamily: fontConstant.regular,
//     fontSize: responsiveScreenFontSize(1.8),
//   },
//   firstIndexImg: {
//     width: responsiveScreenWidth(100),
//     height: responsiveScreenHeight(30),
//     marginTop: 20,
//   },
//   otherImg: {
//     width: responsiveScreenWidth(45),
//     height: responsiveScreenHeight(23),
//     alignSelf: 'center',
//   },
//   longImg: {
//     width: responsiveScreenWidth(50),
//     height: responsiveScreenHeight(46),
//   },
//   rowContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignSelf: 'center',
//   },
//   postImg: {
//     height: responsiveScreenHeight(29.2),
//     width: responsiveScreenWidth(47),
//     // marginTop: responsiveScreenWidth(1),
//     alignSelf: 'center',
//     borderRadius: 12,
//     // resizeMode:'stretch'
//   },
//   mainView: {
//     width: responsiveScreenWidth(47.5),
//     marginTop: responsiveScreenHeight(1.5),
//     borderWidth: 0.8,
//     borderColor: colorConstant.lightWhite,
//     justifyContent: 'center',
//     borderRadius: 12,
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginHorizontal: responsiveScreenHeight(0.5),
//   },
//   notFoundView: {
//     justifyContent: 'center',
//     height: responsiveScreenHeight(45),
//     alignSelf: 'center',
//   },
//   notFoundText: {
//     color: colorConstant.white,
//     alignSelf: 'center',
//     fontFamily: fontConstant.medium,
//     fontSize: responsiveScreenFontSize(2),
//   },
//   placeholderContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//     justifyContent: 'center',
//   },
//   placeholderImage: {
//     width: responsiveScreenWidth(47),
//     height: responsiveScreenHeight(30),
//     borderRadius: 12,
//     backgroundColor: '#E1E9EE', // Placeholder background color
//     marginRight: 10,
//   },
//   placeholderText: {
//     flex: 1,
//     height: responsiveScreenHeight(30),
//     borderRadius: 12,
//     backgroundColor: '#E1E9EE', // Placeholder background color
//   },
//   touchMapView: {
//     width: responsiveScreenWidth(47.6),
//     marginTop: responsiveScreenHeight(1.5),
//     // borderWidth: 0.8,
//     // borderColor: colorConstant.lightWhite,
//     // justifyContent: 'center',

//     borderRadius: 12,
//     alignItems: 'center',
//     // backgroundColor: 'red',
//     alignSelf: 'center',
//     marginHorizontal: responsiveScreenHeight(0.4),
//   },
// });
