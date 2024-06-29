import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import CommonButton from '../../components/CommonButton';
import CommonTextInput from '../../components/CommonTextInput';
import AuthContext from '../../context/authContext';
import {loginUser} from '../../redux/reducers/authSlice';
import {colorConstant, imageConstant} from '../../utils/constant';
import {DEFAULT_MESSAGE, VALID_EMAIL, VALID_PASSWORD} from '../../utils/message';
import apiClient from '../../utils/baseUrl';
import authStorage from '../../utils/authStorage';
import LoaderScreen from '../../utils/Loader';
import styles from './Styles';
const PROFILE_IMAGE_SIZE = 150;

const Login = props => {
  const {setAuthToken} = useContext(AuthContext);
  const dispatch = useDispatch();
  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  var regPassword =
  /^(?=.*[0-9])(?=.*[!@#$%^&*_\-;()_={}\|[\]<>?"'`~\\/,.:+])[a-zA-Z0-9!@#$%^&*_\-;()_={}\|[\]<>?"'`~\\/,.:+]{8,16}$/; //for all symbol

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '783815158974-58e48e187tj842oq1dvp59v0bumov28d.apps.googleusercontent.com',
      offlineAccess: false,
      profileImageSize: PROFILE_IMAGE_SIZE,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setUsername(props?.route?.params?.email);
      setPassword(props?.route?.params?.password);
    });
    return unsubscribe;
  }, [props.navigation]);

  const onGoogleButtonPress = async() => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken, user } = await GoogleSignin.signIn();

  console.log("idTokenidToken", idToken);
  const data = {
    idToken: idToken
  }
  setLoading(true);
  const res = await apiClient.post("user/google-login", data);
   if (res.status === 200) {
    setAuthToken(res?.data.accessToken);
    await authStorage.storeToken(res?.data.accessToken);
    setLoading(false);
  } else {
    setLoading(false);
    toastShow('Invalid username and password', 'red');
  }
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
     auth().signInWithCredential(googleCredential).then((data) => console.log('Signed in with Google!'));
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Email onChange
  const onchangeEmailFunction = text => {
    if (text.length !== 0) {
      if (regEmail.test(text)) {
        setUsername(text);
        setUsernameError('');
      } else {
        setUsername(text);
        setUsernameError('Please enter valid email address');
      }
    } else {
      setUsername('');
      setUsernameError(DEFAULT_MESSAGE);
    }
  };

  // Password onChange
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
  // Login Button Handle

  const handlePostRequest = async () => {
    let newEmail = regEmail.test(username);
    let newPassword = regPassword.test(password);
    if (newEmail == true && newPassword == true) {
      const loginData = {
        username: username,
        password: password,
      };
      const originalPromiseResult = await dispatch(
        loginUser(loginData),
      ).unwrap();
      setAuthToken(originalPromiseResult?.accessToken);
     
    } else {
      setUsernameError(newEmail ? '' : VALID_EMAIL);
      setPasswordError(
        newPassword ? '' : VALID_PASSWORD,
      );
    }
  };

  return (
    <>
      <LoaderScreen data={loading} />
    <ScrollView style={styles.mainContainer}>
      <Image source={imageConstant.logo} style={styles.logoImg} />
      <View style={styles.loginView}>
        <Text variant="titleMedium" style={styles.loginText}>
          Log In
        </Text>
        <Text variant="bodySmall" style={styles.subLoginText}>
          Log in to contiune!
        </Text>
      </View>
      <View>
        <View>
          <CommonTextInput
            placeholder={'Enter Your Email'}
            width={responsiveScreenWidth(90)}
            onChangeText={text => onchangeEmailFunction(text)}
            value={username}
            borderColor={colorConstant.bordercolor}
          />
          {usernameError ? (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{usernameError}</Text>
            </View>
          ) : null}
        </View>
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
      </View>
      <TouchableOpacity
        style={styles.forgetPasswordView}
        onPress={() => props.navigation.navigate('ForgetPassword')}>
        <Text variant="bodyMedium" style={styles.forgetPasswordText}>
          Forgot password?
        </Text>
      </TouchableOpacity>

      <CommonButton
        width={responsiveScreenWidth(90)}
        height={responsiveScreenHeight(6)}
        buttonTitle={'Log in'}
        marginTop={responsiveScreenWidth(12)}
        onButtonPress={handlePostRequest}
      />
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => onGoogleButtonPress()}>
        <Image source={imageConstant.gmail} style={styles.gmailIcon} />
        <Text variant="bodyMedium" style={styles.gmailText}>
          Log in with Gmail
        </Text>
      </TouchableOpacity>

      <View style={styles.orView}>
        <Text variant="bodySmall" style={styles.orText}>
          OR
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text variant="bodyMedium" style={styles.orText}>
          Don't have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Signup');
          }}>
          <Text variant="bodyMedium" style={styles.gmailText}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </ >
  );
};
export default Login;
