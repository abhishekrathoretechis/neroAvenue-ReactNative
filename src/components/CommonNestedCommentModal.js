import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import moment from 'moment';
import {colorConstant, fontConstant, imageConstant} from '../utils/constant';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const CommonNestedCommentModal = ({
  item,
}) => {
  return (
    <View style={styles.commentItem}>
      <View style={styles.profilepic}>
        <Image
          source={{uri: item?.user?.userImage}}
          style={styles.commenterProfileImage}
        />
      </View>
      <View style={styles.commentTextContainer}>
        <Text variant="bodySmall" style={styles.commenterName}>
          {item?.user?.name}
        </Text>
        <Text variant="bodySmall" style={styles.commentText}>
          {item?.comment}
        </Text>
        <Text style={{color: colorConstant.gray}}>
          {moment(item?.createdAt).fromNow()}
        </Text>
      </View>
     
    </View>
  );
};

export default CommonNestedCommentModal;
const styles = StyleSheet.create({
  commentItem: {
    flexDirection: 'row',
    marginTop: responsiveScreenHeight(4),
    gap: responsiveScreenWidth(3),
    // height: responsiveScreenHeight(8),
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: responsiveScreenWidth(89),
  },
  profilepic: {
    // backgroundColor: 'green',
    width: 25,
    height: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commenterName: {
    fontSize: 16,
    fontFamily: fontConstant.bold,
    color: colorConstant.white,
    marginBottom: responsiveScreenHeight(0.5),
  },
  commentText: {
    fontFamily: fontConstant.medium,
    color: colorConstant.white,
    marginBottom: responsiveScreenHeight(0.5),
  },
  commentTextContainer: {
    width: responsiveScreenWidth(73),
    paddingBottom: responsiveScreenHeight(2),
  },
  commenterProfileImage: {
    resizeMode: 'contain',
    width: 26,
    height: 26,
    borderRadius: 12.5,
  },
  replyInputContainer: {
    marginTop: responsiveScreenHeight(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colorConstant.gray,
    borderRadius: 5,
    padding: responsiveScreenWidth(2),
    marginRight: responsiveScreenWidth(2),
    color: 'white',
  },
  replyButton: {
    color: colorConstant.primary,
    fontFamily: fontConstant.medium,
  },
});
