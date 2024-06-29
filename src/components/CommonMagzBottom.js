import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colorConstant, fontConstant} from '../utils/constant';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CommonMagzBottom = ({magzList, index,onCreditHandle}) => {
  return (
    <>
      <View style={styles.headerTextView}>
        <Text style={styles.headerText}>
          {magzList?.title ? magzList?.title : magzList?.caption}
        </Text>
      </View>
      <View style={styles.subTextView}>
        <Text style={styles.subText}>{magzList?.description}</Text>
      </View>
      <View style={styles.tagsView}>
        {magzList?.credit?.map((credit, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tagsContainer}
            onPress={() => {
              onCreditHandle(credit?.userId);
             
            }}>
            <Text style={styles.nameText}>@{credit?.username}</Text>
          </TouchableOpacity>
        ))}
      </View>

     

      <View style={styles.tagsView}>
        {magzList?.tags?.map((tag, index) => (
          <View key={index} style={styles.tagsContainer}>
            <Text style={styles.nameText}>{tag}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.swipText}>Swipe left to read more</Text>
      <Text style={styles.dateText}>
        {' '}
        {moment(magzList?.createdAt).startOf('hour').fromNow()}
      </Text>
    </>
  );
};

export default CommonMagzBottom;

const styles = StyleSheet.create({
  headerTextView: {
    marginBottom: responsiveScreenHeight(1.5),
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: responsiveScreenWidth(95),
    marginTop: responsiveScreenWidth(3),
    marginLeft: responsiveScreenWidth(3),
  },
  subTextView: {
    marginBottom: responsiveScreenHeight(1.5),
    marginHorizontal: responsiveScreenWidth(3),
    justifyContent: 'center',
  },
  headerText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: 17,
  },
  subText: {
    color: colorConstant.white,
    fontFamily: fontConstant.light,
    fontSize: 14,
  },
  tagsView: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(2),
    alignItems: 'center',
    width: responsiveScreenWidth(95),
    flexWrap: 'wrap',
    marginHorizontal: responsiveScreenWidth(3),
    marginVertical:responsiveScreenHeight(.5)
  },
  swipText: {
    color: colorConstant.lightGrey,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2),
    marginLeft: responsiveScreenWidth(3),
    marginBottom: responsiveScreenHeight(1),
    marginTop: responsiveScreenHeight(1),
  },
  tagsContainer: {
    backgroundColor: '#2C2C2C',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
  },
  nameText: {
    fontFamily: fontConstant.regular,
    color: colorConstant.white,
    fontSize: responsiveScreenFontSize(2),
  },
  dateText: {
    color: colorConstant.lightWhite,
    marginTop: responsiveScreenWidth(2),
    marginLeft: responsiveScreenWidth(2),
    marginBottom: responsiveScreenWidth(2),
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: fontConstant.regular,
  },
});
