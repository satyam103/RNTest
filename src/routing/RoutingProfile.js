import React, {useState} from 'react';
import ViewProfile from '../screens/profile/ViewProfile';
import Profile from '../screens/profile/Profile';
import EditProfile from '../screens/editprofile/EditProfile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../screens/setting/Settings';
import PaymentOptions from '../screens/paymentOptions/PaymentOptions';
import RenderHtmlScreen from '../screens/RenderHtmlScreen';
import Test from '../screens/Test';

const Stack = createNativeStackNavigator();

const RoutingProfile = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="Setting" component={Settings} />
      <Stack.Screen name="PaymentOpt" component={PaymentOptions} />
      <Stack.Screen name="RenderHTML" component={Test} />
    </Stack.Navigator>
  );
};

export default RoutingProfile;
