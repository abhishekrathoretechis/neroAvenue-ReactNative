import React from 'react';
import { View, TouchableOpacity, Image, Text,StyleSheet } from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { colorConstant, fontConstant, imageConstant } from '../utils/constant';

const CommonProfileDetailsHeader = ({ item, gotoProfilePage, sideModal, setStatus }) => {
  return (
    <View style={styles.profiledetails}>
      <View style={styles.profiledetailsView}>
        <TouchableOpacity
          style={styles.profileimage}
          onPress={() => gotoProfilePage(item?.user?.id)}
        >
          {item?.user?.userImage ? (
            <Image
              source={{ uri: item?.user?.userImage }}
              style={{
                resizeMode: 'cover',
                height: 40,
                width: 40,
                borderRadius: 50,
              }}
            />
          ) : (
            <Image
              source={imageConstant.placeholder}
              style={{
                resizeMode: 'contain',
                height: responsiveScreenHeight(5),
                width: responsiveScreenWidth(10),
                borderRadius: responsiveScreenWidth(5),
              }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => gotoProfilePage(item?.user?.id)}
          style={{ width: responsiveScreenWidth(70) }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              numberOfLines={1}
              style={{
                color: colorConstant.white,
                fontFamily: fontConstant.bold,
                fontSize: responsiveScreenFontSize(2.3),
              }}
            >
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
              style={{
                resizeMode: 'contain',
                width: responsiveScreenWidth(8),
                height: responsiveScreenHeight(2.3),
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          sideModal(item?.postId);
          setStatus(item?.status);
        }}
        style={{
          justifyContent: 'center',
          width: 15,
          height: 30,
          zIndex: 1,
        }}
      >
        <Image
          source={imageConstant.dot}
          style={{ height: 20, alignSelf: 'center', width: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CommonProfileDetailsHeader;
const styles = StyleSheet.create({
    profiledetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: responsiveScreenWidth(2.5),
      },
      profiledetailsView: {flexDirection: 'row', alignItems: 'center', gap: 10,},
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
})
