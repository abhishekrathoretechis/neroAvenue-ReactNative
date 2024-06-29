import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {colorConstant, fontConstant} from '../utils/constant';
import {width} from '../dimension/dimension';
import {
  responsiveFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

export default function CommonButton(props) {
  return (
    <View style={{flex: 1, alignItems: 'center',}}>
      <TouchableOpacity
        style={{
          width: props.width,
          height: props.height,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: props.marginTop
            ? props.marginTop
            : responsiveScreenHeight(2),
        }}
        onPress={props.onButtonPress}
        activeOpacity={0.9}>
        <LinearGradient
          colors={['white', 'lightgrey', 'grey']}
          style={[
            styles.button,
            {
              borderRadius: props.borderRadius ? props.borderRadius : 5,
              width: props.width,
              height: props.height,
              marginTop: props.marginTop
                ? props.marginTop
                : responsiveScreenHeight(2),
              position: props.position,
              bottom: props.bottom,
              marginBottom: props.marginBottom,
            },
          ]}>
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: props.fontSize
                  ? props.fontSize
                  : responsiveFontSize(2.2),
                      color: colorConstant.black,

              },
            ]}>
            {props.buttonTitle}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colorConstant.black,
    fontFamily: fontConstant.medium,
    textAlign: 'center',
  },
});
