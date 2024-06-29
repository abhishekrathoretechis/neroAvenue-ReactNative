import { Image, ImageBackground, SafeAreaView, StyleSheet,  } from 'react-native'
import React, { useEffect } from 'react'
import { colorConstant, imageConstant } from '../../utils/constant'
import {
  responsiveScreenHeight,
  responsiveScreenWidth
} from "react-native-responsive-dimensions";

export default function Splash({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      goToNextPage();
    });
    return unsubscribe;
  }, [navigation]);

  const goToNextPage = () => {
    setTimeout(() => {
      navigation.navigate("Slides")
    }, 2000);
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Background image */}
      <ImageBackground source={imageConstant.background} style={styles.backgroundImg}>
        {/* Logo image */}
        <Image source={imageConstant.logo} style={styles.logoImg} />
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.black,
  },
  backgroundImg: {
    flex: 1,
    justifyContent: 'center',
  },
  logoImg: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(40),
    height: responsiveScreenHeight(17),
    alignSelf: 'center',
  }
})
