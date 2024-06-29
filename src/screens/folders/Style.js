import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import { colorConstant, fontConstant } from "../../utils/constant";

const { StyleSheet } = require("react-native");

export default StyleSheet.create({
    mainContainer: {backgroundColor: 'black', flex: 1},
    imageView: {flexDirection: 'row', alignItems: 'center'},
    categoryText: {color: 'white', fontFamily: fontConstant.regular},
    imageStyle: {
      width: responsiveScreenWidth(15),
      height: responsiveScreenHeight(6),
      borderRadius: responsiveScreenWidth(2),
      marginRight: responsiveScreenWidth(2),
    },
    searchTextInput: {
      fontSize: responsiveScreenFontSize(2),
      color: 'white',
      width: responsiveScreenWidth(80),
    },
    folderView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: responsiveScreenHeight(3),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: responsiveScreenHeight(3),
      paddingHorizontal: responsiveScreenWidth(3),
      marginTop: responsiveScreenHeight(2),
    },
    text: {
      color: 'white',
      fontSize: responsiveScreenFontSize(1.9),
      fontFamily: fontConstant.regular,
    },
    touch: {justifyContent: 'center', alignItems: 'center'},
    createFolderView: {
      flexDirection: 'row',
      gap: responsiveScreenWidth(6),
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    searchContainer: {
      backgroundColor: colorConstant.backgroundBlack,
      flexDirection: 'row',
      alignItems: 'center',
      width: responsiveScreenWidth(93),
      height: responsiveScreenHeight(6),
      paddingHorizontal: responsiveScreenWidth(5),
      gap: responsiveScreenWidth(2),
      borderRadius: responsiveScreenWidth(4),
      alignSelf: 'center',
    },
  
    folderNameCotainer: {
      backgroundColor: colorConstant.backgroundBlack,
      marginBottom: responsiveScreenHeight(2),
      height: responsiveScreenHeight(8),
      width: responsiveScreenWidth(93),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: responsiveScreenWidth(2),
      borderBottomWidth: 2,
      borderColor: colorConstant.white,
      borderRadius: responsiveScreenWidth(2),
    },
    selectedFolder: {
      backgroundColor: 'grey',
    },
    newFolderNameInput: {
      width: responsiveScreenWidth(83),
      color: colorConstant.white,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: responsiveScreenWidth(93),
      height: responsiveScreenHeight(8),
      backgroundColor: colorConstant.backgroundBlack,
      borderBottomWidth: 2,
      borderColor: colorConstant.white,
      borderRadius: responsiveScreenWidth(2),
      paddingHorizontal: responsiveScreenWidth(5),
      justifyContent: 'space-between',
      marginBottom: responsiveScreenHeight(2),
      gap: responsiveScreenWidth(1),
    },
  });
  