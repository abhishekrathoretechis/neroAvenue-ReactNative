import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {getNotification} from '../../redux/reducers/authSlice';
import NewHeader from '../../components/NewHeader';
import {allMagzData, getAllPost} from '../../redux/reducers/authSlice';
import CommonButton from '../../components/CommonButton';
import moment from 'moment';

const Notification = props => {
  const dispatch = useDispatch();
  const notificationData = useSelector(state => state?.auth?.notification);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      dispatch(getNotification());
      neroMag();
      getAllPostData();
    });
    return unsubscribe;
  }, [props.navigation]);

  const neroMag = () => {
    dispatch(allMagzData());
  };
  const getAllPostData = () => {
    dispatch(getAllPost());
  };
  const filteredNotifications = notificationData?.filter(
    notification => notification?.type !== 'unlike',
  );

  const onRefresh = () => {
    dispatch(getNotification());
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderItem = ({item, index}) => {
    // const slicedArray = item?.createdAt.slice(0, 3);
    const formattedDate =
      moment(item?.createdAt.slice(0, 3)).fromNow(true) + ' ago';

    // const currentTime = new Date(); // Parse newDateStr as a Date object
    // const notificationDate = new Date(formattedDate);

    // const timeDifferenceInSeconds = Math.floor(
    //   (currentTime - notificationDate) / 1000,
    // );
    // const minute = Math.floor(timeDifferenceInSeconds / 60);
    // const hours = Math.floor(timeDifferenceInSeconds / 3600);
    // const days = Math.floor(hours / 24);
    // const weeks = Math.floor(days / 7);
    // let timeDifference;
    // if (weeks > 0) {
    //   timeDifference = `${weeks}w`;
    // } else if (days > 0) {
    //   timeDifference = `${days}d`;
    // } else if (hours < 1) {
    //   timeDifference = `${minute}m`;
    // } else {
    //   timeDifference = `${hours}h`;
    // }

    return (
      <View>
        <TouchableOpacity style={styles.rowContainer} activeOpacity={0.8}>
          {item.userImage ? (
            <Image source={{uri: item.userImage}} style={styles.profileImg} />
          ) : (
            <Image
              source={imageConstant.placeholder}
              style={styles.profileImg}
            />
          )}
          {item.type == 'approval' ? (
            <Text
              style={
                item.type === 'approval' || item.type === 'follow'
                  ? [styles.messageText, {width: '60%'}]
                  : styles.messageText
              }>
              Great! {item.userName}, Your work is live
              <Text style={styles.timeText}> {formattedDate}</Text>
            </Text>
          ) : item?.type === 'comment' ? (
            <Text
              style={
                item.type === 'approval' || item.type === 'follow'
                  ? [styles.messageText, {width: '60%'}]
                  : styles.messageText
              }>
              {item.userName + ' commented on your post.'}
              <Text style={styles.timeText}> {formattedDate}</Text>
            </Text>
          ) : (
            <Text
              style={
                item.type === 'approval' || item.type === 'follow'
                  ? [styles.messageText, {width: '60%'}]
                  : styles.messageText
              }>
              {item.userName + ' now has an addiction towards your posts.'}
              <Text style={styles.timeText}> {formattedDate}</Text>
            </Text>
          )}

          {item.type === 'follow' ? (
            <CommonButton
              height={responsiveScreenHeight(3)}
              width={responsiveScreenWidth(20)}
              marginTop={responsiveScreenHeight(0.5)}
              buttonTitle={'Follow'}
              fontSize={responsiveScreenFontSize(1.8)}
            />
          ) : item.type === 'approval' ? (
            <CommonButton
              height={responsiveScreenHeight(3)}
              width={responsiveScreenWidth(20)}
              marginTop={responsiveScreenHeight(0.5)}
              buttonTitle={'View'}
              fontSize={responsiveScreenFontSize(1.8)}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };
  const listEmptyComponent = () => {
    return (
      <View style={styles.notFoundView}>
        <Text style={styles.notFoundText}>No Notification yet</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <NewHeader
        title={'Notification'}
        navigation={props.navigation}
        rightImage={false}
      />

      <Text style={styles.title}>New</Text>

      <FlatList
        data={filteredNotifications}
        renderItem={renderItem}
        style={{marginBottom: 20}}
        ListEmptyComponent={listEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstant.black,
  },

  title: {
    color: colorConstant.thinWhite,
    fontFamily: fontConstant.thin,
    fontSize: 15,
    padding: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: responsiveScreenWidth(95),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenWidth(3),
    // backgroundColor:'red'
  },
  profileImg: {
    resizeMode: 'cover',
    height: 45,
    width: 45,
    borderRadius: 22.5,
  },
  messageText: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2),
    width: '81%',
    marginHorizontal: responsiveScreenWidth(2),
  },
  rightImg: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  timeText: {
    color: colorConstant.gray,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: responsiveScreenWidth(100),
  },
  headerText: {
    color: colorConstant.white,
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2.3),
    marginRight: 35,
  },
  arrowImg: {
    resizeMode: 'contain',
    height: 70,
    width: 80,
    marginLeft: -10,
    marginBottom: -10,
  },
  dotImg: {
    resizeMode: 'contain',
    height: 15,
    width: 15,
    marginRight: 10,
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
  viewText: {
    color: '#0051FD',
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2),
    borderBottomColor: '#0051FD',
    borderBottomWidth: 1,
    marginRight: responsiveScreenWidth(0.5),
  },
});
