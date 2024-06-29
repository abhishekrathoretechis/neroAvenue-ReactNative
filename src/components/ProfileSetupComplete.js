import React from 'react';
import {Image, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, fontConstant, imageConstant,} from '../utils/constant';

export default function ProfileSetupComplete({handleBackScroll}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
           <TouchableOpacity onPress={handleBackScroll}>
            <Image source={imageConstant.whitearrow} style={styles.img1}/>
           </TouchableOpacity>
           <Text style={styles.headerText}>
            
           </Text>
        </View>
      <Text variant="headlineMedium" style={styles.titleText}>
        Get ready to experience the real NERO! {'\n'}
      </Text>
      <Text style={styles.subTitleText}>Great! Your profile is ready.</Text>

      <Image source={imageConstant.Posts} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  titleText: {
    color: colorConstant.white,
    fontWeight: '700',
    fontSize: responsiveFontSize(2.2),
    marginTop: responsiveScreenHeight(10),
    fontFamily: fontConstant.bold,
    textAlign: 'center',
  },
  subTitleText: {
    color: colorConstant.white,
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
    fontFamily: fontConstant.bold,
    marginBottom: responsiveScreenHeight(5),
    textAlign: 'center',
  },
  img: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(43),
    width: responsiveScreenWidth(94.5),
    alignSelf: 'center',
  },
  header: {
    backgroundColor:colorConstant.backgroundBlack,
    alignItems:'center',
    flexDirection:'row',
    gap:responsiveScreenWidth(0),
    height:responsiveScreenHeight(7.5),
  },
  headerText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.3),
    fontFamily:fontConstant.medium
  
  },
  img1: {
    // resizeMode: 'contain',
    // height: responsiveScreenHeight(4),
    // width: responsiveScreenWidth(8),
    // marginLeft: responsiveScreenWidth(2),
    resizeMode: 'contain',
    height: 70,
    width: 80,
    marginLeft: -10,
    marginBottom: -10,
    
   
  }
});
