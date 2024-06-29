import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, fontConstant, imageConstant} from '../utils/constant';

const CommonMagzImage = ({
  index,
  magzList,
  activeScreenMagazine,

  handleComment,

  handleLike,
  handleSave,
  getTrueFalseByYandN,
}) => {
  return (
    <View style={styles.mainImg}>
      <ImageBackground
        source={{uri: magzList?.images[0]}}
        style={styles.img}
        // resizeMode='stretch'
        imageStyle={styles.imageStyle}>
        <View style={styles.rowView}>
          <View style={styles.underRowView}>
            <TouchableOpacity onPress={handleLike}>
              <Image
                source={
                  getTrueFalseByYandN(magzList?.userLike)
                    ? imageConstant.liked
                    : imageConstant.like
                }
                style={styles.bottomImg}
              />
            </TouchableOpacity>
            <Text style={styles.boldText}>{magzList?.totalLikes}</Text>
            <TouchableOpacity onPress={handleComment}>
              <Image source={imageConstant.comment} style={styles.bottomImg} />
            </TouchableOpacity>
            <Text style={styles.boldText}>
              {magzList?.totalComments}
            </Text>
          </View>

          <TouchableOpacity onPress={handleSave}>
            <Image
              source={
                getTrueFalseByYandN(magzList?.savePost)
                  ? imageConstant.save
                  : imageConstant.unsave
              }
              style={[styles.bottomImg, {marginRight: 10}]}
            />
          </TouchableOpacity>
        </View>
        {/* <Image source={imageConstant.transparentlogo} style={styles.waterimg} /> */}
      </ImageBackground>
    </View>
  );
};

export default CommonMagzImage;

const styles = StyleSheet.create({
  mainImg: {
    marginTop: responsiveScreenHeight(2),
  },
  img: {
    resizeMode: 'cover',
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(44),
    alignSelf: 'center',
  },
  imageStyle: {
    borderRadius: 12,
    // borderWidth: 0.8,
    // borderColor: colorConstant.lightWhite,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: responsiveScreenWidth(95),
    position: 'absolute',
    bottom: 0,
    paddingVertical: responsiveScreenHeight(2),
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
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
    fontSize: responsiveScreenFontSize(2),
  },
  waterimg: {
    bottom: 0,
    position: 'absolute',
    width: responsiveScreenWidth(20),
    height: responsiveScreenHeight(7),
    right: 10,
  },
});