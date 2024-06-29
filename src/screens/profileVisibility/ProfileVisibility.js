import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {Text} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import NewHeader from '../../components/NewHeader';
export default function ProfileVisibility(props) {
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NewHeader
        rightImage={false}
        navigation={props.navigation}
        title={'Profile Visibility'}
      />

      <View style={styles.subHeading}>
        <Text style={styles.titleText}>How do you wish to keep your profile?</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text variant="titleMedium" style={styles.titleText}>
          Private profile
        </Text>

        {toggle1 == false ? (
          <TouchableOpacity onPress={() => setToggle1(true)}>
            <Image source={imageConstant.offtoggle} style={styles.img} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setToggle1(false)}>
            <Image source={imageConstant.ontoggle} style={styles.img} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.text}>
        ciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem{' '}
      </Text>

      <View style={styles.rowContainer}>
        <Text variant="titleMedium" style={styles.titleText}>
          Search privacy
        </Text>

        {toggle == false ? (
          <TouchableOpacity onPress={() => setToggle(true)}>
            <Image source={imageConstant.offtoggle} style={styles.img} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setToggle(false)}>
            <Image source={imageConstant.ontoggle} style={styles.img} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.text}>
        ciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem{' '}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.black,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: responsiveScreenWidth(90),
    marginTop: responsiveScreenHeight(2),
    alignItems: 'center',
  },
  titleText: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveFontSize(2.2),
  },
  img: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(12),
  },
  text: {
    color: colorConstant.white,
    fontSize: responsiveFontSize(1.8),
    width: responsiveScreenWidth(80),
    fontFamily: fontConstant.regular,
    margin: responsiveScreenHeight(2.5),
  },
  subHeading:{
    // backgroundColor:'red',
    alignItems:'center',
    marginTop:responsiveScreenHeight(1),
    marginBottom:responsiveScreenHeight(1)
  }
});
