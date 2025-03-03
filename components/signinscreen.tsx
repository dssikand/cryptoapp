
import {useMutation} from '@tanstack/react-query';
import {SignInUser} from '../services/user.services';
import Toast from 'react-native-toast-message';
import {SetAuthToken, SetUser} from '../utils/common';
import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { t } from "i18next";
import { signInWithPassphrase } from "./api/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../authcontext';

interface SignInPassphraseStepProps {
  value: string;
  loading: boolean;
  onValueChange: (value: string) => void;
  onSignIn: () => void;
}

export default function SignInPassphraseStep({
  value,
  loading,
  onValueChange,
  onSignIn,
}: SignInPassphraseStepProps) {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const {mutateAsync: siginUser, isPending} = useMutation({
    mutationFn: SignInUser,
    mutationKey: ['SIGN_USER'],
  });
  const { login } = useContext(AuthContext);
  const HandleLogin = async () => {
    if (text.trim().length < 0) {
      Alert.alert("Phrase Can't be Empty");
    } else {
      try {
        
        const phrase = text.split(' ').join('');
        await AsyncStorage.setItem("passphrase",phrase)
        console.log(phrase)
        const response = await siginUser({phrases: phrase, type: 'login'});
        console.log(response);
        if (response.success) {
          Toast.show({
            type: 'success',
            text1: 'Login Successfully',
          });3
          navigation.navigate('App', {screen: 'Home', params: {screen: 'MainTabs', params: {screen: 'Wallet'}}, });
          
          login(response.token)
          SetUser(response.data);
        } else {
          Toast.show({
            type: 'error',
            text1: response.message,
          });
        }
      } catch (e: any) {
        console.log(e.response.data);
        Toast.show({
          type: 'error',
          text1: e.response.data.message,
        });
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>{t("Auth.passphraseSignIn")}</Text>
        <Text style={styles.subtitle}>{t("Auth.enterPassphrase")}</Text>

        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={6} // Control the number of visible lines
          placeholder="Passphrase"
          placeholderTextColor={'#fff'}
          value={text}
          onChangeText={newText => setText(newText)}
        />

        <TouchableOpacity
          style={[styles.button, !value && styles.buttonDisabled]}
          onPress={HandleLogin}
          disabled={text.trim().length == 0}>
          {isPending ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>{t("Auth.passphraseSignIn")}</Text>
          )}
        </TouchableOpacity>
      </View>
        
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")} style={styles.linkContainer}>
        <Text style={styles.text}>{t("Auth.newUser?")} </Text>
        <Text style={styles.linkText}>{t("Auth.createYourQoynAccount")}</Text>
      </TouchableOpacity>
      </View>

     
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#000",
  },
  textArea: {
    width: responsiveWidth(80),
    height: responsiveHeight(10),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top",
    marginBottom: 16,
    color: "#fff",
    backgroundColor: "#313334",
  },
  box: {
    width: "100%",
    padding: 20,
    backgroundColor: "#171a1d",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: "center",
    borderColor: "#d9480f",
    borderWidth: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFF0DB",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  linkText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
});
