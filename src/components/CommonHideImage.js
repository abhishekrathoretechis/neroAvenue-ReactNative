import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colorConstant} from '../utils/constant';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';

const CommonHideImage = ({source, value}) => {
  if (value == false) {
    return (
      <ImageBackground
        source={{uri: source}}
        imageStyle={{
          alignSelf: 'center',
          borderRadius: 18,

          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.3,
        }}
        style={{
          alignSelf: 'center',
          borderRadius: 18,
          width: responsiveScreenWidth(95),
          height: responsiveScreenHeight(55),
        }}>
        {/* Eye icon */}
        <Feather name="eye-off" size={70} color={colorConstant.white} />
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        source={{uri: source}}
        style={{
          alignSelf: 'center',
          width: responsiveScreenWidth(95),
          height: responsiveScreenHeight(55),
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        imageStyle={{borderRadius: 8, opacity: 0.3}}>
        {/* Eye icon */}
        <Feather name="eye-off" size={70} color={colorConstant.white} />
      </ImageBackground>
    );
  }
};

export default CommonHideImage;

const styles = StyleSheet.create({});
