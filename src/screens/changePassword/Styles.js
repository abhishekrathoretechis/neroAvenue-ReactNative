import { StyleSheet } from "react-native";
import { colorConstant, fontConstant } from "../../utils/constant";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

export default StyleSheet.create({
    mainContainer: {
      backgroundColor: colorConstant.black,
      flex: 1,
    },
    headerText:{
      color: colorConstant.white,
      fontFamily: fontConstant.medium,
      fontSize: responsiveScreenFontSize(2.3),
      textAlign: 'center',
    },
    headerView:{marginVertical: responsiveScreenHeight(3)},
    errorView: {
      marginTop: '1%',
      marginLeft: '5%',
      marginBottom: '-2%',
    },
    errorText: {
      color: 'red',
      fontSize: responsiveScreenFontSize(1.7),
      fontFamily: fontConstant.regular,
    },
    passwordcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#121212',
      width: responsiveScreenWidth(90),
      paddingHorizontal: responsiveScreenWidth(3),
      justifyContent: 'space-between',
      marginTop: responsiveScreenHeight(2),
      borderColor: colorConstant.bordercolor,
      borderRadius: 2,
      borderWidth: 1,
      alignSelf: 'center',
    },
    text: {
      color: colorConstant.white,
      fontFamily: fontConstant.regular,
      fontSize: responsiveScreenFontSize(1.8),
      margin: responsiveScreenWidth(5),
    },
    inputText: {
      fontSize: responsiveScreenFontSize(2),
      fontFamily: fontConstant.regular,
      color: colorConstant.white,
      width: responsiveScreenWidth(75),
      height: 50,
    },
  });