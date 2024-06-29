import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import CommonButton from '../../components/CommonButton';
import CommonTextInput from '../../components/CommonTextInput';
import NewHeader from '../../components/NewHeader';
import {changePassword} from '../../redux/reducers/authSlice';
import {colorConstant} from '../../utils/constant';
import {DEFAULT_MESSAGE, VALID_PASSWORD} from '../../utils/message';
import styles from './Styles';
export default function ForgetChangePassword(props) {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setPasswordConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  var regPassword =
  /^(?=.*[0-9])(?=.*[!@#$%^&*_\-;()_={}\|[\]<>?"'`~\\/,.:+])[a-zA-Z0-9!@#$%^&*_\-;()_={}\|[\]<>?"'`~\\/,.:+]{8,16}$/; //for all symbol


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setPasswordConfirm(!showPasswordConfirm);
  };
  //conchnage current password
  const onChnageCurrentPassword = text => {
    if (text.length !== 0) {
      if (regPassword.test(text)) {
        setCurrentPassword(text);
        setCurrentPasswordError('');
      } else {
        setCurrentPassword(text);
        setCurrentPasswordError(VALID_PASSWORD);
      }
    } else {
      setCurrentPassword('');
      setCurrentPasswordError(DEFAULT_MESSAGE);
    }
  };
  // onChnageNew password
  const onChnageNewPassword = text => {
    if (text.length !== 0) {
      if (regPassword.test(text)) {
        setNewPassword(text);
        setNewPasswordError('');
      } else {
        setNewPassword(text);
        setNewPasswordError(VALID_PASSWORD);
      }
    } else {
      setNewPassword('');
      setNewPasswordError(DEFAULT_MESSAGE);
    }
  };

  // Confirm Password-Function

  const onChangeConfirmPassword = text => {
    if (text.length !== 0) {
      if (newPassword === text) {
        setConfirmPassword(text);
        setConfirmPasswordError('');
      } else {
        setConfirmPassword(text);
        setConfirmPasswordError('Confirm password do not match!');
      }
    } else {
      setConfirmPassword('');
      setConfirmPasswordError(DEFAULT_MESSAGE);
    }
  };

  //  api call
  const handleOnChangePassword = () => {
    let newCurrentPassword = regPassword.test(currentPassword);
    let newNewPassword = regPassword.test(newPassword);

    if (
      newCurrentPassword === true &&
      newNewPassword === true &&
      confirmPassword === newPassword
    ) {
      const data = {
        oldPassword: currentPassword,
        newPassword: newPassword,
      };
      dispatch(changePassword(data)).then(response => {
        if (response?.payload && response?.payload?.status === 406) {
          props.navigation.goBack();
        }
      });
    } else {
      setCurrentPasswordError(newCurrentPassword ? '' : DEFAULT_MESSAGE);
      setNewPasswordError(newNewPassword ? '' : DEFAULT_MESSAGE);
      setConfirmPasswordError(
        confirmPassword == newPassword ? '' : 'Confirm password do not match!',
      );
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NewHeader
        rightImage={false}
        navigation={props.navigation}
        title={'Change Password'}
      />

      <CommonTextInput
        placeholder={'Current password'}
        width={responsiveScreenWidth(90)}
        onChangeText={text => onChnageCurrentPassword(text)}
        value={currentPassword}
        borderColor={colorConstant.bordercolor}
      />

      {currentPasswordError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{currentPasswordError}</Text>
        </View>
      ) : null}
      <View style={styles.passwordcontainer}>
        {/* Password input field */}

        <TextInput
          placeholder="New password"
          placeholderTextColor={colorConstant.placeholdercolor}
          secureTextEntry={!showPassword}
          style={styles.inputText}
          onChangeText={text => onChnageNewPassword(text)}
          value={newPassword}
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

      {newPasswordError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{newPasswordError}</Text>
        </View>
      ) : null}
      <View style={styles.passwordcontainer}>
        {/* Password input field */}

        <TextInput
          placeholder="Confirm password"
          placeholderTextColor={colorConstant.placeholdercolor}
          secureTextEntry={!showPasswordConfirm}
          style={styles.inputText}
          onChangeText={text => onChangeConfirmPassword(text)}
          value={confirmPassword}
          borderColor={colorConstant.bordercolor}
        />

        <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
          {/* Toggle password visibility button */}

          <Feather
            name={showPasswordConfirm ? 'eye' : 'eye-off'}
            size={20}
            color={colorConstant.white}
          />
        </TouchableOpacity>
      </View>

      {confirmPasswordError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        </View>
      ) : null}
      <CommonButton
        width={responsiveScreenWidth(90)}
        height={responsiveScreenHeight(6)}
        buttonTitle={'Change Password'}
        marginTop={responsiveScreenWidth(15)}
        onButtonPress={handleOnChangePassword}
      />
    </SafeAreaView>
  );
}

