import { StyleSheet } from "react-native";
import { colorConstant, fontConstant } from "../../utils/constant";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

export default StyleSheet.create({
    maincontainer: {
      backgroundColor: colorConstant.black,
      flex: 1,
    },
    emailIdText:{color: '#F9F9F9',marginBottom:10},
    headText: {
      color: '#F9F9F9',
      fontFamily: fontConstant.regular,
      fontSize: 16,
    },
    headText2: {
      color: '#B8B8B8',
      fontFamily: fontConstant.regular,
      fontSize: 18,
      textAlign:'center',
      alignSelf:'center',
      marginVertical:responsiveScreenHeight(3),
  
    },
    header: {
      height: responsiveScreenHeight(7),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: responsiveScreenWidth(70),
      marginTop: responsiveScreenHeight(1),
    },
    logo: {
      resizeMode: 'contain',
      width: responsiveScreenWidth(20),
      height: responsiveScreenHeight(10),
      marginTop: responsiveScreenHeight(1.5),
    },
    heading1: {
      marginTop: responsiveScreenHeight(2),
      paddingHorizontal: responsiveScreenWidth(5.5),
    },
    leftInput: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: responsiveScreenWidth(95),
      height: responsiveScreenHeight(4),
    },
    heading2: {
      marginTop: responsiveScreenHeight(2),
      alignSelf:'center'
    },
    paragraphfirst: {
      marginTop: responsiveScreenHeight(0.5),
      paddingHorizontal: responsiveScreenWidth(5.5),
    },
    paragraphfirsttext: {
      color: '#E9E9E9',
      fontFamily: fontConstant.regular,
      lineHeight: responsiveScreenHeight(2.3),
    },
    paragraphsecond: {
      marginTop: responsiveScreenHeight(2),
      paddingHorizontal: responsiveScreenWidth(7.5),
    },
    paragraphsecondtext: {
      color: '#E9E9E9',
      lineHeight: responsiveScreenHeight(2.3),
    },
    cheersparagraph: {
      marginTop: responsiveScreenHeight(2),
      paddingHorizontal: responsiveScreenWidth(4),
      backgroundColor: colorConstant.backgroundBlack,
      marginHorizontal: responsiveScreenWidth(5.5),
      borderRadius: 10,
  
      justifyContent: 'center',
      paddingVertical: responsiveScreenHeight(1.5),
    },
    cheersheading: {
      fontSize: 18,
      fontFamily: fontConstant.regular,
      color: '#E9E9E9',
    },
    cheerstext: {
      fontFamily: fontConstant.regular,
      color: '#E9E9E9',
      lineHeight: responsiveScreenHeight(2.5),
    },
    expiredinvitationparagraph: {
      marginVertical: responsiveScreenHeight(3),
      paddingHorizontal: responsiveScreenWidth(4),
      backgroundColor: '#5B5B5B',
      marginHorizontal: responsiveScreenWidth(5.5),
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      gap: 28,
    },
    expiredinvitationheading: {
      fontSize: 18,
      fontFamily: fontConstant.regular,
      color: '#E9E9E9',
    },
    emailid: {
      margin: responsiveScreenWidth(5.5),
      gap: 5,
      marginBottom: responsiveScreenHeight(2),
    },
    expiredinvitationtext: {
      fontFamily: fontConstant.regular,
      color: '#E9E9E9',
      lineHeight: responsiveScreenHeight(2.5),
    },
    inviteImg: {
      resizeMode: 'contain',
      width: responsiveScreenWidth(20),
      height: responsiveScreenHeight(4),
    },
    inviteImg1: {
      resizeMode: 'contain',
      width: responsiveScreenWidth(20),
      height: responsiveScreenHeight(4),
      marginRight: 15,
    },
    input: {
      backgroundColor: colorConstant.backgroundBlack,
      width: responsiveScreenWidth(60),
      borderRadius: 7,
      color: colorConstant.white,
      height:responsiveScreenHeight(5.5),
      paddingLeft:10
    },
    errorView: {
      marginTop: '1%',
      marginLeft: '1%',
      marginBottom: '-2%',
    },
    errorText: {
      color: 'red',
      fontSize: responsiveScreenFontSize(1.8),
      fontFamily: fontConstant.regular,
    },
  });