import { StyleSheet } from "react-native";
import { colorConstant, fontConstant } from "../../utils/constant";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

export default StyleSheet.create({
    main:{flex: 1},
    mainConatiner: {
      flex: 1,
      backgroundColor: colorConstant.black,
    },
    headerText: {
      color: colorConstant.white,
      fontFamily: fontConstant.bold,
      fontSize: responsiveScreenFontSize(3.2),
      marginHorizontal: 15,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 10,
    },
    toggleText: {
      color: colorConstant.black,
      alignSelf: 'center',
      marginLeft: 15,
      marginRight: 15,
      padding: 3,
      fontFamily: fontConstant.regular,
      fontSize: 12,
    },
    toggleView: {
      backgroundColor: colorConstant.lightGrey,
      justifyContent: 'center',
      borderRadius: 12,
      marginVertical: 10,
    },
    toggleActiveView: {
      backgroundColor: colorConstant.white,
      justifyContent: 'center',
      borderRadius: 12,
      marginVertical: 10,
    },
    img: {
      width: responsiveScreenWidth(90),
      height: responsiveScreenHeight(28),
    },
    logo: {
      resizeMode: 'contain',
      height: responsiveScreenHeight(6),
      width: responsiveScreenWidth(30),
    },
    rowContainerImg: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
      alignSelf: 'center',
    },
    leftImg: {
      width: responsiveScreenWidth(45),
      height: responsiveScreenHeight(25),
      resizeMode: 'contain',
    },
    rightImg: {
      width: responsiveScreenWidth(35),
      height: responsiveScreenHeight(25),
      resizeMode: 'contain',
    },
    subText: {
      color: colorConstant.white,
      fontFamily: fontConstant.medium,
      fontSize: responsiveScreenFontSize(1.8),
      marginHorizontal: 20,
      marginBottom: -20,
    },
    text: {
      color: colorConstant.white,
      marginHorizontal: 10,
      marginVertical: 10,
      fontFamily: fontConstant.medium,
      fontSize: responsiveScreenFontSize(2),
      width: '80%',
    },
    text1: {
      color: colorConstant.white,
      marginHorizontal: 10,
      marginVertical: 10,
      fontFamily: fontConstant.medium,
      fontSize: responsiveScreenFontSize(2),
      bottom: 10,
      position: 'absolute',
      width: '80%',
    },
    image: {
      resizeMode: 'cover',
      height: responsiveScreenHeight(30),
      width: responsiveScreenWidth(47),
      alignSelf: 'center',
      borderRadius: 12,
    },
    mainView: {
      width: responsiveScreenWidth(47.5),
      marginTop: responsiveScreenHeight(1.5),
      justifyContent: 'center',
      borderRadius: 12,
      alignItems: 'center',
      alignSelf: 'center',
      marginHorizontal: responsiveScreenHeight(0.5),
    },
    notFoundView: {
      justifyContent: 'center',
      height: responsiveScreenHeight(45),
      alignSelf: 'center',
    },
    notFoundText: {
      color: colorConstant.white,
      alignSelf: 'center',
      fontFamily: fontConstant.medium,
      fontSize: responsiveScreenFontSize(2),
    },
  });