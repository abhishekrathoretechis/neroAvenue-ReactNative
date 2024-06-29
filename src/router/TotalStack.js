import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NewHome from '../screens/Home/Home';
import NewGallery from '../screens/gallery/Gallery';
import NewMagz from '../screens/magz/Magz';
import NewMyProfile from '../screens/Profile/Profile';
import EditProfile from '../screens/editProfile/EditProfile';
import PrivacyPolicy from '../screens/privacypolicy/PrivacyPolicy';
import ProfileVisibility from '../screens/profileVisibility/ProfileVisibility';
import NeroClub from '../screens/neroClub/NeroClub';
import InviteFriends from '../screens/inviteFriends/InviteFriends';
import Notification from '../screens/Notification/Notification';
import NewSearch from '../screens/Search/Search';
import ImageMappingScreen from '../screens/imageMappingScreen/ImageMappingScreen';
import SubCategoryFolder from '../screens/subCategoryFolder/SubCategoryFolder';
import Folders from '../screens/folders/Folders';
import ImageSelect from '../screens/imageSelect/ImageSelect';
import ProfileDetails from '../screens/profileDetails/ProfileDetails';
import HomeDetails from '../screens/homeDetails/HomeDetails';
import OtherProfileView from '../screens/otherprofileview/OtherProfileView';
import SavedPostDetailsGallery from '../screens/savedPostDetailsGallery/SavedPostDetailsGallery';
import SavedPost from '../screens/savedPost/SavedPost';
import OtherProfileDetailsView from '../screens/otherProfileDetailsView/OtherProfileDetailsView';
import OtherMagzScrollScreen from '../screens/otherMagzScrollScreen/OtherMagzScrollScreen';
import MagzScrollSavedScreen from '../screens/magzScrollSavedScreen/MagzScrollSavedScreen';
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
    <Stack.Screen name="Home" component={NewHome} />
    <Stack.Screen name="HomeDetails" component={HomeDetails} />

    <Stack.Screen name="NewGallery" component={NewGallery} />
    <Stack.Screen name="NewMagz" component={NewMagz} />
    <Stack.Screen name="NewMyProfile" component={NewMyProfile} />
    <Stack.Screen
      name="OtherProfileDetailsView"
      component={OtherProfileDetailsView}
    />
    <Stack.Screen
      name="OtherMagzScrollScreen"
      component={OtherMagzScrollScreen}
    />
    <Stack.Screen name="OtherProfileView" component={OtherProfileView} />
  </Stack.Navigator>
);
const SearchStack = () => (
  <Stack.Navigator
    initialRouteName="NewSearch"
    screenOptions={{animation: 'slide_from_right', headerShown: false}}>
    <Stack.Screen name="NewSearch" component={NewSearch} />
    <Stack.Screen name="HomeDetails" component={HomeDetails} />
    <Stack.Screen
      name="OtherProfileDetailsView"
      component={OtherProfileDetailsView}
    />
    <Stack.Screen
      name="OtherMagzScrollScreen"
      component={OtherMagzScrollScreen}
    />
  </Stack.Navigator>
);
const NotificationStack = () => (
  <Stack.Navigator
    initialRouteName="Notification"
    screenOptions={{animation: 'slide_from_right', headerShown: false}}>
    <Stack.Screen name="Notification" component={Notification} />

    <Stack.Screen
      name="OtherProfileDetailsView"
      component={OtherProfileDetailsView}
    />
    <Stack.Screen
      name="OtherMagzScrollScreen"
      component={OtherMagzScrollScreen}
    />
  </Stack.Navigator>
);
const ProfileStack = () => (
  <Stack.Navigator
    initialRouteName="NewMyProfile"
    screenOptions={{animation: 'slide_from_right', headerShown: false}}>
    <Stack.Screen name="NewMyProfile" component={NewMyProfile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="ImageMappingScreen" component={ImageMappingScreen} />
    <Stack.Screen name="SubCategoryFolder" component={SubCategoryFolder} />
    <Stack.Screen name="ImageSelect" component={ImageSelect} />
    <Stack.Screen name="Folders" component={Folders} />
    <Stack.Screen name="ProfileVisibility" component={ProfileVisibility} />
    <Stack.Screen name="NeroClub" component={NeroClub} />
    <Stack.Screen name="InviteFriends" component={InviteFriends} />
    <Stack.Screen
      initialParams={{initialRouteName: 'SavedPostDetailsGallery'}}
      name="SavedPostDetailsGallery"
      component={SavedPostDetailsGallery}
    />
    <Stack.Screen name="SavedPost" component={SavedPost} />
    <Stack.Screen name="MagzScrollSavedScreen" component={MagzScrollSavedScreen} />


    <Stack.Screen
      name="OtherProfileDetailsView"
      component={OtherProfileDetailsView}
    />
    <Stack.Screen
      name="OtherMagzScrollScreen"
      component={OtherMagzScrollScreen}
    />
  </Stack.Navigator>
);

export {HomeStack, NotificationStack, ProfileStack, SearchStack}; // Export named components
