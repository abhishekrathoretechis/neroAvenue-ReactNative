import { StyleSheet, Text, View ,TextInput} from 'react-native'
import React from 'react'
// import { TextInput } from 'react-native-paper'
import { colorConstant, fontConstant } from '../utils/constant'
import { width } from '../dimension/dimension'
import { responsiveHeight, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

export default function CommonTextInput(props) {
  return (
    <View>
       <TextInput
      placeholder={props.placeholder}
      style={[styles.inputbox,{
        borderRadius:4,
        borderWidth:1,
        borderColor:props.borderColor ? colorConstant.bordercolor : null,
        width:props.width,
        height: props.height,
        
        paddingHorizontal:responsiveScreenWidth(3),
        marginTop:props.marginTop ? props.marginTop : responsiveScreenHeight(1.5)
      }]}
      placeholderTextColor={colorConstant.placeholdercolor}
      // outlineColor={colorConstant.bordercolor}
      // activeOutlineColor={colorConstant.bordercolor}
      textColor={colorConstant.white}
      value={props.value}
      onChangeText={props.onChangeText}
      keyboardType={props.keyboardType}
      maxLength={props.maxLength}
      multiline={props.multiline}
      editable={props.editable}
      textAlignVertical={props.textAlignVertical}
      numberOfLines={props.numberOfLines}
      onEndEditing={props.onEndEditing}
      zIndex={props.zIndex}
      onKeyPress={props.onKeyPress}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  inputbox:{
    backgroundColor:colorConstant.black,
    alignSelf:'center',
    backgroundColor:colorConstant.backgroundBlack,
    fontFamily:fontConstant.regular,
    fontSize:responsiveScreenFontSize(2),
    color:colorConstant.white,
    zIndex:10
    

  }
})