import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';

export default function Publish(props) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.crossTouch}
          onPress={() => props.navigation.goBack()}>
          <Image source={imageConstant.cross} style={styles.crossImg} />
        </TouchableOpacity>
        <Text style={styles.publishText}>Publish</Text>
      </View>

      <View style={styles.rowContainerTab}>
        <TouchableOpacity
          style={styles.touchtab}
          onPress={() => props.navigation.navigate('PublishPost')}>
          <Text style={styles.text}>NERO Gallery</Text>
          <Image source={imageConstant.publishgallery} style={styles.img} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchtab}
          onPress={() => props.navigation.navigate('MagzPublish')}>
          <Text style={styles.text}>NERO Magz</Text>

          <Image source={imageConstant.publishmagz} style={styles.img} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colorConstant.black,
    flex: 1,
    justifyContent: 'center',
  },
  publishText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2.5),
    width: '60%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(90),
    backgroundColor: colorConstant.backgroundBlack,
    paddingVertical: responsiveScreenHeight(1),
    borderRadius: 8,
  },
  crossTouch: {
    width: responsiveScreenWidth(10),
    height: responsiveScreenHeight(3.5),
    justifyContent: 'center',
  },
  crossImg: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 25,
    height: 25,
  },
  text: {
    color: colorConstant.lightText,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2),
    alignSelf: 'center',
  },
  img: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 60,
    height: 60,
  },
  touchtab: {
    backgroundColor: colorConstant.backgroundBlack,
    width: responsiveScreenWidth(43),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    paddingVertical: 10,
  },
  rowContainerTab: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(90),
    paddingVertical: responsiveScreenHeight(1),
    borderRadius: 8,
  },
});
