import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
// Replace with your actual icon library

import { colorConstant,fontConstant } from '../utils/constant';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth,
  } from 'react-native-responsive-dimensions';

import Icon from 'react-native-vector-icons/AntDesign';


const CommonTagsSelect = ({ selected,setTagsModalVisible,renderedItems,tagsError,tagNames }) => {
   

  return (
    <View style={{marginBottom:responsiveScreenHeight(2)}}>
        {selected !== 0 ? (
        <View style={{zIndex: 1}}>
          <View style={styles.titlecontainer}>
            <Text
              style={{
                color: colorConstant.white,
                fontFamily: fontConstant.semibold,
                fontSize: 16,
              }}>
              Tags
            </Text>
            <View>
              <TouchableOpacity
                style={styles.textinput}
                activeOpacity={0.8}
                onPress={() => {
                  setTagsModalVisible(true);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: responsiveScreenWidth(73),
                  }}>
                 { tagNames?.length === 0 ? (
                  <View>
                     <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <Text style={{fontSize:responsiveScreenFontSize(2),color:colorConstant.placeholdercolor}}>
                    Select the most suitable tags
                  </Text>
                </View>
                  </View>
                 ):(
                  <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  {renderedItems}
                </View>
                 )}

                  <Icon name={'right'} size={19} style={{color: 'white'}} />
                </View>
              </TouchableOpacity>

              {tagsError ? (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{tagsError}</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default CommonTagsSelect;

const styles = StyleSheet.create({
    textinput: {
        backgroundColor: colorConstant.backgroundBlack,
        width: responsiveScreenWidth(80),
        height: responsiveScreenHeight(5.5),
        borderRadius: 5,
        color: colorConstant.white,
        // paddingHorizontal: 9,
        borderWidth: 1,
        borderColor: colorConstant.bordercolor,
        marginLeft: responsiveScreenWidth(-0.5),
        height:responsiveScreenHeight(6.5),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      },
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
