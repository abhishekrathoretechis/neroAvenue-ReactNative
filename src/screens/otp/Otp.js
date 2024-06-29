import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {Text} from 'react-native-paper';
import CommonButton from '../../components/CommonButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useDispatch} from 'react-redux';
import {postOtp, putOtpVerify} from '../../redux/reducers/authSlice';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';

export default function Otp(props) {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(300);

  useEffect(() => {
    handlePostOtp(); // Call the API when the component mounts
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handlePostOtp = () => {
    setCode('');
    const data = {
      mobile: props?.route?.params?.mobileNumber,
    };
    dispatch(postOtp(data));
    setTimer(300); // Reset the timer
  };

  const getVerifyOtp = () => {
    setCode('');
    const data = {
      mobile: props?.route?.params?.mobileNumber,
      verify: code,
    };
    dispatch(putOtpVerify(data)).then(response => {
      if (response.payload && response.payload.status === 202) {
        props.navigation.navigate('SlideScreen', {
          mobile: props?.route?.params?.mobileNumber,
          email: props?.route?.params?.email,
        });
      }
    });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <Image source={imageConstant.logo} style={styles.logoImg} />

        <View style={styles.loginView}>
          <Text variant="titleMedium" style={styles.loginText}>
            Verify Your Number
          </Text>

          <Text variant="bodySmall" style={styles.subLoginText}>
            We have sent a verification code to your phone number
          </Text>
        </View>

        <View style={{marginHorizontal: responsiveScreenWidth(7)}}>
          <Text
            style={styles.enterCodeText}>
            Enter Code
          </Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <OTPInputView
            style={styles.otpView}
            pinCount={6}
            code={code}
            onCodeChanged={code => setCode(code)}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
          />
        </View>

        <CommonButton
          width={responsiveScreenWidth(90)}
          height={responsiveScreenHeight(6)}
          buttonTitle={'Verify'}
          marginTop={responsiveScreenWidth(8)}
          onButtonPress={getVerifyOtp}
        />

        <View
          style={styles.resendView}>
          <TouchableOpacity onPress={handlePostOtp} disabled={timer > 0}>
            <Text style={styles.bottomText}>
              Resend in {Math.floor(timer / 60)}min :{' '}
              {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}sec
            </Text>
          </TouchableOpacity>

        
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.black,
  },
  resendView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenWidth(5),
    marginTop: responsiveScreenHeight(2),
  },
  otpView:{
    width: '95%',
    height: responsiveScreenHeight(18),
    alignSelf: 'center',
  },
  enterCodeText:{
    color: colorConstant.white,
    fontSize: responsiveScreenFontSize(2.3),
    fontFamily: fontConstant.medium,
  },
  logoImg: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(40),
    height: responsiveScreenHeight(17),
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(15),
  },
  loginText: {
    color: colorConstant.white,
    fontSize: responsiveScreenFontSize(3),
    fontFamily: fontConstant.bold,
  },
  subLoginText: {
    color: colorConstant.lightWhite,
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: fontConstant.regular,
    marginTop: responsiveScreenHeight(1.5),
  },
  loginView: {
    marginTop: responsiveScreenWidth(8),
    marginLeft: responsiveScreenWidth(6.5),
    marginBottom: responsiveScreenWidth(5),
  },
  underlineStyleBase: {
    width: responsiveScreenWidth(14),
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1.5,
    fontSize: 20,
    alignSelf: 'center',
  },
  underlineStyleHighLighted: {borderColor: '#03DAC6'},
  bottomText: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(1.8),
  },
});
