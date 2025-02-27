import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, ActivityIndicator, BackHandler} from 'react-native';
import 'react-native-gesture-handler';
import {
  Bell,
  Building2,
  HomeIcon,
  LucideHome,
  Pickaxe,
  Settings,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import "./i18n"; // Import i18n config
import { useTranslation } from 'react-i18next';
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
         if (route.name === 'Wallet'|| route.name==="钱包") {
            iconName = <Wallet color={focused ? "#ff922b" : "#adb5bd"} />;
          } else if (route.name === 'Mining'|| route.name==="挖矿") {
            iconName = <Pickaxe color={focused ? "#ff922b" : "#adb5bd"} />;
          } else if (route.name === 'Leader Board'|| route.name==="排行榜") {
            iconName = <Building2 color={focused ? "#ff922b" : "#adb5bd"} />;
          } else if (route.name === 'Announcement'|| route.name==="公告") {
            iconName = <Bell color={focused ? "#ff922b" : "#adb5bd"} />;
          } else if (route.name === 'My Account'|| route.name==="我的账户") {
            iconName = <Settings color={focused ? "#ff922b" : "#adb5bd"} />;
          }
          return <Text>{iconName}</Text>;
        },
        tabBarActiveTintColor: '#ff922b',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: '#1a1b1e', paddingBottom: 5},
        headerShown: false,
      })}
    >
      
      <Tab.Screen name={t("Common.wallet")} component={WalletScreen} />
      <Tab.Screen name={t("Common.mining")} component={MiningScreen} />
      <Tab.Screen name={t("Common.leader")} component={LeaderboardScreen} />
      <Tab.Screen name={t("Common.announcement")} component={AnnouncemntScreen} />
      <Tab.Screen name={t("Common.Account")} component={SettingScreen} />
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
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="Objective" component={ObjectiveScreen} />
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
    </Drawer.Navigator>
  );
}

// ✅ Root Stack (Handles Auth vs Main App)
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token); // Convert to boolean (true if token exists, false otherwise)
      } catch (error) {
        console.error('Error fetching auth token:', error);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (isLoggedIn) {
        BackHandler.exitApp(); // Exit app if on main app screen
        return true;
      }
      return false; // Allow default behavior for login/signup
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [isLoggedIn]);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#ff922b" />
      </View>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isLoggedIn ? (
            <Stack.Screen name="App" component={DrawerNavigator} />
          ) : (
            <Stack.Screen name="Auth" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast position={'bottom'} />
    </QueryClientProvider>
  );
}
