import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation
import PassphraseGenerator from "./common/auth/passphrase";
import { t } from "i18next";
const SignUpScreen = ({

  isSignUpLoading,
  onContinue,
}: {
  isSignUpLoading: boolean;
  onContinue: () => void;
}) => {
  const navigation = useNavigation();
 const [  passphrase,
  setPassphrase] = useState([])
  return (
    <View style={styles.container}>
      <PassphraseGenerator
        onContinue={onContinue}
        passphrase={passphrase}
        setPassphrase={setPassphrase}
        isSignUpLoading={isSignUpLoading}
      />

      {isSignUpLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.text}>
         {t("Auth.alreadyHaveAccount")}
          <TouchableOpacity
            // onPress={() => {
            //   navigation.navigate("SignIn", { step: "passphrase" }); // Assuming "SignIn" is the name of your sign-in screen
            // }}
          >
            <Text style={styles.link}>  {t("Auth.signInWithPassphrase")}</Text>
          </TouchableOpacity>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000",

  },
  text: {
    textAlign: "center",
    color: "#333",
  },
  link: {
    color: "#1e90ff", // Blue color for the link
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;
