import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  notificationService,
  requestUserPermission,
} from '../../components/PushNotification';
import client from '../../utils/baseUrl';
import {colorConstant, imageConstant} from '../../utils/constant';
import CommonPlaceholder from '../../components/CommonPlaceholder';
import AutoHeightImage from 'react-native-auto-height-image';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import MasonryList from '@react-native-seoul/masonry-list';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './Styles';
const NewHome = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const [posts, setPosts] = useState([]);
  const [magz, setMagz] = useState('');
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePagePage] = useState(1);
  const itemsPerLoad = 10;
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 65);

  const translateY = diffClamp.interpolate({
    inputRange: [0, 65], //header hight
    outputRange: [0, -65],
  });
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPostData(1);
      setActivePagePage(1);
      setPosts([]);
      onRefresh();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    requestUserPermission();
    notificationService();
  }, []);

  const getPostData = async page => {
    setLoading(true);
    client
      .get(`post/all/home?page=${page}&itemSize=${itemsPerLoad}`)
      .then(res => {
        setLoading(false);
        if (res?.status === 200) {
          setPosts([...posts, ...res?.data?.data]);
          setMagz(res?.data?.magz);
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const onEndReached = () => {
    getPostData(activePage + 1);
    setActivePagePage(activePage + 1);
  };

  const ListEmptyComponentForAllPost = () => {
    if (loading || refreshing) return <CommonPlaceholder />;
    return (
      <View style={styles.notFoundView}>
        <Text style={styles.notFoundText}>No data available</Text>
      </View>
    );
  };

  const onRefresh = () => {
    setPosts([]);
    getPostData(1);
    setActivePagePage(1);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
 
  return (
    <View style={styles.maincontainer}>
      <Animated.View
        style={{
          transform: [{translateY: translateY}],
          elevation: 4,
          zIndex: 100,
        }}>
        <View style={styles.logocontainer}>
          <Image source={imageConstant.nerologo} style={styles.logo} />
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatList')}>
            <Image source={imageConstant.msg} style={styles.msgButtom} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <ScrollView
        style={styles.maincontainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={e => {
          const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;
          const paddingToBottom = 10;

          scrollY.setValue(contentOffset.y);

          if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
          ) {
            onEndReached();
          }
        }}>
        <View style={styles.cardcontainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewGallery')}>
            <ImageBackground
              source={imageConstant.card1}
              style={styles.imagebackground}>
              <Text style={styles.mainText}>Gallery</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewMagz')}>
            <ImageBackground
              source={imageConstant.card2}
              style={styles.imagebackground}>
              <Text style={styles.mainText}>Magz</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.cardcontainer.mainimagecontainer}>
          <View style={styles.textView}>
            <Text style={styles.letestTopic}>
              Latest Topic
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('NewMagz', {
                  recentMagz: true,
                })
              }>
              <Text style={styles.showAll}>
                Show all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <SkeletonPlaceholder
            backgroundColor={colorConstant.backgroundBlack}
            highlightColor={colorConstant.bordercolor}
            speed={800}>
            <View style={styles.placeholderContainerNew}>
              <View style={styles.placeholderImageMain} />
            </View>
          </SkeletonPlaceholder>
        ) : (
          <>
            {magz ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MagzScrollScreen', {
                    singleMagzData: magz,
                  });
                }}
                style={styles.magzView}>
                <Image
                  source={{uri: magz.images[0]}}
                  style={styles.magzImage}
                />
              </TouchableOpacity>
            ) : null}
          </>
        )}

        <View style={styles.allText}>
          <Text style={{color: colorConstant?.white, fontSize: 16}}>All</Text>
        </View>

        <GestureHandlerRootView style={{flex: 1}}>
          <MasonryList
            data={posts}
            style={styles.listStyle}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={ListEmptyComponentForAllPost}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('HomeDetails', {
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
      </ScrollView>
    </View>
  );
};
export default NewHome;

