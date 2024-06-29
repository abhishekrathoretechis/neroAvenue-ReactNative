import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import ChangePassword from '../screens/changePassword/ChangePassword';
import DrawerContainer from '../screens/drawerContainer/DrawerContainer';
import {colorConstant} from '../utils/constant';
import BottomTabNavigation from './BottomTabNavigation';
const Drawer = createDrawerNavigator();

function DrawerTabNavigation() {
  const [value, setValue] = useState(null);
  const forgotPasswordFlag = useSelector(
    state => state.auth.forgotPasswordFlag,
  );

  useEffect(() => {
    getData();
  }, [getData, forgotPasswordFlag]);
  
  const getData = async () => {
    const x = await AsyncStorage.getItem('forgotPassword');
    setValue(x);
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        overlayColor: 'rgba(52, 52, 52, 0.60)',
        drawerPosition: 'right',
        drawerType: 'front',
        headerShown: false,
        drawerStyle: {
          width: responsiveScreenWidth(80),
          backgroundColor: colorConstant.black,
          marginTop: responsiveScreenHeight(8),
          borderRadius: 8,
          height: responsiveScreenHeight(83),
        },
      }}
      drawerContent={props => <DrawerContainer {...props} />}>
      {value == 'Y' && value !== null ? (
        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      ) : (
        <Drawer.Screen name="Tab" component={BottomTabNavigation} />
      )}
    </Drawer.Navigator>
  );
}

export default DrawerTabNavigation;
