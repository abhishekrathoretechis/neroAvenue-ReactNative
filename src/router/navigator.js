import React from 'react';
import 'react-native-gesture-handler';

// necessary import
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens Import
import Home from '../screens/Home/Home';
import ChangePassword from '../screens/changePassword/ChangePassword';
import EditProfile from '../screens/editProfile/EditProfile';
import Folders from '../screens/folders/Folders';
import ForgetChangePassword from '../screens/forgetChangePassword/ForgetChangePassword';
import NewGallery from '../screens/gallery/Gallery';
import HelpCenter from '../screens/helpCenter/HelpCenter';
import HomeDetails from '../screens/homeDetails/HomeDetails';
import ImageMappingScreen from '../screens/imageMappingScreen/ImageMappingScreen';
import ImageSelect from '../screens/imageSelect/ImageSelect';
import InviteFriends from '../screens/inviteFriends/InviteFriends';
import NewMagz from '../screens/magz/Magz';
import MagzPublish from '../screens/magzPublish/MagzPublish';
import NeroClub from '../screens/neroClub/NeroClub';
import NotificationNew from '../screens/notificationnew/NotificationNew';

import OtherProfileView from '../screens/otherprofileview/OtherProfileView';
import Otp from '../screens/otp/Otp';
import PrivacySetting from '../screens/privacySetting/PrivacySetting';
import PrivacyPolicy from '../screens/privacypolicy/PrivacyPolicy';
import ProfileDetails from '../screens/profileDetails/ProfileDetails';
import ProfileVisibility from '../screens/profileVisibility/ProfileVisibility';
import Publish from '../screens/publish/Publish';
import PublishPost from '../screens/publishPost/PublishPost';
import ReportProblem from '../screens/reportProblem/ReportProblem';
import SubCategoryFolder from '../screens/subCategoryFolder/SubCategoryFolder';
import TermCondition from '../screens/termCondition/TermCondition';
import AuthNavi from './AuthNavi';
import BottomTabNavigation from './BottomTabNavigation';
import DrawerTabNavigation from './DrawerTabNavigation';
import SavedPost from '../screens/savedPost/SavedPost';
import SavedPostDetailsGallery from '../screens/savedPostDetailsGallery/SavedPostDetailsGallery';
import MagzScrollScreen from '../screens/magzScrollScreen/MagzScrollScreen';
import MagzScrollSavedScreen from '../screens/magzScrollSavedScreen/MagzScrollSavedScreen';
import MagzScrollProfileScreen from '../screens/magzScrollProfileScreen/MagzScrollProfileScreen';
import ChatScreen from '../screens/chatScreen/ChatScreen';
import ChatList from '../screens/chatList/ChatList';
import ImageMappingScreenMagz from '../screens/imageMappingScreenMagz/ImageMappingScreenMagz';
import SearchChat from '../screens/searchChat/SearchChat';
import Intereseted from '../screens/intereseted/Intereseted';
import OtherProfileDetailsView from '../screens/otherProfileDetailsView/OtherProfileDetailsView';
import OtherMagzScrollScreen from '../screens/otherMagzScrollScreen/OtherMagzScrollScreen';
const Stack = createNativeStackNavigator();
const StackRoot = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false, // Hide the header for all screens
      }}
      initialRouteName="DrawerTabNavigation">
      <Stack.Screen name="NeroClub" component={NeroClub} />
      <Stack.Screen name="MagzPublish" component={MagzPublish} />
      <Stack.Screen name="InviteFriends" component={InviteFriends} />
      <Stack.Screen name="Publish" component={Publish} />
      <Stack.Screen name="PublishPost" component={PublishPost} />
      <Stack.Screen name="MagzScrollScreen" component={MagzScrollScreen} />
      {/* <Stack.Screen name="MagzScrollSavedScreen" component={MagzScrollSavedScreen} /> */}
      <Stack.Screen name="MagzScrollProfileScreen" component={MagzScrollProfileScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="ImageMappingScreenMagz" component={ImageMappingScreenMagz} />
      <Stack.Screen name="SearchChat" component={SearchChat} />
      <Stack.Screen name="Intereseted" component={Intereseted} />

      {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomeDetails" component={HomeDetails} /> */}
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      {/* <Stack.Screen name="SavedPost" component={SavedPost} /> */}
      <Stack.Screen name="SavedPostDetailsGallery" component={SavedPostDetailsGallery} />

      <Stack.Screen
        name="ForgetChangePassword"
        component={ForgetChangePassword}
      />
      
      <Stack.Screen name="NewGallery" component={NewGallery} />
      <Stack.Screen name="NewMagz" component={NewMagz} />

     

      <Stack.Screen name="AuthNavi" component={AuthNavi} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ProfileVisibility" component={ProfileVisibility} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="NotificationNew" component={NotificationNew} />

      <Stack.Screen name="OtherProfileView" component={OtherProfileView} />
      <Stack.Screen name="TermCondition" component={TermCondition} />
      <Stack.Screen name="ImageSelect" component={ImageSelect} />
      <Stack.Screen name="ImageMappingScreen" component={ImageMappingScreen} />
      <Stack.Screen name="PrivacySetting" component={PrivacySetting} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="ReportProblem" component={ReportProblem} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Folders" component={Folders} />
      <Stack.Screen name="SubCategoryFolder" component={SubCategoryFolder} />
      <Stack.Screen name="OtherProfileDetailsView" component={OtherProfileDetailsView} />
      <Stack.Screen name="OtherMagzScrollScreen" component={OtherMagzScrollScreen} />


      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
      <Stack.Screen
        name="DrawerTabNavigation"
        component={DrawerTabNavigation}
      />
      
    </Stack.Navigator>
  );
};

export default StackRoot;