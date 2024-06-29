import { StyleSheet } from "react-native";
import { colorConstant, fontConstant } from "../../utils/constant";
import { responsiveScreenFontSize, responsiveScreenHeight } from "react-native-responsive-dimensions";

export default StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colorConstant.black,
    },
    forgetPasswordText: {
      color: colorConstant.white,
      fontFamily: fontConstant.bold,
      fontSize: responsiveScreenFontSize(3),
      alignSelf: 'center',
      marginVertical: responsiveScreenHeight(5),
    },
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
  });