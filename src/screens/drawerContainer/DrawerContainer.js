import {
  Image,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import {imageConstant} from '../../utils/constant';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import CommonButton from '../../components/CommonButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authStorage from '../../utils/authStorage';
import AuthContext from '../../context/authContext';
import apiClient from '../../utils/baseUrl';
import styles from './Styles';
export default function DrawerContainer({navigation}) {
  const {setAuthToken} = useContext(AuthContext);

  // logout function

  const onLogout = async () => {
    await AsyncStorage.removeItem('fcmToken');
    await AsyncStorage.removeItem('forgotPassword');

    console.log('FCM token removed successfully.');
    await authStorage.removeToken();
    console.log('Forget pasword is removed');
      
    setAuthToken(null);
    const res = await apiClient.put(`user/token/${''}`);
    if (!res.ok) {
      console.log('Error', res.data);
      return;
    }

    console.log(' Access Token removed successfully');
    navigation.navigate('AuthNavi', {screen: 'Login'});
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.rowContainer}>
          <Text style={styles.headerText}>Settings</Text>
          <TouchableOpacity onPress={() => navigation.closeDrawer()}>
            <Image source={imageConstant.cancel} style={styles.cancelImg} />
          </TouchableOpacity>
        </View>

        {/* first */}
        <View style={styles.mainView}>
          <TouchableOpacity
            style={styles.rowUnderContainer}
            onPress={() => navigation.navigate('PrivacySetting')}>
            <Text style={styles.bodyText}>Privacy Settings</Text>
            <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rowUnderContainer}
            onPress={() => navigation.navigate('SavedPost')}>
            <Text style={styles.bodyText}>Collections</Text>
            <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
          </TouchableOpacity>
        </View>

        {/* sec */}
        <View style={styles.mainView}>
          <TouchableOpacity
            style={styles.rowUnderContainer}
            onPress={() => navigation.navigate('NeroClub')}>
            <Text style={styles.bodyText}>NERO Club</Text>
            <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rowUnderContainer}
            onPress={() => navigation.navigate('InviteFriends')}>
            <Text style={styles.bodyText}>Invite Friends</Text>
            <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
          </TouchableOpacity>
        </View>

        {/* second */}

        <View style={styles.mainView}>
          <TouchableOpacity
            style={styles.rowUnderContainer}
            onPress={() => navigation.navigate('NotificationNew')}>
            <Text style={styles.bodyText}>Notification Settings</Text>
            <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
          </TouchableOpacity>

        </View>

        {/* third */}

        <View style={styles.mainView}>
          <TouchableOpacity
            style={styles.rowUnderContainer}
            onPress={() => navigation.navigate('HelpCenter')}>
            <Text style={styles.bodyText}>Help Center</Text>
            <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rowUnderContainer}
            onPress={() => navigation.navigate('TermCondition')}>
            <Text style={styles.bodyText}>Terms of Service</Text>
            <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rowUnderContainer}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.bodyText}>Privacy Policy</Text>
            <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowUnderContainer}>
            <Text style={styles.bodyText}>About </Text>
            <Image source={imageConstant.leftarrow} style={styles.arrowImg} />
          </TouchableOpacity>
        </View>

        {/* logout */}
        <CommonButton
          width={responsiveScreenWidth(35)}
          height={responsiveScreenHeight(4)}
          buttonTitle={'Log out'}
          marginTop={responsiveScreenWidth(10)}
          onButtonPress={onLogout}
          marginBottom={responsiveScreenHeight(5)}
        />
      </ScrollView>
    </View>
  );
}

