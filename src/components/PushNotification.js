import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import apiClient from '../utils/baseUrl';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    await getFcmToken();
    // console.log('Authorization status:', authStatus);
  }
}

const getFcmToken = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  // console.log('old fcmToken', fcmToken);
  if (!fcmToken) {
    try {
      const some = await messaging().registerDeviceForRemoteMessages();
      if (Platform.OS === "ios") {
    
        const apnsToken = await messaging().getAPNSToken(); 
        
        console.log("==> APNS token", apnsToken); // THIS NEVER GETS CALLED
        
        if(apnsToken) {
         const token = await messaging().getToken();
         console.log("tokentoken", token);
         const res = await apiClient.put(`user/token/${token}`);
        if (!res.ok) {
          console.log('Error', res.data);
          return;
        }
         await AsyncStorage.setItem('fcmToken', token);
          return token;
        } else {
          await messaging().setAPNSToken('randomAPNStoken', 'sandbox').then(async () => {
            const token = await messaging().getToken()
            // console.log("tokentokentoken11", token);
            await AsyncStorage.setItem('fcmToken', token);
          }
         
          );
        };
      } else{
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('new fcmToken', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);

        const res = await apiClient.put(`user/token/${fcmToken}`);
        if (!res.ok) {
          console.log('Error', res.data);
          return;
        }
      }
    }
    } catch (error) {
      console.log('fcm error', error);
    }
  }
};

export const notificationService = () => {
  // const noti = new NotifService();
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  messaging().onMessage(async remoteMessage => {
    // noti.localNotif(remoteMessage.notification.title, remoteMessage.notification.body)
    console.log('Message handled in the foreground!', remoteMessage);
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });
};
