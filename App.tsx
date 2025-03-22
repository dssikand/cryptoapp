/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, ActivityIndicator, BackHandler} from 'react-native';
import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import 'react-native-gesture-handler';
import {
  Bell,
  Building2,
  Pickaxe,
  Users,
  Wallet,
} from 'lucide-react-native';
// Import Screens
import StartScreen from './components/startscreen';
import SignInScreen from './components/signinscreen';
import SignUpScreen from './components/signupscreen';
import WalletScreen from './components/walletscreen';
import MiningScreen from './components/miningscreen';
import LeaderboardScreen from './components/leaderboardscreen';
import AnnouncemntScreen from './components/announcementscree';
import SettingScreen from './components/settingscreen';
import ReferalCode from './components/referalcode';
import CustomDrawer from './components/common/customdrawer';
import ObjectiveScreen from './components/objectivescreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import './i18n'; // Import i18n config
import { useTranslation } from 'react-i18next';
import { AuthContext, AuthProvider } from './authcontext';
import GroupScreen from './components/groupscreen';
import messaging from "@react-native-firebase/messaging"
import "./firebaseconfig"
import AsyncStorage from '@react-native-async-storage/async-storage';


// ✅ Function to Request Notification Permissions
async function requestUserPermission() {
  let authStatus = null;

  if (Platform.OS === 'ios') {
    authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('✅ iOS Notification permission granted.');
      // await getFCMToken();
    } else {
      console.log('❌ iOS Notification permission denied.');
    }
  } else if (Platform.OS === 'android') {
    if (Platform.Version >= 33) { // Android 13+
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('✅ Android notification permission granted.');
        // await getFCMToken();
      } else {
        console.log('❌ Android notification permission denied.');
      }
    } else {
      console.log('ℹ️ Android version does not require explicit notification permission.');
      // await getFCMToken(); // Directly get FCM token for Android 12 and below
    }
  }
}

// ✅ Function to Get FCM Token
async function getFCMToken() {
  try {


    const reso = await messaging().getToken()
    console.log(reso)
    await AsyncStorage.setItem("deviceToken", reso)
  } catch (error) {
    console.error('❌ Error getting FCM token:', error);
  }
}
// Function to Handle Incoming Notifications
async function onDisplayNotification(remoteMessage) {
  await notifee.requestPermission();
 
// 🔥 Create a notification channel (fixes "No Channel found" error)
const channelId = await notifee.createChannel({
id: 'default', // Ensure this matches channelId in the error
name: 'Default Notification Channel',
importance: AndroidImportance.HIGH,
description: 'Used for general notifications',
});
  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher', // Ensure you have this icon in Android
    },
  });
}
// import { setupFirebaseNotifications } from './firebaseService';
// Create Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();
// ✅ Bottom Tab Navigator (Only for Logged-in Users)
function BottomTabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Wallet' || route.name === '钱包') {
            iconName = <Wallet color={focused ? '#ff922b' : '#adb5bd'} />;
          } else if (route.name === 'Mining' || route.name === '挖矿') {
            iconName = <Pickaxe color={focused ? '#ff922b' : '#adb5bd'} />;
          } else if (route.name === 'Leader Board' || route.name === '排行榜') {
            iconName = <Building2 color={focused ? '#ff922b' : '#adb5bd'} />;
          } else if (route.name === 'Announcement' || route.name === '公告') {
            iconName = <Bell color={focused ? '#ff922b' : '#adb5bd'} />;
          } else if (route.name === 'Group' || route.name === '我的推荐组') {
            iconName = <Users color={focused ? '#ff922b' : '#adb5bd'} />;
          }
          return <Text>{iconName}</Text>;
        },
        tabBarActiveTintColor: '#ff922b',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: '#000', paddingBottom: 5},
        headerShown: false,
        sceneStyle:{
          backgroundColor:"#000"
        }
      })}
    >

      <Tab.Screen name={t('Common.wallet')} component={WalletScreen} />
      <Tab.Screen name={t('Common.mining')} component={MiningScreen} />
      <Tab.Screen name={t('Common.leader')} component={LeaderboardScreen} />
      <Tab.Screen name={t('Common.announcement')} component={AnnouncemntScreen} />
      <Tab.Screen name={t('Common.group')} component={GroupScreen} />
    </Tab.Navigator>
  );
}

// ✅ Auth Stack (For Login & Signup - No Bottom Tabs)
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home2" component={StartScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ReferalCode" component={ReferalCode} />

      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

// ✅ Main Stack (Includes Bottom Tabs Inside a Stack)
function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false,cardStyle: { backgroundColor: '#000' } }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="Objective" component={ObjectiveScreen} />
      <Stack.Screen name="Account" component={SettingScreen} />

    </Stack.Navigator>
  );
}

// ✅ Drawer Navigation (Includes Main Stack)
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#121212', // Dark Mode Drawer
          width: 250,
        },
        headerShown: false, // Hide header
        
      }}>
      <Drawer.Screen name="Home" component={MainStack} />
      <Drawer.Screen name="Objective" component={ObjectiveScreen} />
      <Drawer.Screen name="Account" component={SettingScreen} />

    </Drawer.Navigator>
  );
}
function Navigation() {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  useEffect(() => {


    setTimeout(() => { requestUserPermission(); getFCMToken() }, 3000)
    // init();
  }, []);
  useEffect(() => {
    const backAction = () => {
      if (isLoggedIn) {
        BackHandler.exitApp(); // Exit app if on main app screen
        return true;
      }
      return false; // Allow default behavior for login/signup
    };
    requestUserPermission()
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isLoggedIn]);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Foreground notification received:", remoteMessage);
  
      try {
        // Ensure the notification shows in notification bar
        await onDisplayNotification(remoteMessage);
      } catch (error) {
        console.error("Error handling foreground notification:", error);
      }
    });
  
    return unsubscribe;
  }, []);
  // ✅ Show loading indicator while checking auth state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#ff922b" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#000' } }}>
        <Stack.Screen name="App" component={isLoggedIn ? DrawerNavigator : AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// ✅ Root Stack (Handles Auth vs Main App)
export default function App() {



  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Toast position={'bottom'} />
    </QueryClientProvider>
    </AuthProvider>
  );
}
