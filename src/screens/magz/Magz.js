import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import NewHeader from '../../components/NewHeader';
import client from '../../utils/baseUrl';
import CommonPlaceholder from '../../components/CommonPlaceholder';
import MasonryList from '@react-native-seoul/masonry-list';
import AutoHeightImage from 'react-native-auto-height-image';
import styles from './Styles';
export default function NewMagz(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');
  const [magsList, setMagsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const itemsPerLoad = 10;
  const [isRenderFirtime, setRenderFirstTime] = useState(true);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getMagzData(1, true);
      setActivePage(1);
      setMagsList([]);
      setRenderFirstTime(false);
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    if (!isRenderFirtime) {
      getMagzData(1, true);
      setActivePage(1);
    }
  }, [activeTab]);

  const getMagzData = async (page, isTypeChanged = false) => {
    setLoading(true);
    client
      .get(
        `mags/all/${
          activeTab === 'trending' ? 'trending' : 'top'
        }?page=${page}&itemSize=${itemsPerLoad}`,
      )
      .then(res => {
        setLoading(false);
        if (res?.status === 200) {
          setMagsList(
            isTypeChanged ? res?.data?.data : [...magsList, ...res?.data?.data],
          );
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const onRefresh = () => {
    getMagzData(1, true);
    setActivePage(1);
    setMagsList([]);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const listEmptyComponent = () => {
    if (loading || refreshing) return <CommonPlaceholder />;

    return (
      <View style={styles.notFoundView}>
        <Text style={styles.notFoundText}>No data available</Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.mainView}
        onPress={() => {
          props.navigation.navigate('MagzScrollScreen', {
            singleMagzData: item,
          });
        }}>
        <AutoHeightImage
          width={responsiveScreenWidth(46.5)}
          source={{uri: item?.images[0]}}
          borderRadius={12}>
          <Text variant="bodySmall" style={styles.text1}>
            {item?.title}
          </Text>
        </AutoHeightImage>
      </TouchableOpacity>
    );
  };

  const loadMoreMags = () => {
    getMagzData(activePage + 1);
    setActivePage(activePage + 1);
  };

  return (
    <>
      <GestureHandlerRootView style={styles.main}>
        <SafeAreaView style={styles.mainConatiner}>
          <NewHeader navigation={props.navigation} rightImage={false} />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onScroll={({nativeEvent}) => {
              const {layoutMeasurement, contentOffset, contentSize} =
                nativeEvent;
              const paddingToBottom = 10;
              if (
                layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom
              ) {
                loadMoreMags();
              }
            }}>
            <Text style={styles.headerText}>Magz</Text>

            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => setActiveTab('trending')}
                style={
                  activeTab === 'trending'
                    ? styles.toggleActiveView
                    : styles.toggleView
                }>
                <Text style={styles.toggleText}>Trending </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab('mostRecent')}
                style={
                  activeTab === 'mostRecent'
                    ? styles.toggleActiveView
                    : styles.toggleView
                }>
                <Text style={styles.toggleText}>Most Recent</Text>
              </TouchableOpacity>
            </View>

            <MasonryList
              data={magsList}
              numColumns={2}
              renderItem={renderItem}
              ListEmptyComponent={listEmptyComponent}
              style={{
                marginBottom: responsiveScreenHeight(4),
                
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
}


