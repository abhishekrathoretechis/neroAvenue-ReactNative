import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonHeader from './CommonHeader';
import {colorConstant, fontConstant, imageConstant} from '../utils/constant';
import {Text} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import CommonTextInput from './CommonTextInput';
import ImagePicker from 'react-native-image-crop-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_MESSAGE, VALID_URL } from '../utils/message';
export default function ProfileSetupSecond({
  website,
  setWebsite,
  about,
  setAbout,
  aboutError,
  setAboutError,
  websiteError,
  setWebsiteError,
  image,
  setImage,
  imageError,
  setImageError,
  handleBackScroll
}) {
  const [modalVisible, setModalVisible] = useState(false);
  var urlRegs = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

  const galleryCall = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        if (image.path !== '') {
          setImage(image.path);
          setImageError('');
          setModalVisible(false);
        } else {
          setImage('');
          setImageError(DEFAULT_MESSAGE);
          setModalVisible(false);
        }
        console.log(image.path);
      });
    } catch (error) {}
  };
  const cameraCall = () => {
    try {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        if (image.path !== '') {
          setImage(image.path);
          setImageError('');
          setModalVisible(false);
        } else {
          setImage('');
          setImageError(DEFAULT_MESSAGE);
          setModalVisible(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleAbout = text => {
    if (text.length !== 0) {
      setAbout(text);
      setAboutError('');
    } else {
      setAbout('');
      setAboutError(DEFAULT_MESSAGE);
    }
  };
  const onHandleWebsite = text => {
    if (text.length !== 0) {
      if(urlRegs.test(text)){
        setWebsite(text);
        setWebsiteError('');
        
      }else{
        setWebsite(text);
        setWebsiteError(VALID_URL);
      }
     
    } else {
      setWebsite('');
      setWebsiteError('');
    }
  };
  return (
    <View>
      <ScrollView>
        {/* <CommonHeader headerTitle={'Profile set up'} backImg={imageConstant.whitearrow} back = {true} /> */}
        <View style={styles.header}>
           <TouchableOpacity onPress={handleBackScroll}>
            <Image source={imageConstant.whitearrow} style={styles.img1}/>
           </TouchableOpacity>
           <Text style={styles.headerText}>
            Profile Set up
           </Text>
        </View>
       
        <Text variant="headlineMedium" style={styles.titleText}>
          Image and bio
        </Text>
        <Text variant="bodyMedium" style={styles.bodyText}>
          {image ? '' : 'Add your image'}
        </Text>
        <TouchableOpacity
          style={{
            width: responsiveScreenWidth(37),
            height: responsiveScreenHeight(17),
            alignSelf: 'center',
          }}
          onPress={() => setModalVisible(true)}>
          {image !== '' ? (
            <Image source={{uri: image}} style={styles.profileImg} />
          ) : (
            <ImageBackground
              style={styles.imageContainer}
              source={imageConstant.round}>
              <Image source={imageConstant.camera} style={styles.img} />
            </ImageBackground>
          )}
        </TouchableOpacity>

        {imageError ? (
          <View style={[styles.errorView, {alignSelf: 'center'}]}>
            <Text style={styles.errorText}>Please upload the image</Text>
          </View>
        ) : null}
        <CommonTextInput
          placeholder={'About'}
          width={responsiveScreenWidth(90)}
          height={responsiveScreenHeight(17)}
          marginTop={responsiveScreenHeight(1.5)}
          onChangeText={text => onHandleAbout(text)}
          value={about}
          multiline={true}
          textAlignVertical={'top'}
        />
        {aboutError ? (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>{aboutError}</Text>
          </View>
        ) : null}
        <CommonTextInput
          placeholder={'Website'}
          width={responsiveScreenWidth(90)}
          onChangeText={text => onHandleWebsite(text)}
          value={website}
        />
        {websiteError ? (
          <View style={[styles.errorView, {marginBottom: 2}]}>
            <Text style={styles.errorText}>{websiteError}</Text>
          </View>
        ) : null}
        <Modal
          animationIn="slideInDown"
          animationOut="slideOutDown"
          animationInTiming={1000}
          animationOutTiming={1000}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          swipeDirection="down"
          visible={modalVisible}>
          <View style={styles.modalContainer}>
            <Text variant="titleMedium" style={styles.profileText}>
              Profile Photo
            </Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={{width: responsiveScreenWidth(20), alignItems: 'center'}}
                onPress={cameraCall}>
                <EvilIcons
                  name={'camera'}
                  size={40}
                  color={colorConstant.white}></EvilIcons>
                <Text variant="bodyMedium" style={{color: colorConstant.white}}>
                  Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: responsiveScreenWidth(20), alignItems: 'center'}}
                onPress={galleryCall}>
                <FontAwesome
                  name={'photo'}
                  size={28}
                  color={colorConstant.white}></FontAwesome>
                <Text variant="bodyMedium" style={{color: colorConstant.white}}>
                  Gallery
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  titleText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontSize: responsiveFontSize(3),
    marginTop: responsiveScreenHeight(3),
    fontFamily: fontConstant.medium,
  },
  errorView: {
    marginTop: '1%',
    marginLeft: '5%',
    marginBottom: '-2%',
  },
  errorText: {
    color: 'red',
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: fontConstant.regular,
  },
  bodyText: {
    color: colorConstant.lightWhite,
    alignSelf: 'center',
    fontSize: responsiveFontSize(2),
    fontFamily: fontConstant.regular,
  },
  imageContainer: {
    width: responsiveScreenWidth(33),
    height: responsiveScreenHeight(15),
    alignSelf: 'center',
    marginTop: responsiveScreenHeight(2),
    justifyContent: 'center',
  },
  img: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(11),
    height: responsiveScreenHeight(8),
    alignSelf: 'center',
  },
  modalContainer: {
    backgroundColor: '#403735',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    bottom: -10,
    position: 'absolute',
    height: responsiveScreenHeight(20),
    width: responsiveScreenWidth(100),
    borderRadius: 8,
    alignSelf: 'center',
  },
  mainModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  profileText: {
    color: colorConstant.white,
    width: responsiveScreenWidth(90),
    marginTop: responsiveScreenHeight(2),
  },
  rowContainer: {
    flexDirection: 'row',
    // alignItems:'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(70),
    marginTop: responsiveScreenHeight(2),
  },
  profileImg: {
    alignSelf: 'center',

    width: responsiveScreenWidth(37),
    height: responsiveScreenHeight(17),
    borderRadius: 80,
  },
   headerText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.3),
    fontFamily:fontConstant.medium
  },
  img1: {
    // resizeMode: 'contain',
    // height: responsiveScreenHeight(4),
    // width: responsiveScreenWidth(8),
    // marginLeft: responsiveScreenWidth(2),
    resizeMode: 'contain',
    height: 70,
    width: 80,
    marginLeft: -10,
    marginBottom: -10,
    
   
  },
  header: {
    backgroundColor:colorConstant.backgroundBlack,
    alignItems:'center',
    flexDirection:'row',
    gap:responsiveScreenWidth(20),
    height:responsiveScreenHeight(7.5),
  }
});
