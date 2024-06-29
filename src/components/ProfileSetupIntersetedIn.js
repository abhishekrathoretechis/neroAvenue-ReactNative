import { FlatList, SafeAreaView, StyleSheet,  View ,Image} from 'react-native'
import React from 'react'
import {

    responsiveFontSize,
    responsiveScreenFontSize,
    responsiveScreenHeight,

    responsiveScreenWidth,

} from "react-native-responsive-dimensions";

import { Text } from 'react-native-paper';
import { colorConstant, fontConstant, imageConstant } from '../utils/constant';
import CommonHeader from './CommonHeader';
export default function ProfileSetupIntersetedIn(props) {

    const intersetedData=[{
        id:'#01',
        image:imageConstant.img3,
        title:'Wallpapers'
    },
    {
        id:'#02',
        image:imageConstant.img4,
        title:'Beauty'
    },
    {
        id:'#03',
        image:imageConstant.img5,
        title:'Flowers'
    },
    {
        id:'#04',
        image:imageConstant.img3,
        title:'Wallpapers'
    },
    {
        id:'#05',
        image:imageConstant.img4,
        title:'Beauty'
        
    },
    {
        id:'#06',
        image:imageConstant.img5,
        title:'Flowers'
    },
    {
        id:'#07',
        image:imageConstant.img3,
        title:'Wallpapers'
    },
    {
        id:'#08',
        image:imageConstant.img4,
        title:'Beauty'
    },
    {
        id:'#09',
        image:imageConstant.img5,
        title:'Flowers'
    },
    
]

const renderItem = ({item,index}) =>{
    return(
        <View style={styles.columnBackgroundView}>
            <Image source={item.image} style={styles.img} />
            <Text style={styles.titleText}>{item.title}</Text>
        </View>
    )
}
  return (
  
    <View>
      <CommonHeader headerTitle = {'What are you interested in?'} 
    //   navigation = {props.navigation}
    //   backImg = {imageConstant.backarrow}
    //   width={responsiveScreenWidth(80)}
    //   back = {true}
    />

    <Text variant="bodyMedium" style={styles.subHeaderText}>Pick 5 to customize your home feed</Text>
   <FlatList
    data = {intersetedData}
    numColumns={3}
    renderItem={renderItem}
   
   
   />
</View>
  )
}

const styles = StyleSheet.create({
    backgroundView: {

        backgroundColor: colorConstant.backgroundBlack,
        width: responsiveScreenWidth(100),
        height: responsiveScreenHeight(7),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    headerText:{
        color:colorConstant.white,
        alignSelf:'center'
    },
    subHeaderText:{
        color:colorConstant.lightWhite,
        alignSelf:'center',
        marginTop:responsiveScreenHeight(2),
        marginBottom:responsiveScreenHeight(1),
        fontSize:responsiveFontSize(1.8),
        fontFamily:fontConstant.regular
    },
    columnBackgroundView:{
        width:responsiveScreenWidth(33),
        justifyContent:'center',
        alignSelf:'center',
        height:'auto',
        marginTop:responsiveScreenHeight(1),
        marginBottom:responsiveScreenHeight(1)
    },
    img:{
        resizeMode:'contain',
        alignSelf:'center',
        width:responsiveScreenWidth(31),
        height:responsiveScreenHeight(13),
     
    },
    titleText:{
        alignSelf:'center',
        color:colorConstant.white,
        marginTop:responsiveScreenHeight(1),
        fontFamily:fontConstant.regular,
        fontSize:responsiveScreenFontSize(1.5)
    }

})