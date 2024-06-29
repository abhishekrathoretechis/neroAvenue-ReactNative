import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, fontConstant} from '../utils/constant';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CommonProfileBottom = ({item, onCreditHandle}) => {
  return (
    <View style={styles.commentTextView}>
      <Text variant="bodySmall" style={styles.boldText}>
        {item?.title}
      </Text>
      {item?.description ? (
        <Text variant="bodySmall" style={styles.descriptionText}>
          {item?.description}
        </Text>
      ) : null}

      <View style={styles.tagsView}>
        {item?.credit?.map((credit, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tagsContainer}
            onPress={() => onCreditHandle(credit?.userId)}>
            <Text style={styles.nameText}>@{credit?.username}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tagsView}>
        {item?.tags?.map((tag, index) => (
          <View key={index} style={styles.tagsContainer}>
            <Text style={styles.nameText}>{tag}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.dateText}>
        {' '}
        {moment(item?.createdAt).startOf('hour').fromNow()}
      </Text>
    </View>
  );
};

export default CommonProfileBottom;

const styles = StyleSheet.create({
  commentTextView: {
    marginLeft: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(2),
  },
  boldText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2.2),
  },
  descriptionText: {
    fontFamily: fontConstant.medium,
    color: colorConstant.gray,
    fontSize: responsiveScreenFontSize(2.2),
  },
  tagsView: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(2),
    alignItems: 'center',
    width: responsiveScreenWidth(95),
    flexWrap: 'wrap',
  },
  tagsContainer: {
    backgroundColor: '#2C2C2C',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: responsiveScreenHeight(1),
  },
  nameText: {
    fontFamily: fontConstant.regular,
    color: colorConstant.white,
    fontSize: responsiveScreenFontSize(2),
  },
  dateText: {
    color: colorConstant.lightWhite,
    marginTop: responsiveScreenWidth(2),
    marginBottom: responsiveScreenWidth(2),
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: fontConstant.regular,
  },
});
