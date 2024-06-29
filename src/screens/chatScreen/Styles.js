import {StyleSheet} from 'react-native';
import {colorConstant, fontConstant} from '../../utils/constant';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colorConstant.black,
    flex: 1,
  },
  blurLoder: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  imgStyle: {height: 30, width: 30},
  bubble: {
    color: colorConstant.white,
    fontSize: responsiveScreenFontSize(1.7),
    fontFamily: fontConstant.regular,
    marginLeft: 5,
    padding: 5,
  },
  renderChatFooterView: {
    width: responsiveScreenWidth(37),
    marginBottom: responsiveScreenHeight(1),
    alignSelf: 'flex-end',
  },
  renderChatFooterImage: {
    height: responsiveScreenHeight(20),
    width: responsiveScreenWidth(35),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colorConstant.lightWhite,
  },
  renderFooterCrossImage: {position: 'absolute', right: 0, top: -10},
  renderFooterFileView: {
    width: responsiveScreenWidth(50),
    marginLeft: responsiveScreenWidth(3),
    marginBottom: responsiveScreenHeight(5),
  },
  renderFooterFileCrossImage: {top: -20, alignSelf: 'flex-end', left: 10},
  sideMainView: {
    backgroundColor: colorConstant.backgroundBlack,
    width: responsiveScreenWidth(23),
    borderRadius: 8,
    marginLeft: 2,
    flex: 1,
    marginTop: responsiveScreenHeight(8),
  },
  renderItemMainView: {
    marginTop: responsiveScreenHeight(2),
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  sideModalProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colorConstant.lightWhite,
  },
  userTypeView: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    height: 30,
    width: 30,
    justifyContent: 'flex-end',
  },
  sideModalUserTypeImage: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
  },
  sideRightMainView: {
    backgroundColor: colorConstant.bordercolor,
    width: responsiveScreenWidth(35),
    borderRadius: 3,
    flex: 0.22,
    marginTop: responsiveScreenHeight(5.5),
    alignSelf: 'flex-end',
  },
  rightSideModalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(1),
    marginHorizontal: responsiveScreenWidth(4),
  },
  sideModalProfileTextView: {width: responsiveScreenWidth(15)},
  sideModalProfileText: {
    fontSize: responsiveScreenFontSize(2.2),
    fontFamily: fontConstant.regular,
    color: colorConstant.white,
  },
  sideModalImage: {
    width: 25,
    height: 25,
    borderRadius: 17,
  },
  sendButton: {
    height: 40,
    width: 40,
  },
  icon: {
    height: 25,
    width: 25,
  },
  renderInputMainView: {
    flex: 1,
    backgroundColor: '#323436',
    borderRadius: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  renderInputTextInput: {
    fontSize: responsiveScreenFontSize(2),
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    marginTop: 5,
  },
  profileImgView: {
    height: 50,
    width: 50,
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
});
