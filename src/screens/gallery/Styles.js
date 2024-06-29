import {StyleSheet} from 'react-native';
import {
    responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, fontConstant} from '../../utils/constant';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  renderUpperTouch: {
    justifyContent: 'center',
    elevation: 4,

    shadowOpacity: 0.9,
    shadowRadius: 4,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    height: responsiveScreenHeight(11.5),
    width: responsiveScreenWidth(33),
    gap: 10,
    marginHorizontal: responsiveScreenWidth(2),
  },
  headerText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(3.2),
    marginHorizontal: 15,
    marginBottom: 15,
  },
  upperImg: {
    resizeMode: 'cover',
    height: responsiveScreenHeight(10),
    width: responsiveScreenWidth(30),
    alignSelf: 'center',
    borderRadius: 12,
  },
  upperTitleText: {
    color: colorConstant.grey1,
    alignSelf: 'center',
    marginTop: 1,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(1.8),
  },
  firstIndexImg: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(30),
    marginTop: 20,
  },
  otherImg: {
    width: responsiveScreenWidth(45),
    height: responsiveScreenHeight(23),
    alignSelf: 'center',
  },
  longImg: {
    width: responsiveScreenWidth(50),
    height: responsiveScreenHeight(46),
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  postImg: {
    height: responsiveScreenHeight(29.2),
    width: responsiveScreenWidth(47),
    alignSelf: 'center',
    borderRadius: 12,
  },
  mainView: {
    width: responsiveScreenWidth(47.5),
    marginTop: responsiveScreenHeight(1.5),
    borderWidth: 0.8,
    borderColor: colorConstant.lightWhite,
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
  placeholderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
  },
  placeholderImage: {
    width: responsiveScreenWidth(47),
    height: responsiveScreenHeight(30),
    borderRadius: 12,
    backgroundColor: '#E1E9EE',
    marginRight: 10,
  },
  placeholderText: {
    flex: 1,
    height: responsiveScreenHeight(30),
    borderRadius: 12,
    backgroundColor: '#E1E9EE',
  },
  touchMapView: {
    width: responsiveScreenWidth(47.6),
    marginTop: responsiveScreenHeight(1.5),
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: responsiveScreenHeight(0.4),
  },
});
