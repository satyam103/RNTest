import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RoutingProfile from './RoutingProfile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notifications from '../screens/notifications/Notifications';
import MyCourse from '../screens/myCourse/MyCourse';
import Search from '../screens/search/Search';
import CourseRouting from './CourseRouting';
import ScanScreen from '../screens/inbox/Inbox';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const DashboardRouting = props => {
  return (
    <Tab.Navigator
      backBehaviour="initialRoute"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Account') {
            iconName = 'person';
          } else if (route.name === 'My Course') {
            iconName = 'book';
          } else if (route.name === 'Notification') {
            iconName = 'notifications';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        // tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="My Course" component={CourseRouting} />
      <Tab.Screen name="Notification" component={Notifications} />
      <Tab.Screen name="Account" component={RoutingProfile} />
      <Tab.Screen name="inbox" component={ScanScreen} />
    </Tab.Navigator>
  );
};

export default DashboardRouting;
