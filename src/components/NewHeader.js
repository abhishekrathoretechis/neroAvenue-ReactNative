import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colorConstant, fontConstant, imageConstant} from '../utils/constant';
import {responsiveScreenFontSize, responsiveScreenWidth} from 'react-native-responsive-dimensions';

export default function NewHeader(props) {
  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity onPress={()=>{ props.goToHome == true ? props.navigation.replace('DrawerTabNavigation') : props.navigation.goBack()}}>
        <Image source={imageConstant.whitearrow} style={styles.arrowImg} />
      </TouchableOpacity>
    <View style={{width:'65%',alignSelf:'center',}}>
      <Text
        style={styles.titleText}>
        {props.title}
      </Text>
      </View>
      
      <TouchableOpacity
        style={styles.touch}
        onPress={props.rightNavigation}>
          {props.rightImage === false ? null :
        <Image source={imageConstant.dot} style={styles.dotImg} />
          }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: responsiveScreenWidth(100),
  },
  arrowImg: {
    resizeMode: 'contain',
    height: 70,
    width: 80,
    marginLeft: -10,
    marginBottom: -10,
  },
  dotImg: {
    resizeMode: 'contain',
    height: 15,
    width: 15,
    marginRight: 10,
    alignSelf: 'center',
  },

  titleText:{
    color: colorConstant.white,
    // width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily:fontConstant.medium,
    fontSize:responsiveScreenFontSize(2.3),
    marginRight:responsiveScreenWidth(13)
  },touch:{
    width: 30,
    height: 30,
    justifyContent: 'center',
  }
});
