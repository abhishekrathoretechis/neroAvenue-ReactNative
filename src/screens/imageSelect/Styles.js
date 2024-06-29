import { StyleSheet } from "react-native";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import { fontConstant } from "../../utils/constant";

export default StyleSheet.create({
    mainContainer: {flex: 1, backgroundColor: 'black'},
    lastView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    tickImg: {width: 30, height: 30, tintColor: 'white'},
    crossTouch: {position: 'absolute', right: 7, top: 15},
    deleteTouch: {justifyContent: 'center', alignItems: 'center', gap: 7},
    mb10:{
      marginBottom: 10,
    },
    text1: {
      color: 'white',
      marginTop: responsiveScreenHeight(1),
      fontSize: responsiveScreenFontSize(2.3),
      fontFamily: fontConstant.regular,
      color: '#979797',
      textAlign:'center'
    },
    deleteText: {
      color: 'white',
      fontSize: responsiveScreenFontSize(3),
      fontFamily: fontConstant.bold,
      marginTop: responsiveScreenHeight(1),
    },
    footerView: {
      flexDirection: 'row',
      width: responsiveScreenWidth(30),
      gap: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    img: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
      resizeMode: 'stretch',
    },
    text: {
      color: 'white',
      fontFamily: fontConstant.regular,
      
    },
  
    imgTouch: {justifyContent: 'center', alignItems: 'center'},
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: responsiveScreenHeight(3),
      paddingHorizontal: responsiveScreenWidth(3),
      marginTop: responsiveScreenHeight(2),
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: responsiveScreenWidth(3),
    },
    footer: {
      backgroundColor: 'black',
      height: responsiveScreenHeight(7),
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'black',
      height: responsiveScreenHeight(20),
      width: responsiveScreenWidth(85),
      borderRadius: responsiveScreenWidth(5),
  
      alignItems: 'center',
      paddingHorizontal: responsiveScreenWidth(3),
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: responsiveScreenHeight(32),
    },
  });