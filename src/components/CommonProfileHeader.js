import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, fontConstant, imageConstant} from '../utils/constant';
import CommonButton from './CommonButton';

const CommonProfileHeader = ({
  item,
  gotoProfilePage,
  sideModal,
  setCheckIdForReport,
  getTrueFalseByYandN,
  handleFollow,
}) => {
  return (
    <View style={styles.profiledetails}>
      <View style={styles.profiledetailsView}>
        <TouchableOpacity onPress={() => gotoProfilePage(item?.user?.id)}>
          {item?.user?.userImage ? (
            <Image
              source={{uri: item?.user?.userImage}}
              style={styles.userImg}
            />
          ) : (
            <Image
              source={imageConstant.placeholder}
              style={styles.placeholderImg}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => gotoProfilePage(item?.user?.id)}
          style={{width: responsiveScreenWidth(50)}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text numberOfLines={1} style={styles.boldText}>
              {item?.user?.name ?? item?.user?.email}
            </Text>
            <Image
              source={
                item?.user?.userType === 'collectors'
                  ? imageConstant.nerocollector
                  : item?.user?.userType === 'alliance'
                  ? imageConstant.neroalliance
                  : item?.user?.userType === 'inner circle'
                  ? imageConstant.nerocircle
                  : null
              }
              style={styles.iconImg}
            />
          </View>
        </TouchableOpacity>
      </View>

      <CommonButton
        height={responsiveScreenHeight(4)}
        width={responsiveScreenWidth(20)}
        marginTop={1}
        buttonTitle={getTrueFalseByYandN(item?.follow) ? 'Unfollow' : 'Follow'}
        fontSize={responsiveScreenFontSize(1.8)}
        onButtonPress={handleFollow}
      />
      <TouchableOpacity
        onPress={() => {
          sideModal(item?.postId || item?.id);
          setCheckIdForReport(item?.user?.id);
        }}
        style={styles.sideModalView}>
        <Image source={imageConstant.dot} style={styles.dotImg} />
      </TouchableOpacity>
    </View>
  );
};

export default CommonProfileHeader;

const styles = StyleSheet.create({
  profiledetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(2.5),
  },
  profiledetailsView: {flexDirection: 'row', alignItems: 'center', gap: 10},
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
});
