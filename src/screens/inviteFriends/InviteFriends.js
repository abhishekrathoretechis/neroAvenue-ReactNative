import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {colorConstant, fontConstant} from '../../utils/constant';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import NewHeader from '../../components/NewHeader';
import CommonButton from '../../components/CommonButton';
import {InvateFriends} from '../../redux/reducers/authSlice';
import {useDispatch} from 'react-redux';
import toastShow from '../../utils/Toast';
import styles from './Styles';

const InviteFriends = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const onchangeEmailFunction = text => {
    if (text.length !== 0) {
      if (regEmail.test(text)) {
        setEmail(text);
        setEmailError('');
      } else {
        setEmail(text);
        setEmailError('Please enter a valid email address');
      }
    } else {
      setEmail('');
      setEmailError(''); 
    }
  };

  const onHandlePublish = () => {
    const data = new FormData();
    data.append('email', email);
    dispatch(InvateFriends(data)).then(response => {
      if (response.payload.status === 200) {
        toastShow('Invite sent successfully','lightgreen')
        props.navigation.goBack();
      }
    });
  };
  return (
    <View style={styles.maincontainer}>
      <ScrollView>
        <NewHeader
          navigation={props.navigation}
          title={'Invite Friends'}
          rightImage={false}
        />
       
          <Text style={styles.headText2}>
            Birds of the same feather flock together.
          </Text>
        
        <View style={styles.paragraphfirst}>
          <Text style={styles.paragraphfirsttext}>
            <Text style={{fontFamily: fontConstant.black}}>NERO avenue</Text> is
            your community. It is your haven. Invite your family, friends, and
            even those you have had a wonderful conversation regarding black. If
            you think they use black as an expression as creatively as you do,
            they will love it here. Invite your fellow lovers of black
          </Text>
        </View>

        <View style={styles.emailid}>
          <Text style={styles.emailIdText}>Enter Email Id</Text>
          <View style={styles.leftInput}>
           <TextInput style={styles.input} value= {email} onChangeText={e => onchangeEmailFunction(e)} />
           
          
            <CommonButton
              height={responsiveScreenHeight(5)}
              width={responsiveScreenWidth(25)}
              buttonTitle={'Invite'}
              fontSize={responsiveScreenFontSize(1.9)}
              marginTop={1}
              onButtonPress={onHandlePublish}
            />
           
          </View>
          {emailError ? (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{emailError}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default InviteFriends;


