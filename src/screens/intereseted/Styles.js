import { StyleSheet } from "react-native";
import { colorConstant, fontConstant } from "../../utils/constant";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

export default StyleSheet.create({
    mainContainer:{flex: 1, backgroundColor: colorConstant.black},
    button: {
      marginTop: responsiveScreenHeight(20.5),
      width: responsiveScreenWidth(90),
      height: responsiveScreenHeight(6),
      alignSelf: 'center',
      zIndex: 100,
    },
    imgIcon:{
      tintColor: 'white',
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 5,
    },
    allicon: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: responsiveScreenWidth(100),
      alignSelf: 'center',
      marginTop: responsiveScreenHeight(2),
    },
    singleicon: {
      margin: 7,
      alignItems: 'center',
      width: responsiveScreenWidth(29),
      marginVertical: responsiveScreenHeight(2),
    },
    inactiveText: {
      color: '#979797',
      textAlign: 'center',
      fontFamily: fontConstant.regular,
      fontSize: responsiveScreenFontSize(1.5),
      marginTop: responsiveScreenHeight(0.5),
      width: '100%',
    },
    activeText: {
      color: 'white',
      textAlign: 'center',
      fontFamily: fontConstant.bold,
      fontSize: responsiveScreenFontSize(1.5),
      marginTop: responsiveScreenHeight(0.5),
      width: '100%',
    },
    iconset: {
      flexDirection: 'row',
      width: responsiveScreenWidth(100),
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginVertical: responsiveScreenHeight(1),
    },
    headerText: {
      color: colorConstant.white,
      alignSelf: 'center',
      fontSize: responsiveScreenFontSize(2.3),
      fontFamily: fontConstant.medium,
    },
    img1: {
      resizeMode: 'contain',
      height: 70,
      width: 80,
      marginLeft: -10,
      marginBottom: -10,
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: responsiveScreenWidth(6),
      height: responsiveScreenHeight(7.5),
    },
  });