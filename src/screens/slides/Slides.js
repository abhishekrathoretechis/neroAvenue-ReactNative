import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Text} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';

const slides = [
  {
    key: 'one',
    title: '',
    belowtitle: 'Welcome to the Heartbeat of Creativity',
    text: '',
    neroText: 'NERO avenue',
    remeningText:
      ', a captivating platform for those who embrace the allure of the color black ',
    neroText2: '(NERO)',
    remeningText2:
      ', celebrating its rich tapestry in culture, art, and lifestyle. Dive into a mosaic of inspiration, where every image and article tells a story of resilience, creativity, and the vibrant essence of the stylish ',
    neroText3: 'NERO',
    remeningText3: ' experience.',
    image: imageConstant.screentwo,
    backgroundColor: colorConstant.black,
    imageHeight: responsiveScreenHeight(45),
    newKey: false,
  },
  {
    key: 'two',
    belowtitle: 'Embrace the Spectrum',
    text: 'Unleash your creativity on ',

    neroText: 'NERO Avenue',
    remeningText:
      ' as you curate a unique gallery that reflects your style and passions.Take the reins of storytelling by creating your own magazine, where every page is a canvas for your stories, insights, and inspirations.',
    image: imageConstant.screenthree,
    backgroundColor: colorConstant.black,
    imageHeight: responsiveScreenHeight(60),
    newKey: true,
  },
  {
    key: 'three',

    belowtitle: 'Join the Celebration',
    text: 'Join us now, and let your voice resonate in a community where creativity knows no bounds and the addicition for ',
    neroText: 'NERO',
    remeningText: ' takes the center stage.',
    image: imageConstant.nero3,
    backgroundColor: colorConstant.black,
    imageHeight: responsiveScreenHeight(64),
    newKey: true,
  },
];

function Slides(props) {
  const navigation = useNavigation(); // Get navigation object using useNavigation hook
  const [showRealApp, setShowRealApp] = useState(false);

  const _renderItem = ({item}) => {
    if (item.newKey == true) {
      return (
        <View style={styles.slide}>
          {/* <View style={{height: responsiveScreenHeight(8)}} /> */}
          {/* <Text style={styles.title}>{item.title}</Text> */}
          <Image
            source={item.image}
            style={{
              height: item.imageHeight,
              width: responsiveScreenWidth(100),
            }}
          />
          <Text style={styles.belowtitle}>{item.belowtitle}</Text>
          <Text style={styles.text}>
            {item.text}
            <Text style={styles.boldtext}>{item.neroText}</Text>
            <Text style={styles.text}>{item.remeningText}</Text>
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.slide}>
          <View
            style={{
              backgroundColor: 'white',
              height: responsiveScreenHeight(53),
            }}>
            <Image source={item.image} style={styles.imagestyle} />
          </View>

          <View style={{paddingHorizontal: responsiveScreenWidth(2)}}>
            <Text
              style={[
                styles.belowtitle,
                {marginTop: responsiveScreenHeight(4)},
              ]}>
              {item.belowtitle}
            </Text>
          </View>
          <Text style={styles.boldtext}>
            {item.neroText}

            <Text style={styles.text}>{item.remeningText}</Text>
            <Text style={styles.boldtext}>{item.neroText2}</Text>
            <Text style={styles.text}>{item.remeningText2}</Text>
            <Text style={styles.boldtext}>{item.neroText3}</Text>
            <Text style={styles.text}>{item.remeningText3}</Text>
          </Text>
        </View>
      );
    }
  };

  const _onDone = () => {
    props.navigation.navigate('Login');
  };
  const _onSkip = () => {
    props.navigation.navigate('Login');
  };
  const _renderNextButton = () => {
    return <Image source={imageConstant.next} style={styles.nextImg} />;
  };
  const _renderDoneButton = () => {
    return <Image source={imageConstant.next} style={styles.nextImg} />;
  };
  const _renderSkipButton = () => {
    return <Text style={styles.skip}>Skip</Text>;
  };
  useEffect(() => {
    if (showRealApp) {
      navigation.navigate('Login');
    }
  }, [showRealApp, navigation]);

  return showRealApp ? null : (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      onDone={_onDone}
      onSkip={_onSkip}
      dotStyle={styles.inactiveDot}
      activeDotStyle={styles.activeDot}
      showSkipButton={true}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 14,
    fontFamily: fontConstant.bold,
    marginBottom: responsiveScreenHeight(2),
    color: colorConstant.white,
    marginTop: responsiveScreenHeight(5),
    marginHorizontal: 2,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    width: responsiveScreenWidth(90),
    marginTop: responsiveScreenHeight(3),
  },
  boldtext: {
    fontSize: 14,
    textAlign: 'center',
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    width: responsiveScreenWidth(90),
    marginTop: responsiveScreenHeight(3),
  },
  belowtitle: {
    fontSize: 20,
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    marginTop: responsiveScreenHeight(3),
    textAlign: 'center',
  },
  inactiveDot: {
    backgroundColor: colorConstant.gray,

    marginTop: responsiveScreenHeight(-5),
  },
  activeDot: {
    backgroundColor: colorConstant.white,

    marginTop: responsiveScreenHeight(-5),
  },
  skip: {
    color: colorConstant.gray,
    fontFamily: fontConstant.bold,
    fontSize: responsiveFontSize(2.3),
    marginTop: responsiveScreenHeight(1),
  },
  button: {
    width: responsiveScreenWidth(20),
    height: responsiveScreenHeight(4),
    backgroundColor: colorConstant.white,
    borderRadius: 3,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: colorConstant.black,
    alignSelf: 'center',
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(1.8),
  },
  img: {
    height: responsiveScreenHeight(55),
    width: responsiveScreenWidth(100),
  },
  nextImg: {
    width: responsiveScreenWidth(25),
    height: responsiveScreenHeight(5),
    borderRadius: 5,
  },
  imagestyle: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(47),
    resizeMode: 'cover',
  },
});

export default Slides;
