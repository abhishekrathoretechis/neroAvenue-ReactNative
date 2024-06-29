import {StyleSheet} from 'react-native'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { colorConstant, fontConstant } from '../../utils/constant'
export default StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: responsiveScreenWidth(70),
        marginTop: responsiveScreenHeight(2),
      },
      headerText: {
        fontFamily: fontConstant.medium,
        fontSize: responsiveScreenFontSize(2.3),
        color: colorConstant.white,
      },
      cancelImg: {
        resizeMode: 'contain',
        width: responsiveScreenWidth(10),
        height: responsiveScreenHeight(4),
      },
      mainView: {
        backgroundColor: colorConstant.backgroundBlack,
        width: responsiveScreenWidth(73),
        alignSelf: 'center',
        marginTop: responsiveScreenHeight(3),
        borderRadius: 8,
      },
      rowUnderContainer: {
        width: responsiveScreenWidth(70),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        padding: 10,
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
})