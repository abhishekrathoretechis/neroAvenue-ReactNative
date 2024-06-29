import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AuthContext from './src/context/authContext';
import AuthNavi from './src/router/AuthNavi';
import StackRoot from './src/router/navigator';
import LoaderScreen from './src/utils/Loader';
import authStorage from './src/utils/authStorage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MainApp = props => {
  const loader = useSelector(state => state.auth.loader);
  const [authToken, setAuthToken] = useState();
  const [postId, setPostId] = useState(null);
  console.log('mainappsotedid-------->',postId)
  useEffect(() => {
    const getStoredPostId = async () => {
      try {
        const storedPostId = await AsyncStorage.getItem('postId');
        setPostId(storedPostId);
      } catch (error) {
        console.error('Error retrieving postId:', error);
        // Handle error
      }
    };

    getStoredPostId();
  }, []);

  useEffect(() => {
    getTokens();
  }, [getTokens]);

  const getTokens = async () => {
    const authToken = await authStorage.getToken();
    setAuthToken(authToken);
  };
  
  const HandleDeepLinking = () => {
    const navigation = useNavigation();
    const handleDynamicLinks = async (link) => {
      console.log('Foreground link handling:', link)
      let postId = link.url.split('=').pop()
      let magzId = link.url.split('=').pop()
      console.log('productId:', postId,) 
      if(postId !==null){
      navigation.navigate('HomeDetails', { productId: postId })
      }
      if(magzId !==null){
        navigation.navigate('SingleMagz', { productId: magzId })
      }
    }
    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLinks)
      return () => unsubscribe()
    }, [])

    return null
  }

  return (
    // <GestureHandlerRootView style={{flex:1}}>
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
      }}>
      <NavigationContainer>
        <LoaderScreen data={loader} />
        <HandleDeepLinking />
        {authToken != null ? <StackRoot /> : <AuthNavi />}
      </NavigationContainer>
    </AuthContext.Provider>
      //  </GestureHandlerRootView>
  );
};

export default MainApp;


