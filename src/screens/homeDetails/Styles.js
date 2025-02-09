import {StyleSheet} from 'react-native';
import {colorConstant, fontConstant} from '../../utils/constant';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  maincontainer: {
    backgroundColor: 'black',
    flex: 1,
  },
  showMsg: {
    alignSelf: 'center',
    width: responsiveScreenWidth(95),
    marginVertical: responsiveScreenHeight(2),
  },
  showMsgText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2.5),
    alignSelf: 'center',
  },
  showSubText: {
    color: 'white',
    fontSize: responsiveScreenFontSize(2),
    fontFamily: fontConstant.regular,
    alignSelf: 'center',
    textAlign: 'center',
  },
  top20: {
    marginTop: responsiveScreenHeight(3),
  },
  radioView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: responsiveScreenWidth(87),
    marginVertical: responsiveScreenHeight(0.8),
  },
  radioImg: {width: 20, height: 20, justifyContent: 'center'},
  radio: {width: 12, height: 12, alignSelf: 'center'},
  elseImg: {width: 20, height: 20},
  selectText: {
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
  },
  commentModalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(93),
    paddingRight: responsiveScreenWidth(1.5),
    marginTop: 5,
  },
  commentModalText: {
    color: colorConstant.white,
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
    alignSelf: 'flex-start',
    padding: 10,
  },
  downArrow: {
    height: responsiveScreenHeight(3),
    width: responsiveScreenWidth(5),
  },
  inputView: {
    alignSelf: 'center',
    backgroundColor: '#272727',
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(8),
    position: 'absolute',
    bottom: responsiveScreenHeight(-7),
    justifyContent: 'center',
  },
  mr1: {marginRight: responsiveScreenWidth(1)},
  label: {
    color: colorConstant.white,
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
  },
  selectimg: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(5),
    height: responsiveScreenHeight(2),
  },
  descriptionText: {
    fontFamily: fontConstant.medium,
    color: colorConstant.gray,
    fontSize: responsiveScreenFontSize(2.2),
  },
  tagsView: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(2),
    alignItems: 'center',
    width: responsiveScreenWidth(95),
    flexWrap: 'wrap',
  },
  tagsContainer: {
    backgroundColor: '#2C2C2C',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: responsiveScreenHeight(1),
  },
  notFoundView: {
    justifyContent: 'center',
    height: responsiveScreenHeight(100),
    alignSelf: 'center',
  },
  errorView: {
    marginTop: '1%',
    marginLeft: '1%',
    marginBottom: '-2%',
  },
  errorText: {
    color: 'red',
    fontSize: responsiveScreenFontSize(1.7),
    fontFamily: fontConstant.regular,
  },
  sideModalContainer: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(30),
    alignSelf: 'center',
    backgroundColor: colorConstant.black,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: colorConstant.bordercolor,
    borderWidth: 1,
    paddingTop: responsiveScreenHeight(1),
  },
  searchcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchneros: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(93),
    borderRadius: 5,
    marginTop: responsiveScreenHeight(3),
  },
  inputText: {
    fontSize: responsiveScreenFontSize(2),
    fontFamily: fontConstant.medium,
    color: colorConstant.white,
    width: responsiveScreenWidth(80),
  },
  boldText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2.2),
  },
  iconImg: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(8),
    height: responsiveScreenHeight(2.5),
  },
  sideModalView: {
    justifyContent: 'center',
    width: 15,
    height: 30,
    zIndex: 1,
  },
  modalView: {
    position: 'absolute',
    bottom: responsiveScreenHeight(-7),
    alignSelf: 'center',
  },
  modalTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveScreenWidth(5),
    marginHorizontal: responsiveScreenWidth(5),
    marginVertical: responsiveScreenHeight(1),
    width: responsiveScreenWidth(90),
  },
  modalText: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2.3),
  },
  reportTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveScreenWidth(4),
    marginHorizontal: responsiveScreenWidth(5),
    marginVertical: responsiveScreenHeight(1),
    width: responsiveScreenWidth(90),
  },
  reportText: {
    color: 'red',
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2.3),
  },
  reportImg: {width: 27, height: 27},
  hideText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2.3),
    width: '90%',
    marginVertical: responsiveScreenWidth(2),
  },
  reportModalHeaderText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2.3),
    width: '90%',
    marginVertical: responsiveScreenWidth(2),
    marginBottom: responsiveScreenHeight(2),
  },
  subText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2.3),
    marginVertical: responsiveScreenWidth(2),
    marginBottom: responsiveScreenHeight(2),
  },
  w90: {width: '90%'},
  reportModalText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2.3),
    marginVertical: responsiveScreenWidth(2),
    marginBottom: responsiveScreenHeight(2),
  },
  dotImg: {height: 20, alignSelf: 'center', width: 20},
  regularText: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2),
  },
  swiperContainer: {
    height: responsiveScreenHeight(55),
    // alignSelf:'center',alignItems:'center',justifyContent:'center',
  },

  header: {
    marginBottom: responsiveScreenHeight(1),
    height: 60,
  },
  nameText: {
    fontFamily: fontConstant.regular,
    color: colorConstant.white,
    fontSize: responsiveScreenFontSize(2),
  },
  profiledetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(2.5),
  },
  profiledetailsView: {flexDirection: 'row', alignItems: 'center', gap: 10},
  mainimage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenHeight(1.5),
  },
  imageStyle: {
    alignSelf: 'center',
    borderRadius: 18,
  },
  mainImgStyle: {
    alignSelf: 'center',
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(55),
  },
  userImg: {
    resizeMode: 'cover',
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  placeholderImg: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(10),
    borderRadius: responsiveScreenWidth(5),
  },
  relativeView: {
    width: responsiveScreenWidth(95),
    // height: responsiveScreenHeight(55),
    position: 'relative',
  },
  relativeSwiperView: {
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(55),
    position: 'relative',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: responsiveScreenWidth(95),
    position: 'absolute',
    bottom: 0,
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    opacity: 0.8,
  },
  underRowView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'auto',
    alignItems: 'center',
    width: responsiveScreenWidth(30),
  },
  bottomImg: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: responsiveScreenWidth(7),
    height: responsiveScreenHeight(3),
  },
  img: {
    resizeMode: 'cover',
    height: responsiveScreenHeight(20),
    width: responsiveScreenWidth(40),
    borderRadius: 8,
  },
  headerText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Sulphur Point',
    color: colorConstant.black,
    fontWeight: '600',
  },
  btn: {
    backgroundColor: '#C2C1C1',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 31,
  },
  commentItem: {
    flexDirection: 'row',
    marginTop: responsiveScreenHeight(4),
    gap: responsiveScreenWidth(3),
    // height: responsiveScreenHeight(8),
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: responsiveScreenWidth(89),
  },
  profilepic: {
    // backgroundColor: 'green',
    width: 25,
    height: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commenterName: {
    fontSize: 16,
    fontFamily: fontConstant.bold,
    color: colorConstant.white,
    marginBottom: responsiveScreenHeight(0.5),
  },
  commentText: {
    fontFamily: fontConstant.medium,
    color: colorConstant.white,
    marginBottom: responsiveScreenHeight(0.5),
  },
  commentTextContainer: {
    width: responsiveScreenWidth(65),
    paddingBottom: responsiveScreenHeight(2),
  },
  commenterProfileImage: {
    resizeMode: 'contain',
    width: 26,
    height: 26,
    borderRadius: 12.5,
  },
  modalContainer: {
    position: 'absolute',
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(46),
    alignSelf: 'center',
    bottom: responsiveScreenHeight(5),
    backgroundColor: colorConstant.black,
    borderRadius: 5,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 1,
    elevation: 11,
  },
  modalContainerShare: {
    position: 'absolute',
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(60),
    alignSelf: 'center',
    bottom: responsiveScreenHeight(4),
    backgroundColor: colorConstant.black,
    borderRadius: 5,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 1,
    elevation: 11,
  },
  textinputcontainer: {
    backgroundColor: '#5A5A5A',
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: responsiveScreenWidth(2),
    borderRadius: 20,
    // bottom: -30,
    position: 'absolute',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colorConstant.bordercolor,
  },
  input: {
    width: responsiveScreenWidth(78),
    color: 'white',
    paddingHorizontal: responsiveScreenWidth(2),
  },
  listcontainer: {
    height: responsiveScreenHeight(45),
  },
  notFoundText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
  },
  bottomRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    // justifyContent:'space-between',
    width: responsiveScreenWidth(93),
    marginTop: responsiveScreenHeight(1.5),
  },
  bottomProfile: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  commentTextView: {
    marginLeft: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(2),
  },
  dateText: {
    color: colorConstant.lightText,
    marginLeft: responsiveScreenWidth(2.5),
    marginTop: responsiveScreenWidth(2),
    marginBottom: responsiveScreenWidth(2),
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: fontConstant.regular,
  },
  titleText: {
    color: colorConstant.white,
    width: responsiveScreenWidth(95),
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(2),
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: fontConstant.regular,
  },
  placeholderContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    width: responsiveScreenWidth(100),
    gap: responsiveScreenHeight(2),
  },
  placeholderHeader: {
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(7),
    borderRadius: 12,
    backgroundColor: '#E1E9EE',
    marginBottom: responsiveScreenHeight(0.5),
  },
  placeholderImage: {
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(55),
    borderRadius: 12,
    backgroundColor: '#E1E9EE', // Placeholder background color
    // marginRight: 10,
  },

  placeholderText: {
    // flex: 1,
    height: responsiveScreenHeight(10),
    width: responsiveScreenWidth(95),
    borderRadius: 12,
    backgroundColor: '#E1E9EE', // Placeholder background color
  },
});
