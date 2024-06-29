import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import NewHeader from '../../components/NewHeader';
const NotificationNew = props => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [toggle5, setToggle5] = useState(false);

  return (
    <View style={styles.container}>
     
     <NewHeader rightImage={false} title={'Notification settings'} navigation = {props.navigation} />
    
      <View
        style={{
          marginTop: responsiveScreenHeight(3),
          paddingHorizontal: responsiveScreenWidth(3),
        }}>
        <Text style={styles.headerText}>Push Notifications</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.pushnotifications}>
          <Text style={styles.subText}>Addict</Text>
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
        <View style={styles.pushnotifications}>
          <Text style={styles.subText}>Like</Text>
          {toggle2 == false ? (
            <TouchableOpacity onPress={() => setToggle2(true)}>
              <Image source={imageConstant.offtoggle} style={styles.img} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setToggle2(false)}>
              <Image source={imageConstant.ontoggle} style={styles.img} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.pushnotifications}>
          <Text style={styles.subText}>Comment</Text>
          {toggle3 == false ? (
            <TouchableOpacity onPress={() => setToggle3(true)}>
              <Image source={imageConstant.offtoggle} style={styles.img} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setToggle3(false)}>
              <Image source={imageConstant.ontoggle} style={styles.img} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* <View style={styles.line}></View>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>System & services update</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.pushnotifications}>
          <Text style={styles.subText}>Email Notifications</Text>
          {toggle4 == false ? (
            <TouchableOpacity onPress={() => setToggle4(true)}>
              <Image source={imageConstant.offtoggle} style={styles.img} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setToggle4(false)}>
              <Image source={imageConstant.ontoggle} style={styles.img} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.pushnotifications}>
          <Text style={styles.subText}>Feedbacks and Surveys</Text>
          {toggle5 == false ? (
            <TouchableOpacity onPress={() => setToggle5(true)}>
              <Image source={imageConstant.offtoggle} style={styles.img} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setToggle5(false)}>
              <Image source={imageConstant.ontoggle} style={styles.img} />
            </TouchableOpacity>
          )}
        </View>
      </View> */}
    </View>
  );
};
export default NotificationNew;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstant.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveScreenWidth(100),
    gap: responsiveScreenWidth(13),
    // backgroundColor: '#121212',
    height: responsiveScreenHeight(7),
  },
  pushnotifications: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveScreenHeight(0.5),
    // height: responsiveScreenHeight(5),
  },
  img: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(12),
  },
  subText: {
    color: colorConstant.white,
    fontSize: responsiveFontSize(2),
    fontFamily: fontConstant.light,
  },
  mainContainer: {
    marginTop: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(3),
  },
  headerText: {
    color: colorConstant.white,
    fontSize: responsiveFontSize(2.3),
    fontFamily: fontConstant.medium,
  },
  line: {
    height: responsiveScreenHeight(0.2),
    backgroundColor: '#434343',
    width: responsiveScreenWidth(100),
    marginTop: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(2),
  },
});
