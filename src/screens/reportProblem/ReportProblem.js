import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorConstant, fontConstant, imageConstant } from '../../utils/constant'
import NewHeader from '../../components/NewHeader'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

export default function ReportProblem(props) {
  return (
   <SafeAreaView style={styles.mainContainer}>
        <NewHeader rightImage={false}
        navigation = {props.navigation}
        title = {'Report a problem'} />

        <Image source={imageConstant.reportproblem} style={styles.img} />
        <Text style={styles.text}>
        Please drop us an email at info@neroavenue.com
        </Text>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:colorConstant.black
    },
    img:{
        height:responsiveScreenHeight(30),
        width:responsiveScreenWidth(70),
        alignSelf:'center',
        marginTop:responsiveScreenHeight(2),
    },
    text:{
        color:colorConstant.white,
        alignSelf:'center',
        marginVertical:responsiveScreenHeight(2),
        fontFamily:fontConstant.regular,
        fontSize:responsiveScreenFontSize(1.8)
    }
})