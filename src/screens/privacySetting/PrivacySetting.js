import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import NewHeader from '../../components/NewHeader';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export default function PrivacySetting(props) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NewHeader
        rightImage={false}
        navigation={props.navigation}
        title={'Privacy Settings'}
      />

      <View style={styles.mainView}>
        <TouchableOpacity
          style={styles.rowUnderContainer}
          onPress={() => props.navigation.navigate('ForgetChangePassword')}>
          <Text style={styles.bodyText}>Change password</Text>
          <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rowUnderContainer}
          onPress={() => props.navigation.navigate('ProfileVisibility')}>
          <Text style={styles.bodyText}>Profile visibility</Text>
          <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: responsiveFontSize(2),
    color: colorConstant.white,
  },
  arrowImg: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(5),
    height: responsiveScreenHeight(2),
  },
});
