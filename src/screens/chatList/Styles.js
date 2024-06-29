import {StyleSheet} from 'react-native';
import {colorConstant, fontConstant} from '../../utils/constant';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  maincontainer: {
    backgroundColor: colorConstant.black,
    flex: 1,
  },
  flatlistStyle: {
    marginTop: responsiveScreenHeight(1),
    marginBottom: responsiveScreenHeight(1),
  },
  modaltextinputstyle: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(1.8),
    width: responsiveScreenWidth(80),
  },
  modaltextinput: {
    backgroundColor: colorConstant.backgroundBlack,
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(5.5),
    borderRadius: 15,
    color: colorConstant.white,
    paddingHorizontal: 9,
    marginLeft: responsiveScreenWidth(-0.5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveScreenWidth(2),
  },
  usernameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(4),
  },
  textinputcontainer: {
    marginTop: responsiveScreenHeight(1),
    alignItems: 'center',
  },
  searchicon: {
    width: responsiveScreenHeight(2),
    height: responsiveScreenHeight(2),
  },
  profilepicstyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colorConstant.lightWhite,
  },
  profileImgView: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colorConstant.lightWhite,
  },
  profileImgText: {
    textAlign: 'center',
    fontSize: responsiveScreenFontSize(3.5),
    color: colorConstant.white,
    fontFamily: fontConstant.black,
  },
  sideiconstyle: {
    width: 25,
    height: 25,
    position: 'absolute',
    bottom: -5,
    right: -8,
  },
  usernamestyle: {
    color: 'white',
    fontSize: responsiveScreenFontSize(2.3),
    fontFamily: fontConstant.medium,
  },
  descriptionstyle: {
    color: colorConstant.placeholdercolor,
    fontSize: responsiveScreenFontSize(2.1),
    fontFamily: fontConstant.regular,
  },
  timestyle: {
    color: colorConstant.placeholdercolor,
    fontSize: responsiveScreenFontSize(2.2),
  },
  linestyle: {
    height: 1,
    backgroundColor: colorConstant.bordercolor,
    marginTop: responsiveScreenHeight(1.5),
  },
  left: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(6),
  },
  right: {
    marginRight: responsiveScreenWidth(2),
    paddingTop: responsiveScreenHeight(0.5),
  },
  username: {
    justifyContent: 'space-evenly',
  },
});
