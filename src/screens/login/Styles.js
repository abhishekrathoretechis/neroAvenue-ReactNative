import { StyleSheet } from "react-native";
import { colorConstant, fontConstant } from "../../utils/constant";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

export default StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colorConstant.black,
    },
    linearGradient: {
      backgroundColor: 'red',
      borderRadius: 5,
      height: 25,
      width: 100,
    },
    buttonText: {
      fontSize: 18,
      fontFamily: fontConstant.regular,
      textAlign: 'center',
      margin: 10,
      color: 'black',
      backgroundColor: 'red',
    },
    logoImg: {
      resizeMode: 'contain',
      width: responsiveScreenWidth(40),
      height: responsiveScreenHeight(17),
      alignSelf: 'center',
      marginTop: responsiveScreenWidth(15),
    },
    loginText: {
      color: colorConstant.white,
      fontFamily: fontConstant.medium,
      fontSize: responsiveScreenFontSize(2.4),
    },
    subLoginText: {
      color: colorConstant.lightWhite,
      fontFamily: fontConstant.regular,
      fontSize: responsiveScreenFontSize(1.8),
    },
    loginView: {
      marginTop: responsiveScreenWidth(8),
      marginLeft: responsiveScreenWidth(6.5),
      marginBottom: responsiveScreenWidth(5),
    },
    forgetPasswordView: {
      alignSelf: 'flex-end',
      marginRight: responsiveScreenWidth(5),
      marginTop: responsiveScreenWidth(4),
    },
    forgetPasswordText: {
      color: colorConstant.lightWhite,
      fontFamily: fontConstant.medium,
      fontSize: responsiveScreenFontSize(1.8),
    },
    gmailIcon: {
      resizeMode: 'contain',
      width: responsiveScreenWidth(6.5),
      height: responsiveScreenHeight(3),
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: responsiveScreenWidth(10),
    },
    gmailText: {
      marginLeft: responsiveScreenWidth(1),
      color: colorConstant.white,
      fontFamily: fontConstant.medium,
      fontSize: responsiveScreenFontSize(1.8),
    },
    orView: {
      alignSelf: 'center',
      marginTop: responsiveScreenHeight(5),
    },
    orText: {
      color: colorConstant.lightText,
      fontFamily: fontConstant.regular,
      fontSize: responsiveScreenFontSize(1.8),
    },
    passwordcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#121212',
      width: responsiveScreenWidth(90),
      paddingHorizontal: responsiveScreenWidth(3),
      justifyContent: 'space-between',
      marginTop: responsiveScreenHeight(3),
      borderColor: colorConstant.bordercolor,
      borderRadius: 2,
      borderWidth: 1,
      alignSelf: 'center',
    },
    inputText: {
      fontSize: responsiveScreenFontSize(2),
      fontFamily: fontConstant.regular,
      color: colorConstant.white,
      width: responsiveScreenWidth(75),
      height: 50,
    },
    errorView: {
      marginTop: '1%',
      marginLeft: '5%',
      marginBottom: '-2%',
    },
    errorText: {
      color: 'red',
      fontSize: responsiveScreenFontSize(1.8),
      fontFamily: fontConstant.regular,
    },
  });