import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colorConstant, fontConstant, imageConstant } from '../utils/constant';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const CommonProfileImage = ({ imageUrl, handleLike, handleComment, handleSave, item, getTrueFalseByYandN }) => {
  return (
    <ImageBackground
    source={{ uri: imageUrl }}
    imageStyle={styles.imageStyle}
    // resizeMode='stretch'
    style={styles.mainImgStyle}
    
  >
    <View style={styles.rowView}>
      <View style={styles.underRowView}>
        <TouchableOpacity
          onPress={handleLike}
        >
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

        <TouchableOpacity
          onPress={handleComment}
        >
          <Image
            source={imageConstant.comment}
            style={styles.bottomImg}
          />
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
          style={[styles.bottomImg, { marginRight: 10 }]}
        />
      </TouchableOpacity>
    </View>
  </ImageBackground>
);
};



export default CommonProfileImage

const styles = StyleSheet.create({
    imageStyle: {
        alignSelf: 'center',
        borderRadius: 18,
        // borderWidth:0.8,
        // borderColor:colorConstant.lightWhite,
        // resizeMode:'stretch'
        
      },
      mainImgStyle: {
        alignSelf: 'center',
        width: responsiveScreenWidth(95),
        height: responsiveScreenHeight(55),
        
        
        
      },
      rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        width: responsiveScreenWidth(94),
        position: 'absolute',
        bottom: 1,
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
})