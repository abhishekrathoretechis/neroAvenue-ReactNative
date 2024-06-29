import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {Image} from 'react-native';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userProfileDetails} from '../redux/reducers/authSlice';
import Publish from '../screens/publish/Publish';
import {colorConstant, imageConstant} from '../utils/constant';
import {
  HomeStack,
  NotificationStack,
  ProfileStack,
  SearchStack,
} from './TotalStack';
const Tab = createBottomTabNavigator();

function BottomTabNavigation(props) {
  const userProfileData = useSelector(state => state?.auth?.curretUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getUserDetails();
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    if (
      userProfileData == null ||
      userProfileData == undefined ||
      userProfileData == ''
    ) {
      props.navigation.navigate('AuthNavi', {screen: 'Login'});
    }
  }, [userProfileData]);

  const getUserDetails = async () => {
    dispatch(userProfileDetails());
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        animation: 'slide_from_right',
        tabBarActiveTintColor: '#3BA1FB',
        tabBarActiveBackgroundColor: 'black',
        tabBarInactiveBackgroundColor: 'black',
        tabBarInactiveTintColor: 'white',
        lazy: true,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();

            props.navigation.navigate('Home', {screen: 'Home'});
          },
        })}
        options={({route}) => ({
          tabBarLabel: 'Home',
          lazy: false,
          headerShown: false,

          tabBarShowLabel: false,

          tabBarIcon: ({color, size, focused}) => {
            return focused ? (
              <Image source={imageConstant.homeiconwhite} />
            ) : (
              <Image source={imageConstant.homeiconblack} />
            );
          },
        })}
      />

      <Tab.Screen
        initialParams="NewSearch"
        name="NewSearch"
        component={SearchStack}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();

            props.navigation.navigate('NewSearch', {screen: 'NewSearch'});
          },
        })}
        options={({route}) => ({
          tabBarLabel: 'Search',
          lazy: false,
          headerShown: false,

          tabBarShowLabel: false,

          tabBarIcon: ({color, size, focused}) => {
            return focused ? (
              <Image source={imageConstant.searchwhite} />
            ) : (
              <Image source={imageConstant.searchblack} />
            );
          },
        })}
      />

      <Tab.Screen
        initialParams="Publish"
        name="Publish"
        component={Publish}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();

            props.navigation.navigate('Publish', {screen: 'Publish'});
          },
        })}
        options={{
          tabBarLabel: 'Search',
          lazy: false,
          headerShown: false,

          tabBarShowLabel: false,

          tabBarIcon: ({color, size, focused}) => {
            return focused ? (
              <Image
                source={imageConstant.posticon}
                style={{tintColor: '#FFFFF'}}
              />
            ) : (
              <Image
                source={imageConstant.posticon}
                style={{tintColor: 'darkgrey'}}
              />
            );
          },
        }}
      />

      <Tab.Screen
        initialParams="Notification"
        name="Notification"
        component={NotificationStack}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();

            props.navigation.navigate('Notification', {screen: 'Notification'});
          },
        })}
        options={({route}) => ({
          tabBarLabel: 'Notification',
          lazy: false,
          headerShown: false,

          tabBarShowLabel: false,

          tabBarIcon: ({color, size, focused}) => {
            return focused ? (
              <Image source={imageConstant.notificationwhite} />
            ) : (
              <Image source={imageConstant.notificationblack} />
            );
          },
        })}
      />

      <Tab.Screen
        initialParams="Profile"
        name="Profile"
        component={ProfileStack}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            props.navigation.navigate('NewMyProfile', {screen: 'NewMyProfile'});
          },
        })}
        options={{
          tabBarLabel: 'Profile',
          lazy: false,
          headerShown: false,

          tabBarShowLabel: false,

          tabBarIcon: ({color, size, focused}) => {
            return focused ? (
              <Image
                source={{uri: userProfileData?.userImage}}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  borderWidth: 1,
                  borderColor: colorConstant.white,
                }}
              />
            ) : (
              <Image
                source={{uri: userProfileData?.userImage}}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  borderWidth: 1,
                  borderColor: colorConstant.white,
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
