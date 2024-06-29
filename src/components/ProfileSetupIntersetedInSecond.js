import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../utils/constant';
import { responsiveFontSize,responsiveScreenWidth,responsiveScreenHeight,responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import CommonTextInput from './CommonTextInput';
import Modal from 'react-native-modal'; // Import the Modal component
import { DEFAULT_MESSAGE, VALID_URL } from '../utils/message';

const ProfileSetupIntersetedInSecond = ({
  behanceurl,
  setBehanceurl,
  behanceurlError,
  setBehanceurlError,
  instagramurl,
  setIntstagramurl,
  instagramurlError,
  setIntstagramurlError,
  pinteresturl,
  setPinteresturl,
  pinteresturlError,
  setPinteresturlError,
  handleBackScroll
}) => {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
  var urlRegs = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleCheckbox1 = () => {
    setChecked1(!isChecked1);

    if (!isChecked1) {
      toggleModal();
    }
  };

  const toggleCheckbox2 = () => {
    setChecked2(!isChecked2);
  };

  const toggleCheckbox3 = () => {
    setChecked3(!isChecked3);
  };
  const onChnagePinterest = (text) =>{
    if (text.length !== 0) {
      if (urlRegs.test(text)) {
        setPinteresturl(text);
        setPinteresturlError('');
      } else {
        setPinteresturl(text);
        setPinteresturlError(VALID_URL);
      }
    } else {
      setPinteresturl('');
      
    }
  }
  const onChnageInstagram = (text) =>{
    if (text.length !== 0) {
      if (urlRegs.test(text)) {
        setIntstagramurl(text);
        setIntstagramurlError('');
      } else {
        setIntstagramurl(text);
        setIntstagramurlError(VALID_URL);
      }
    } else {
      setIntstagramurl('');
     
    }
  }

  const onChnageBehance = (text) =>{
    if (text.length !== 0) {
      if (urlRegs.test(text)) {
        setBehanceurl(text);
        setBehanceurlError('');
      } else {
        setBehanceurl(text);
        setBehanceurlError(VALID_URL);
      }
    } else {
      setBehanceurl('');
     
    }
  }
  return (
    <View style={styles.container}>
     <View style={styles.header}>
           <TouchableOpacity onPress={handleBackScroll}>
            <Image source={imageConstant.whitearrow} style={styles.img1}/>
           </TouchableOpacity>
           <Text style={styles.headerText}>
            Connect your social media account
           </Text>
        </View>
      <View style={styles.textcontainer}>
        <Text style={styles.headerText}>
          Simple select the platform of your choice, enter your handle name and
          connect.
        </Text>
      </View>

      <View style={styles.iconcontainer}>
        <View style={styles.iconcontainerone}>
          <TouchableOpacity
            onPress={toggleCheckbox1}>
            <Image
              source={
                isChecked1 == false
                  ? imageConstant.checkbox
                  : imageConstant.whitetick
              }
              style={styles.img}
            />
          </TouchableOpacity>

          <Image source={imageConstant.pinterest} />
        </View>

        <View style={styles.iconcontainerone}>
          <TouchableOpacity
            onPress={toggleCheckbox2}>
            <Image
              source={
                isChecked2 == false
                  ? imageConstant.checkbox
                  : imageConstant.whitetick
              }
              style={styles.img}
            />
          </TouchableOpacity>

          <Image source={imageConstant.behance} />
        </View>

        <View style={styles.iconcontainerone}>
          <TouchableOpacity
            onPress={toggleCheckbox3}>
            <Image
              source={
                isChecked3 == false
                  ? imageConstant.checkbox
                  : imageConstant.whitetick
              }
              style={styles.img}
            />
          </TouchableOpacity>

          <Image source={imageConstant.instagram} />
        </View>
      </View>

      <View style={styles.inputcontainer}>
        {isChecked1 == false ? null : (
          <View>
          <CommonTextInput
            placeholder={'Pinterest id'}
            width={responsiveScreenWidth(90)}
            onChangeText={text => onChnagePinterest(text)}
            value={pinteresturl}
            borderColor={colorConstant.bordercolor}
          />
          {pinteresturlError ? (
            <View style={[styles.errorView, {marginBottom: 2}]}>
              <Text style={styles.errorText}>{pinteresturlError}</Text>
            </View>
          ) : null}
          </View>
        )}
        {isChecked2 == false ? null : (
          <View>
          <CommonTextInput
            placeholder={'Behance id'}
            width={responsiveScreenWidth(90)}
            onChangeText={text => onChnageBehance(text)}
            value={behanceurl}
            borderColor={colorConstant.bordercolor}
          />
           {behanceurlError ? (
            <View style={[styles.errorView, {marginBottom: 2}]}>
              <Text style={styles.errorText}>{behanceurlError}</Text>
            </View>
          ) : null}
          </View>
        )}
        {isChecked3 == false ? null : (
          <View>
          <CommonTextInput
            placeholder={'Instagram Id'}
            width={responsiveScreenWidth(90)}
            onChangeText={text => onChnageInstagram(text)}
            value={instagramurl}
            borderColor={colorConstant.bordercolor}
          />
          {instagramurlError ? (
            <View style={[styles.errorView, {marginBottom: 2}]}>
              <Text style={styles.errorText}>{instagramurlError}</Text>
            </View>
          ) : null}
          </View>
        )}
      </View>

      {/* <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        backdropColor={colorConstant.backDropColor} // Customize backdrop color
        backdropOpacity={0.25}>
        <View style={styles.modalContainer}>
          <Image source={imageConstant.success} />
        </View>
      </Modal> */}
    </View>
  );
};

export default ProfileSetupIntersetedInSecond;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorConstant.black,
    flex: 1,
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
  header: {
    backgroundColor:colorConstant.backgroundBlack,
    alignItems:'center',
    flexDirection:'row',
    gap:responsiveScreenWidth(0),
    height:responsiveScreenHeight(7.5),
  },
  textcontainer: {
    marginTop: responsiveScreenHeight(7),
    marginBottom: responsiveScreenHeight(5),
    width: responsiveScreenWidth(95),
    alignSelf: 'center',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'black',
  },

  checked: {
    backgroundColor: 'black',
  },

  iconcontainerone: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconcontainer: {
    flexDirection: 'row',
    marginTop: responsiveScreenWidth(5),
    gap: responsiveScreenWidth(3),
    justifyContent: 'center',
  },

  inputcontainer: {
    marginTop: responsiveScreenHeight(4),
  },

  

  modalContainer: {
    marginTop: responsiveScreenHeight(55),
    alignSelf: 'center',
  },
  img: {
    resizeMode: 'contain',
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(8),
    marginLeft: responsiveScreenWidth(2),
  },
  headerText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.3),
    fontFamily:fontConstant.medium
  
  },
  modalButtonText: {
    color: colorConstant.white,
  },
  img: {width: 30, height: 30},
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
    
   
  }
});
