import { View, Text, SafeAreaView, useColorScheme, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import StackRoot from './src/router/navigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MainApp from './MainApp';
import NetInfo from '@react-native-community/netinfo';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { colorConstant, fontConstant } from './src/utils/constant';
import toastShow from './src/utils/Toast';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected === true) {
        setIsConnected(true);
        setToastMessage(''); // Clear the toast message
        console.log('Connection type', state.type);
      } else {
        setIsConnected(false);
        setToastMessage('You are not connected to the Internet');
        console.log('Device is offline');
      }
    });

    NetInfo.fetch().then((state) => {
      if (state.isConnected === true) {
        setIsConnected(true);
        console.log('Initial connection type', state.type);

      
      } else {
        setIsConnected(false);
        console.log('Device is initially offline');
        setToastMessage('You are not connected to the Internet');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
   
   <Provider store={store}>
    <StatusBar backgroundColor={colorConstant.black} />

      <MainApp />
      {!isConnected && <Toast message={toastMessage} />}


    </Provider>
   
  );
};

export default App;

const Toast = ({ message }) => {
  return (
    <View style={{ backgroundColor: 'red' ,
    position:'absolute',
    top:0,
    width:responsiveScreenWidth(100),
    padding: 10,
   }}>
      <Text style={{
         color: 'white',
         textAlign: 'center',
         fontFamily:fontConstant.medium
      }}>{message}</Text>
    </View>
  );
};





// export default Toast;





