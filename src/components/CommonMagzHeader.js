import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CommonButton from './CommonButton';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, imageConstant} from '../utils/constant';

const CommonMagzHeader = ({
  index,
  magzList,
  gotoProfilePage,
  sideModal,
  setCheckIdForReport,
  handleFollow,
  getTrueFalseByYandN,
  activeScreenMagazine,
  type,
}) => {
  if (type === 'profileDetailsScreen') {
    return (
      <View style={styles.profiledetails}>
        <View style={styles.profileView}>
          <TouchableOpacity onPress={() => gotoProfilePage(magzList?.user?.id)}>
            {magzList?.user?.userImage ? (
              <Image
                source={{uri: magzList?.user?.userImage}}
                style={styles?.img}
              />
            ) : (
              <Image source={imageConstant?.placeholder} style={styles.img} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.userView}
            onPress={() => gotoProfilePage(magzList?.user?.id)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.username}>
                {magzList?.user?.name ?? magzList?.user?.email}
              </Text>
              <Image
                source={
                  magzList?.user?.userType === 'collectors'
                    ? imageConstant.nerocollector
                    : magzList?.user?.userType === 'alliance'
                    ? imageConstant.neroalliance
                    : magzList?.user?.userType === 'inner circle'
                    ? imageConstant.nerocircle
                    : null
                }
                style={styles.iconImg}
              />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            sideModal(magzList?.postId);
            setCheckIdForReport(magzList?.user?.id);
          }}
          style={styles.dotImgView}>
          <Image source={imageConstant.dot} style={styles.dotImg} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.profiledetails}>
        <View style={styles.profileView}>
          <TouchableOpacity onPress={() => gotoProfilePage(magzList?.user?.id)}>
            {magzList?.user?.userImage ? (
              <Image
                source={{uri: magzList?.user?.userImage}}
                style={styles?.img}
              />
            ) : (
              <Image source={imageConstant?.placeholder} style={styles.img} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.userView}
            onPress={() => gotoProfilePage(magzList?.user?.id)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.username}>
                {magzList?.user?.name ?? magzList?.user?.email}
              </Text>
              <Image
                source={
                  magzList?.user?.userType === 'collectors'
                    ? imageConstant.nerocollector
                    : magzList?.user?.userType === 'alliance'
                    ? imageConstant.neroalliance
                    : magzList?.user?.userType === 'inner circle'
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
          buttonTitle={
            getTrueFalseByYandN(magzList?.follow) ? 'Unfollow' : 'Follow'
          }
          fontSize={responsiveScreenFontSize(1.8)}
          onButtonPress={handleFollow}
        />

        <TouchableOpacity
          onPress={() => {
            sideModal(magzList?.postId);
            setCheckIdForReport(magzList?.user?.id);
          }}
          style={styles.dotImgView}>
          <Image source={imageConstant.dot} style={styles.dotImg} />
        </TouchableOpacity>
      </View>
    );
  }
};

export default CommonMagzHeader;

const styles = StyleSheet.create({
  profiledetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(2.5),
    marginTop: responsiveScreenHeight(2),
  },
  profileView: {flexDirection: 'row', alignItems: 'center', gap: 10},
  img: {width: 40, height: 40, borderRadius: 20},
  username: {color: colorConstant.white, fontSize: 18},
  userView: {width: responsiveScreenWidth(50)},
  dotImgView: {
    justifyContent: 'center',
    width: 15,
    height: 30,
    zIndex: 1,
  },
  dotImg: {height: 20, alignSelf: 'center', width: 20},
  iconImg: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(8),
    height: responsiveScreenHeight(2.5),
  },
});
