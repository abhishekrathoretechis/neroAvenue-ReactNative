import React from 'react';
import { View, Text, Image, TouchableOpacity,Swiper,StyleSheet } from 'react-native';
import CommonTextInput from './CommonTextInput';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth,
  } from 'react-native-responsive-dimensions';
  import { colorConstant,fontConstant,imageConstant } from '../utils/constant';

const CommonTitleInput = ({ onHandleTitle, title, titleError }) => {
  return (
    <View style={styles.titlecontainer}>
      <Text style={{ color: colorConstant.white, fontFamily: fontConstant.semibold, fontSize: 16 }}>
        Title
      </Text>
      <View>
        <CommonTextInput
          onChangeText={(text) => onHandleTitle(text)}
          value={title}
          width={responsiveScreenWidth(80)}
          height={responsiveScreenHeight(6.5)}
          marginTop={responsiveScreenHeight(0.5)}
          borderColor={colorConstant.bordercolor}
          placeholder={'Give a Title for your post'}
        />
        {titleError ? (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>{titleError}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default CommonTitleInput;

const styles = StyleSheet.create({
    titlecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveScreenWidth(2),
        gap: responsiveScreenWidth(4),
        marginTop: responsiveScreenHeight(2),
        zIndex: 10,
      },
      errorView: {
        marginTop: '1%',
        marginLeft: '1%',
        marginBottom: '-2%',
      },
      errorText: {
        color: 'red',
        fontSize: responsiveScreenFontSize(1.7),
        fontFamily: fontConstant.regular,
      },
})
