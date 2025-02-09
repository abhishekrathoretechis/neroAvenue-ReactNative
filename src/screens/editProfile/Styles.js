import { StyleSheet } from "react-native";
import { colorConstant, fontConstant } from "../../utils/constant";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

export default StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colorConstant.black,
    },
    cameraModalTouch: {width: responsiveScreenWidth(20), alignItems: 'center'},
    badgeColor: {
      color: colorConstant.white,
      fontFamily: fontConstant.regular,
      fontSize: responsiveScreenFontSize(1.8),
    },
    interestTouch: {
      width: responsiveScreenWidth(60),
      alignSelf: 'center',
      borderRadius: 4,
      marginTop: responsiveScreenHeight(1.5),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colorConstant.bordercolor,
      height: responsiveScreenHeight(5.6),
      backgroundColor: colorConstant.backgroundBlack,
    },
    interestText: {
      color: colorConstant.white,
      alignSelf: 'flex-start',
      marginLeft: responsiveScreenWidth(2),
      fontFamily: fontConstant.regular,
      fontSize: responsiveScreenFontSize(2),
      marginRight: 10,
    },
    badge: {
      borderRadius: 4,
      backgroundColor: colorConstant.black,
    },
    colorGrey: {color: colorConstant.gray},
    colorWhite: {color: colorConstant.white},
    dropdownInterest: {
      color: colorConstant.white,
      backgroundColor: colorConstant.backgroundBlack,
      borderWidth: 1,
      borderColor: colorConstant.bordercolor,
      maxHeight: responsiveScreenHeight(50),
    },
    arrowImg: {
      resizeMode: 'contain',
      height: responsiveScreenHeight(3),
      width: responsiveScreenWidth(5),
    },
    placeholderInterset: {
      fontSize: responsiveScreenFontSize(2),
      color: colorConstant.white,
      fontFamily: fontConstant.regular,
    },
    arrowinterest: {
      resizeMode: 'contain',
      height: responsiveScreenHeight(3),
      width: responsiveScreenWidth(5),
    },
    countryArrowImg: {
      resizeMode: 'contain',
      marginRight: 10,
      height: responsiveScreenHeight(3),
      width: responsiveScreenWidth(5),
    },
    errorView: {
      marginTop: '1%',
      marginBottom: '-2%',
    },
    rightIndivialText: {
      color: colorConstant.white,
      fontFamily: fontConstant.regular,
    },
    imageBackgroundWidth: {width: '35%'},
    errorText: {
      color: 'red',
      fontSize: responsiveScreenFontSize(1.7),
      fontFamily: fontConstant.regular,
    },
    dropDownCountry: {
      width: responsiveScreenWidth(90),
      alignSelf: 'center',
      marginTop: responsiveScreenHeight(1.5),
      zIndex: 500,
      placeholderTextColor: colorConstant.placeholdercolor,
      outlineColor: colorConstant.bordercolor,
      activeOutlineColor: colorConstant.bordercolor,
      textColor: colorConstant.white,
      borderColor: colorConstant.bordercolor,
      borderWidth: 1.5,
      borderRadius: 5,
    },
    dropdownContainer: {
      width: responsiveScreenWidth(60),
      alignSelf: 'center',
      zIndex: 50000,
      placeholderTextColor: colorConstant.placeholdercolor,
      textColor: colorConstant.white,
      borderRadius: 4,
      marginTop: responsiveScreenHeight(1.5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colorConstant.bordercolor,
    },
    dropdown: {
      backgroundColor: colorConstant.backgroundBlack,
    },
    TypeContainer: {
      width: responsiveScreenWidth(60),
      alignSelf: 'center',
      borderWidth: 1.5,
      borderRadius: 4,
      marginTop: responsiveScreenHeight(1.5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colorConstant.backgroundBlack,
      height: responsiveScreenHeight(6),
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: colorConstant.bordercolor,
    },
    row1: {
      flexDirection: 'row',
      marginVertical: responsiveScreenHeight(0.2),
      alignSelf: 'center',
      alignItems: 'center',
      width: '95%',
      justifyContent: 'space-between',
    },
    rightUnderText: {
      color: colorConstant.lightText,
      fontFamily: fontConstant.regular,
      fontSize: responsiveScreenFontSize(1.9),
    },
    memberImg: {width: 35, height: 35, resizeMode: 'contain'},
    underMainRowContainet: {
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      gap: 5,
    },
    mainRowConatiner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      width: '90%',
    },
    rightView: {
      width: '60%',
      alignItems: 'center',
      marginTop: 10,
    },
    backgroundView: {
      backgroundColor: colorConstant.backgroundBlack,
  
      width: responsiveScreenWidth(100),
      height: responsiveScreenHeight(7),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      alignItems: 'center',
      paddingHorizontal: responsiveScreenHeight(2.5),
    },
    cancelText: {
      color: colorConstant.white,
      fontFamily: fontConstant.medium,
      fontSize: responsiveScreenFontSize(2.2),
    },
    profileImg: {
      alignSelf: 'center',
      width: responsiveScreenWidth(28),
      height: responsiveScreenHeight(13),
      borderRadius: 80,
    },
    imgTouch: {
      alignSelf: 'center',
      marginTop: responsiveScreenWidth(3),
      width: responsiveScreenWidth(28),
      height: responsiveScreenHeight(13),
      borderRadius: 80,
    },
    text: {
      color: colorConstant.white,
      textAlign: 'center',
      marginTop: responsiveScreenWidth(3),
      fontSize: responsiveScreenFontSize(2),
      marginBottom: responsiveScreenWidth(1.5),
      fontFamily: fontConstant.medium,
    },
    rowView: {
      gap: 1,
      justifyContent: 'space-between',
      alignSelf: 'center',
      width: responsiveScreenWidth(95),
      marginBottom: responsiveScreenWidth(3),
    },
    leftColumnView: {
      width: responsiveScreenWidth(30),
    },
    RightColumnView: {
      width: responsiveScreenWidth(60),
    },
    leftText: {
      color: colorConstant.white,
      fontFamily: fontConstant.regular,
      fontSize: responsiveScreenFontSize(1.8),
    },
    infoText: {
      color: colorConstant.white,
      margin: responsiveScreenWidth(4),
      fontFamily: fontConstant.medium,
      fontSize: responsiveScreenFontSize(2),
    },
    inputContainer: {
      width: responsiveScreenWidth(60),
      height: responsiveScreenHeight(5),
      color: colorConstant.white,
      fontFamily: fontConstant.regular,
      fontSize: responsiveScreenFontSize(1.8),
      backgroundColor: colorConstant.backgroundBlack,
      borderRadius: 8,
      paddingHorizontal: responsiveScreenWidth(3),
    },
    leftView: {
      width: responsiveScreenWidth(25),
      justifyContent: 'center',
    },
    modalContainer: {
      backgroundColor: '#403735',
  
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
  
      elevation: 11,
      bottom: 0,
      position: 'absolute',
      height: responsiveScreenHeight(20),
      width: responsiveScreenWidth(100),
      borderRadius: 8,
      alignSelf: 'center',
    },
    mainModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    profileText: {
      color: colorConstant.white,
      width: responsiveScreenWidth(90),
      marginTop: responsiveScreenHeight(2),
    },
    rowContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: responsiveScreenWidth(70),
      marginTop: responsiveScreenHeight(2),
    },
    rightText: {
      width: responsiveScreenWidth(55),
      height: responsiveScreenHeight(5),
      color: colorConstant.white,
      fontFamily: fontConstant.regular,
      fontSize: responsiveScreenFontSize(1.8),
    },
    dropdownList: {
      backgroundColor: colorConstant.backgroundBlack,
    },
    calenderContainer: {
      alignSelf: 'center',
      backgroundColor: colorConstant.backgroundBlack,
      width: responsiveScreenWidth(60),
      height: responsiveScreenHeight(6),
      marginTop: responsiveScreenHeight(1.5),
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1,
      borderWidth: 1,
      borderColor: colorConstant.bordercolor,
    },
    dobText: {
      marginLeft: responsiveScreenWidth(2),
      width: responsiveScreenWidth(45),
      alignSelf: 'center',
      fontSize: responsiveScreenWidth(3.8),
      color: colorConstant.white,
      fontFamily: fontConstant.medium,
    },
    calenderImg: {
      resizeMode: 'contain',
      width: responsiveScreenWidth(5),
      height: responsiveScreenHeight(3),
      marginRight: responsiveScreenWidth(2),
    },
    selectCountryButton: {
      color: colorConstant.placeholdercolor,
      fontSize: responsiveScreenFontSize(2),
      fontFamily: fontConstant.regular,
    },
    selectedCountryText: {
      color: colorConstant.white,
      fontSize: responsiveScreenFontSize(2),
      fontFamily: fontConstant.regular,
    },
    dropdownContainernew: {
      width: responsiveScreenWidth(60),
      alignSelf: 'center',
      zIndex: 1000,
      placeholderTextColor: colorConstant.placeholdercolor,
      textColor: colorConstant.white,
      borderWidth: 1.5,
      borderRadius: 4,
      marginTop: responsiveScreenHeight(1.5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colorConstant.backgroundBlack,
      height: responsiveScreenHeight(6),
      paddingLeft: responsiveScreenWidth(2),
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colorConstant.bordercolor,
    },
    dropdownContainerWhatBest: {
      width: responsiveScreenWidth(60),
      alignSelf: 'center',
      zIndex: 31000,
      placeholderTextColor: colorConstant.placeholdercolor,
      textColor: colorConstant.white,
      borderRadius: 4,
      marginTop: responsiveScreenHeight(1.5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colorConstant.bordercolor,
    },
  });