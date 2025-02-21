import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import { Bell, Building2, HomeIcon, LucideHome, Pickaxe, Settings, Wallet } from 'lucide-react-native';

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

// Create Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// ✅ Bottom Tab Navigator (Only for Logged-in Users)
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
         if (route.name === 'Wallet') {
            iconName = <Wallet color={focused ? "#ff922b" : "#adb5bd"} />;
          } else if (route.name === 'Mining') {
            iconName = <Pickaxe color={focused ? "#ff922b" : "#adb5bd"} />;
          } else if (route.name === 'Leader') {
            iconName = <Building2 color={focused ? "#ff922b" : "#adb5bd"} />;
          } else if (route.name === 'Announcement') {
            iconName = <Bell color={focused ? "#ff922b" : "#adb5bd"} />;
          } else if (route.name === 'Account') {
            iconName = <Settings color={focused ? "#ff922b" : "#adb5bd"} />;
          }
          return <Text>{iconName}</Text>;
        },
        tabBarActiveTintColor: '#ff922b',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#1a1b1e', paddingBottom: 5 },
        headerShown: false,
      })}
    >
      
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Mining" component={MiningScreen} />
      <Tab.Screen name="Leader" component={LeaderboardScreen} />
      <Tab.Screen name="Announcement" component={AnnouncemntScreen} />
      <Tab.Screen name="Account" component={SettingScreen} />
    </Tab.Navigator>
  );
}

// ✅ Auth Stack (For Login & Signup - No Bottom Tabs)
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="Objective" component={ObjectiveScreen} />

    </Stack.Navigator>
  );
}

// ✅ Drawer Navigation (Includes Main Stack)
function DrawerNavigator() {
  return (
    <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
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
  const isLoggedIn = false; // Replace with actual authentication state

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {isLoggedIn ? (
          <Stack.Screen name="App" component={DrawerNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )} */}
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
