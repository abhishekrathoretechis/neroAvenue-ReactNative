import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colorConstant, fontConstant, imageConstant} from '../utils/constant';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import AutoHeightImage from 'react-native-auto-height-image';

const CommonProfileSingleImage = ({
  handleLike,
  handleComment,
  handleSave,
  item,
  getTrueFalseByYandN
}) => {
  return (
    <AutoHeightImage
      source={{uri: item?.images[0]}}
      // maxHeight={responsiveScreenHeight(68)}
      resizeMode='cover'
      
      width={responsiveScreenWidth(95)}
      borderRadius={18}
      // borderWidth={0.8}
      // borderColor={colorConstant.lightWhite}
      >
      <View style={styles.rowView}>
        <View style={styles.underRowView}>
          <TouchableOpacity onPress={handleLike}>
            <Image
              source={
                getTrueFalseByYandN(item?.userLike)
                  ? imageConstant.liked
                  : imageConstant.like
              }
              style={styles.bottomImg}
            />
          </TouchableOpacity>
          <Text style={styles.boldText}>{item?.totalLikes}</Text>

          <TouchableOpacity onPress={handleComment}>
            <Image source={imageConstant.comment} style={styles.bottomImg} />
          </TouchableOpacity>
          <Text style={styles.boldText}>{item?.totalComments}</Text>
        </View>

        <TouchableOpacity onPress={handleSave}>
          <Image
            source={
              getTrueFalseByYandN(item?.savePost)
                ? imageConstant.save
                : imageConstant.unsave
            }
            style={[styles.bottomImg, {marginRight: 10}]}
          />
        </TouchableOpacity>
      </View>
    </AutoHeightImage>
  );
};

export default CommonProfileSingleImage;

const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'center',
    borderRadius: 18,
    borderWidth: 0.8,
    borderColor: colorConstant.lightWhite,
  },
  mainImgStyle: {
    alignSelf: 'center',
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(70),
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: responsiveScreenWidth(95),
    position: 'absolute',
    bottom: -.1,
    paddingVertical: responsiveScreenHeight(2),
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // opacity: 0.8,
  },
  underRowView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'auto',
    alignItems: 'center',
    width: responsiveScreenWidth(32),
  },
  bottomImg: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: responsiveScreenWidth(7),
    height: responsiveScreenHeight(3),
  },
  boldText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2.2),
  },
});
