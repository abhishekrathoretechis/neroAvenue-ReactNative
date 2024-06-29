import React, {useState, useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {Text} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import CommonButton from '../../components/CommonButton';
import CommonTextInput from '../../components/CommonTextInput';
import {signupUser} from '../../redux/reducers/authSlice';
import toastShow from '../../utils/Toast';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {
  DEFAULT_MESSAGE,
  VALID_EMAIL,
  VALID_PASSWORD,
} from '../../utils/message';
import apiClient from '../../utils/baseUrl';

const Signup = props => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isCheckedError, setCheckedError] = useState(true);
  const PROFILE_IMAGE_SIZE = 150;
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasswordNew, setConfirmPasswordNew] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordNewError, setConfirmPasswordNewError] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');

  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  var regPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*_\-;()_={}\|[\]<>?"'`~\\/,.:+])[a-zA-Z0-9!@#$%^&*_\-;()_={}\|[\]<>?"'`~\\/,.:+]{8,16}$/; //for all symbol

  const dispatch = useDispatch();
  // Email-Function

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '783815158974-58e48e187tj842oq1dvp59v0bumov28d.apps.googleusercontent.com',
      offlineAccess: false,
      profileImageSize: PROFILE_IMAGE_SIZE,
    });
  }, []);

  const onchangeEmailFunction = text => {
    if (text.length !== 0) {
      if (regEmail.test(text)) {
        setEmail(text);
        setEmailError('');
      } else {
        setEmail(text);
        setEmailError(VALID_EMAIL);
      }
    } else {
      setEmail('');
      setEmailError(DEFAULT_MESSAGE);
    }
  };

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken, user} = await GoogleSignin.signIn();
    console.log('idTokenidToken', idToken);
    const data = {
      idToken: idToken,
    };
    const res = await apiClient.post('user/google-register', data);
    if (res.data === 'true') {
      toastShow(
        'The email id seems to be already registered with us. Please proceed to login',
        'red',
      );
    }
    if (res.status === 200) {
      props.navigation.navigate('SlideScreen', {
        email: res?.data?.data?.email,
        gmail: true,
        idToken: idToken,
      });
    }
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then(data => console.log('Signed in with Google!'));
  };

  // Mobile Number-Function

  const onchangeMobileNumberFunction = text => {
    if (text.length !== 0) {
      // if (regNumber.test(text)) {
      //   setMobileNumber(text); // Concatenate country code
      //   setMobileNumberError('');
      // } else {
      //   setMobileNumber(text);
      //   setMobileNumberError('Please Enter Valid Mobile Number');
      // }
      setMobileNumber(text);
      setMobileNumberError('');
    } else {
      setMobileNumber('');
      setMobileNumberError(DEFAULT_MESSAGE);
    }
  };

  const onchangePasswordFunction = text => {
    if (text.length !== 0) {
      if (regPassword.test(text)) {
        setPassword(text);
        setPasswordError('');
      } else {
        setPassword(text);
        setPasswordError(VALID_PASSWORD);
      }
    } else {
      setPassword('');
      setPasswordError(DEFAULT_MESSAGE);
    }
  };

  // Confirm Password-Function

  const onchangeConfirmPasswordFunction = text => {
    if (text.length !== 0) {
      if (password === text) {
        setConfirmPasswordNew(text);
        setConfirmPasswordNewError('');
      } else {
        setConfirmPasswordNew(text);
        setConfirmPasswordNewError('Confirm password do not match!');
      }
    } else {
      setConfirmPasswordNew('');
      setConfirmPasswordNewError(DEFAULT_MESSAGE);
    }
  };

  const handlePostRequest = () => {
    let newEmail = regEmail.test(email);
    let newPassword = regPassword.test(password);
    // let newNumber = regNumber.test(mobileNumber);
    if (
      newEmail == true &&
      // newNumber == true &&
      mobileNumber &&
      newPassword === true &&
      confirmPasswordNew == password &&
      isChecked == true
    ) {
      const data = {
        email: email,
        mobileNumber: mobileNumber,
        password: password,
      };

      dispatch(signupUser(data)).then(response => {
        if (
          response.meta.requestStatus === 'fulfilled' &&
          response.payload.data === 'true' &&
          response.payload.message ===
            `User with email id (${email}) is already registered!` &&
          response.payload.status == 200
        ) {
          toastShow(
            'The email id seems to be already registered with us. Please proceed to login',
            'red',
          );
          // props.navigation.navigate('Login');
        } else if (
          response.meta.requestStatus === 'fulfilled' &&
          response.payload.data === 'true' &&
          response.payload.message ===
            `User with mobile number (${mobileNumber}) is already registered!` &&
          response.payload.status == 200
        ) {
          toastShow(
            'The phone number seems to be already registered with us. Please proceed to login',
            'red',
          );
          // props.navigation.navigate('Login');
        } else if (
          response.meta.requestStatus === 'fulfilled' &&
          response.payload &&
          response.payload.status == 200 &&
          response.payload.message === 'User Registered Successfully'
        ) {
          props.navigation.navigate('SlideScreen', {
            mobile: mobileNumber,
            email: email,
            password: password,
          });
        }
      });
    } else {
      setEmailError(newEmail ? '' : VALID_EMAIL);
      setMobileNumberError(mobileNumber ? '' : DEFAULT_MESSAGE);
      setPasswordError(newPassword ? '' : DEFAULT_MESSAGE);
      setConfirmPasswordNewError(
        confirmPasswordNew == password ? '' : 'Confirm password do not match!',
      );
      setCheckedError(
        isChecked == true
          ? ''
          : toastShow('Please check the terms and conditions.', 'red'),
      );
    }
  };

  // Function to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle confirm password visibility

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword(!confirmPassword);
  };

  // Function to toggle checkbox state

  const toggleCheckbox = () => {
    setChecked(!isChecked);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}></View>
      <Image source={imageConstant.logo} style={styles.logoImg} />

      <View style={styles.loginView}>
        <Text variant="titleMedium" style={styles.loginText}>
          Sign Up
        </Text>

        <Text variant="bodySmall" style={styles.subLoginText}>
          Create an account to continue!
        </Text>
      </View>

      {/* CommonTextInput component for email */}

      <CommonTextInput
        placeholder={'Enter your email'}
        width={responsiveScreenWidth(90)}
        keyboardType={'email-address'}
        onChangeText={text => onchangeEmailFunction(text)}
        borderColor={colorConstant.bordercolor}
      />

      {emailError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{emailError}</Text>
        </View>
      ) : null}

      <View style={styles.mobileNumberContainer}>
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{
            padding: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
            }}>
            {countryCode}
          </Text>
        </TouchableOpacity>
        <CountryPicker
          show={show}
          onBackdropPress={() => setShow(false)}
          style={{
            modal: {
              flex: 0.43,
              backgroundColor: colorConstant.backgroundBlack,
            },
            countryButtonStyles: {
              backgroundColor: colorConstant.backgroundBlack,
              color: colorConstant.white,
              borderWidth:1,
              borderColor:colorConstant.bordercolor
            },
            // Styles for input [TextInput]
            textInput: {
              backgroundColor: colorConstant.backgroundBlack,
              color: colorConstant.white,
            },
            dialCode: {
              color: colorConstant.white,
            },
            // Country name styles [Text]
            countryName: {
              color: colorConstant.white,
            },
          }}
          pickerButtonOnPress={item => {
            setCountryCode(item.dial_code);
            setShow(false);
          }}
        />

        <TextInput
          placeholder="Enter your mobile number"
          placeholderTextColor={colorConstant.placeholdercolor}
          style={styles.inputText}
          value={mobileNumber}
          onChangeText={text => onchangeMobileNumberFunction(text)}
          keyboardType="phone-pad"
          maxLength={20}
        />
      </View>
      {mobileNumberError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{mobileNumberError}</Text>
        </View>
      ) : null}

      <View style={styles.passwordcontainer}>
        {/* Password input field */}

        <TextInput
          placeholder="Enter your Password"
          placeholderTextColor={colorConstant.placeholdercolor}
          secureTextEntry={!showPassword}
          style={styles.inputText}
          onChangeText={text => onchangePasswordFunction(text)}
          value={password}
          borderColor={colorConstant.bordercolor}
        />

        <TouchableOpacity onPress={togglePasswordVisibility}>
          {/* Toggle password visibility button */}

          <Feather
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color={colorConstant.white}
          />
        </TouchableOpacity>
      </View>

      {passwordError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{passwordError}</Text>
        </View>
      ) : null}

      <View style={styles.passwordcontainer}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={colorConstant.placeholdercolor}
          secureTextEntry={!confirmPassword}
          style={styles.inputText}
          value={confirmPasswordNew}
          onChangeText={text => onchangeConfirmPasswordFunction(text)}
        />

        <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
          <Feather
            name={confirmPassword ? 'eye' : 'eye-off'}
            size={20}
            color={colorConstant.white}
          />
        </TouchableOpacity>
      </View>

      {confirmPasswordNewError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{confirmPasswordNewError}</Text>
        </View>
      ) : null}

      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checked]}
          onPress={toggleCheckbox}>
          {isChecked && <Icon name="check" size={22} color="white" />}
        </TouchableOpacity>

        <View style={styles.innerContainer}>
          <Text style={styles.agreeText}>I agree to </Text>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('TermCondition');
            }}
            activeOpacity={0.8}>
            <Text style={styles.terms}>terms and conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CommonButton
        width={responsiveScreenWidth(90)}
        height={responsiveScreenHeight(6)}
        buttonTitle={'Sign Up'}
        marginTop={responsiveScreenWidth(4)}
        onButtonPress={handlePostRequest}
      />

      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => onGoogleButtonPress()}>
        <Image source={imageConstant.gmail} style={styles.gmailIcon} />

        <Text variant="bodyMedium" style={styles.gmailText}>
          Sign up with Gmail
        </Text>
      </TouchableOpacity>

      <View style={styles.orView}>
        <Text variant="bodySmall" style={styles.orText}>
          OR
        </Text>
      </View>

      <View style={styles.rowContainer}>
        <Text variant="bodyMedium" style={styles.orText}>
          Already have an account?
        </Text>

        <TouchableOpacity
          onPress={() => {
            // Navigate to the login screen

            props.navigation.navigate('Login');
          }}>
          <Text variant="bodyMedium" style={styles.gmailText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.black,
  },

  logoImg: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(40),
    height: responsiveScreenHeight(17),
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(5),
  },
  loginText: {
    color: colorConstant.white,
    fontFamily: fontConstant.medium,

    fontSize: responsiveScreenFontSize(2.4),
  },
  innerContainer: {
    flexDirection: 'row',
  },
  terms: {
    color: 'white',
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(1.8),
    textDecorationLine: 'underline',
  },
  subLoginText: {
    color: colorConstant.lightWhite,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(1.8),
  },
  loginView: {
    marginTop: responsiveScreenWidth(8),
    marginLeft: responsiveScreenWidth(6.5),
    marginBottom: responsiveScreenWidth(5),
  },
  forgetPasswordView: {
    alignSelf: 'flex-end',
    marginRight: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(4),
  },
  forgetPasswordText: {
    color: colorConstant.lightWhite,
  },
  gmailIcon: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(6.5),
    height: responsiveScreenHeight(3),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(10),
    marginBottom: responsiveHeight(3),
  },
  gmailText: {
    marginLeft: responsiveScreenWidth(1),
    color: colorConstant.white,
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(1.8),
  },
  orView: {
    alignSelf: 'center',
    marginTop: responsiveScreenHeight(3),
  },
  orText: {
    color: colorConstant.lightText,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(1.8),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(5),
    gap: 10,
    marginTop: responsiveScreenHeight(2),
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
  passwordcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    width: responsiveScreenWidth(90),
    paddingHorizontal: responsiveScreenWidth(3),
    justifyContent: 'space-between',
    marginTop: responsiveScreenHeight(3),
    borderColor: colorConstant.bordercolor,
    borderRadius: 2,
    borderWidth: 1,
    alignSelf: 'center',
  },
  inputText: {
    fontSize: responsiveScreenFontSize(2),
    fontFamily: fontConstant.regular,
    color: colorConstant.white,
    width: responsiveScreenWidth(75),
    height: 50,
  },
  errorView: {
    marginTop: '1%',
    marginLeft: '5%',
    marginBottom: '-2%',
  },
  errorText: {
    color: 'red',
    fontSize: responsiveScreenFontSize(1.7),
    fontFamily: fontConstant.regular,
  },
  agreeText: {
    color: 'white',
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(1.8),
  },
  countrycodeText: {
    // backgroundColor:'red',
    // width: responsiveScreenWidth(8),
    color: colorConstant.white,
    alignSelf: 'center',
    fontSize: 16,
  },
  mobileNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    width: responsiveScreenWidth(90),
    paddingHorizontal: responsiveScreenWidth(3),
    justifyContent: 'center',
    marginTop: responsiveScreenHeight(3),
    borderColor: colorConstant.bordercolor,
    borderRadius: 2,
    borderWidth: 1,
    alignSelf: 'center',
    height: responsiveScreenHeight(6),
    zIndex: 1000,
  },
});

export default Signup;
