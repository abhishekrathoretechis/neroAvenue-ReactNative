import { StyleSheet } from "react-native";
import { colorConstant, fontConstant } from "../../utils/constant";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

export default StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colorConstant.black,
    },
    mainView: {
      backgroundColor: colorConstant.backgroundBlack,
      width: responsiveScreenWidth(90),
      alignSelf: 'center',
      marginTop: responsiveScreenHeight(3),
      borderRadius: 8,
    },
    rowUnderContainer: {
      width: responsiveScreenWidth(90),
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
      padding: responsiveScreenWidth(4),
      marginBottom: responsiveScreenHeight(1),
    },
    bodyText: {
      fontFamily: fontConstant.regular,
      fontSize: responsiveScreenFontSize(2),
      color: colorConstant.white,
    },
    arrowImg: {
      resizeMode: 'contain',
      width: responsiveScreenWidth(5),
      height: responsiveScreenHeight(2),
    },
  });