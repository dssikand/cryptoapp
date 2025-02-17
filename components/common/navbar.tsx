import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// import { useUserContext } from "../context/UserContext";
// import { UserAPI } from "../api/user";
// import {
//   Ionicons,
//   MaterialIcons,
//   FontAwesome5,
//   Feather,
// } from "@expo/vector-icons";

// Dummy screen components
const HomeScreen = () => <ScreenTemplate title="Home" />;
const MiningScreen = () => <ScreenTemplate title="Mining" />;
const WalletScreen = () => <ScreenTemplate title="Wallet" />;
const GroupScreen = () => <ScreenTemplate title="Group" />;
const LeaderboardScreen = () => <ScreenTemplate title="Leaderboard" />;
const AnnouncementScreen = () => <ScreenTemplate title="Announcement" />;
const ProfileScreen = () => <ScreenTemplate title="My Account" />;
const SignInScreen = () => <ScreenTemplate title="Sign In" />;
const SignUpScreen = () => <ScreenTemplate title="Sign Up" />;

const ScreenTemplate = ({ title }: { title: string }) => (
  <View style={styles.screen}>
    <Text style={styles.screenText}>{title} Screen</Text>
  </View>
);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Navbar = () => {
  // const { user, logout } = useUserContext();
  const [loading, setLoading] = useState(false);

  // const handleSignOut = async () => {
  //   setLoading(true);
  //   try {
  //     await UserAPI.signOut();
  //     logout();
  //   } catch (error) {
  //     console.error("Sign out failed", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          drawerStyle: { backgroundColor: "#000" },
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#888",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }}
        />
        {user && (
          <>
            <Drawer.Screen
              name="Mining"
              component={MiningScreen}
              options={{
                drawerIcon: ({ color }) => (
                  <FontAwesome5 name="user-secret" size={20} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Wallet"
              component={WalletScreen}
              options={{
                drawerIcon: ({ color }) => (
                  <MaterialIcons name="account-balance-wallet" size={20} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Group"
              component={GroupScreen}
              options={{
                drawerIcon: ({ color }) => (
                  <Feather name="users" size={20} color={color} />
                ),
              }}
            />
          </>
        )}
        <Drawer.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="bar-chart" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Announcement"
          component={AnnouncementScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="bell" size={20} color={color} />
            ),
          }}
        />
        {user ? (
          <>
            <Drawer.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                drawerIcon: ({ color }) => (
                  <Ionicons name="person" size={20} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Logout"
              component={() => (
                <View style={styles.screen}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
                      <Text style={styles.logoutText}>Sign Out</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              options={{
                drawerIcon: ({ color }) => (
                  <MaterialIcons name="logout" size={20} color={color} />
                ),
              }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="Sign In"
              component={SignInScreen}
              options={{
                drawerIcon: ({ color }) => (
                  <Ionicons name="log-in" size={20} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Sign Up"
              component={SignUpScreen}
              options={{
                drawerIcon: ({ color }) => (
                  <Ionicons name="person-add" size={20} color={color} />
                ),
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  screenText: {
    color: "#fff",
    fontSize: 24,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "rgba(204, 75, 24, 1)",
    borderRadius: 5,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Navbar;
