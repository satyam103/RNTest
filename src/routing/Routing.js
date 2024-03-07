import React, {useEffect} from 'react';
import Login from '../screens/login/Login';
import SignUp from '../screens/signup/SignUp';
import PrivacyPolicy from '../screens/t&c_p&p/PrivacyPolicy';
import TermCondition from '../screens/t&c_p&p/T&C';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import DashboardRouting from './DashboardRouting';
import EditProfile from '../screens/editprofile/EditProfile';
import AddSocialDetails from '../screens/editprofile/AddSocialDetails';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ChangePassword from '../screens/changePassword/ChangePassword';
import CourseScreen from '../screens/courseScreen/CourseScreen';
import Inbox from '../screens/inbox/Inbox';
// import {Chat, OverlayProvider} from 'stream-chat-react-native';
// import {StreamChat} from 'stream-chat';
// import {chatApiKey} from '../../chatConfig';

const Stack = createNativeStackNavigator();

const Routing = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn[0]);
  // ==================== splash screen ======================
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // ====================== dark mode =========================
  const darkMode = useSelector(state => state.darkMode);
  const appTheme = darkMode ? DarkTheme : DefaultTheme;

  // const chatClient = StreamChat.getInstance(chatApiKey);

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardRouting} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen
              name="AddSocialDetails"
              component={AddSocialDetails}
            />
            <Stack.Screen name="CourseScreen" component={CourseScreen} />

            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="Inbox" component={Inbox} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUp} />
          </>
        )}
        <Stack.Screen name="Term" component={TermCondition} />
        <Stack.Screen name="PrivacyP" component={PrivacyPolicy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routing;
