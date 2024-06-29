import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Signup from '../screens/Signup/Signup';
import ForgetPassword from '../screens/forgetPassword/ForgetPassword';
import Login from '../screens/login/Login';
import Otp from '../screens/otp/Otp';
import Slides from '../screens/slides/Slides';
import Splash from '../screens/splash/Splash';
import SlideScreen from './SlideScreen';
import TermCondition from '../screens/termCondition/TermCondition';
import ProfileSetupSelectCategory from '../components/ProfileSetupSelectCategory';

const AuthNavi = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'black'},
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500],
            }),
          },
        }),
      }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Slides" component={Slides} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="SlideScreen" component={SlideScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="TermCondition" component={TermCondition} />
      <Stack.Screen name="ProfileSetupSelectCategory" component={ProfileSetupSelectCategory} />


    </Stack.Navigator>
  );
};

export default AuthNavi;
