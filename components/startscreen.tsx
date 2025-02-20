import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export default function StartScreen() {
  const navigation = useNavigation();

  // Animation References
  const logoScale = useRef(new Animated.Value(0)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;
  const buttonSlide = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Logo Animation (Scale In)
    Animated.spring(logoScale, {
      toValue: 1,
      speed: 2,
      bounciness: 10,
      useNativeDriver: true,
    }).start();

    // Button Animation (Fade In + Slide Up)
    Animated.timing(buttonFade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonSlide, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground source={require("../assets/img/crypt.jpeg")} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        {/* Animated Logo */}
        <View style={styles.logoContainer}>
          <Animated.View style={[styles.orangebox, { transform: [{ scale: logoScale }] }]}>
            <Text style={styles.title}>Qoyn</Text>
          </Animated.View>
        </View>

        {/* Animated Buttons */}
        <Animated.View style={[styles.buttonContainer, { opacity: buttonFade, transform: [{ translateY: buttonSlide }] }]}>
          <TouchableOpacity style={styles.buttonTelegram} onPress={() => navigation.navigate("Auth", { screen: "SignIn" })}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonTelegram2} onPress={() => navigation.navigate("Auth", { screen: "SignUp" })}>
            <Text style={styles.buttonText2}>New User Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orangebox: {
    backgroundColor: "#d9480f",
    borderRadius: 100, // Circular shape
    width: responsiveWidth(38),
    height: responsiveHeight(17),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50, // Adjust to fit screen properly
  },
  buttonTelegram: {
    borderColor: "#d9480f",
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: responsiveWidth(90),
    alignItems: "center",
    marginBottom: 15,
  },
  buttonTelegram2: {
    backgroundColor: "#FFF0DB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF0DB",
    fontSize: 18,
  },
  buttonText2: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

