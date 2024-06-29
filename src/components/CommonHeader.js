import {StyleSheet, View, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, fontConstant} from '../utils/constant';
import {Text} from 'react-native-paper';
export default function CommonHeader(props) {
  return props.back == true ? (
    <TouchableOpacity style={styles.mainContainerWithBack} onPress={()=>{ props.goToHome == true ? props.navigation.replace('DrawerTabNavigation') : props.navigation.goBack()}} >
      <Image source={props.backImg} style={styles.img} />
      <Text variant="titleMedium" numberOfLines={1} style={[styles.headerTextWithBack,{
        width: props.width ? props.width : responsiveScreenWidth(68),
      }]}>
        {props.headerTitle}
      </Text>
    </TouchableOpacity>
  ) : (
    <View style={styles.mainContainer}>
      <Text variant="titleMedium" style={styles.headerText}>
        {props.headerTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(7),
    backgroundColor: colorConstant.backgroundBlack,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.3),
    fontFamily:fontConstant.medium
  },
  img: {
    // resizeMode: 'contain',
    // height: responsiveScreenHeight(4),
    // width: responsiveScreenWidth(8),
    // marginLeft: responsiveScreenWidth(2),
    resizeMode: 'contain',
    height: 70,
    width: 80,
    marginLeft: -10,
    // marginBottom: -10,
    // backgroundColor:'red'
  },
  mainContainerWithBack: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(7),
    // backgroundColor: colorConstant.backgroundBlack,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTextWithBack: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.3),
    fontFamily:fontConstant.medium,
    // backgroundColor:'red'
    // width: responsiveScreenWidth(80),
    // textAlign:'center',
   
  },
});
