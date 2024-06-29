import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import CommonButton from '../../components/CommonButton';
import CommonTextInput from '../../components/CommonTextInput';
import NewHeader from '../../components/NewHeader';
import {
  ForgetPaaword,
  setForgotPasswordFlag,
} from '../../redux/reducers/authSlice';
import {colorConstant} from '../../utils/constant';
import {DEFAULT_MESSAGE, VALID_EMAIL} from '../../utils/message';
import styles from './Styles';
export default function ForgetPassword(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  // email function
  const onChangeEmailFunction = text => {
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

  // api calling
  const handleOnForgetPassword = () => {
    let newEmail = regEmail.test(email);

    if (newEmail) {
      const data = {emailId: email};
      dispatch(ForgetPaaword(data)).then(response => {
        if (response?.payload && response?.payload?.status === 406) {
          dispatch(setForgotPasswordFlag(true));
          props.navigation.goBack();
        }
      });
    } else {
      setEmailError(newEmail ? '' : VALID_EMAIL);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NewHeader
        rightImage={false}
        title={'Forgot Password'}
        navigation={props.navigation}
      />
      <CommonTextInput
        placeholder={'Enter Email'}
        width={responsiveScreenWidth(90)}
        onChangeText={text => onChangeEmailFunction(text)}
        value={email}
        borderColor={colorConstant.bordercolor}
        marginTop={responsiveScreenHeight(5)}
      />

      {emailError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{emailError}</Text>
        </View>
      ) : null}

      <CommonButton
        width={responsiveScreenWidth(90)}
        height={responsiveScreenHeight(6)}
        buttonTitle={'Forgot Password'}
        marginTop={responsiveScreenWidth(10)}
        onButtonPress={handleOnForgetPassword}
      />
    </SafeAreaView>
  );
}


