import { StyleSheet } from "react-native";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import { fontConstant } from "../../utils/constant";

export default StyleSheet.create({
    mainContainer: {flex: 1, backgroundColor: 'black'},
    img: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    rightImg: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 5,
    },
    categoryText: {
      color: 'white',
      fontSize: responsiveScreenFontSize(2.3),
      fontFamily: fontConstant.medium,
      marginTop: -8,
    },
    headerImg: {
      width: responsiveScreenWidth(12),
      height: responsiveScreenHeight(10),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsiveScreenWidth(3),
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
  });