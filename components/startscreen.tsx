import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button ,TextInput} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
export default function StartScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.orangebox}>
      <Text style={styles.title}>Qoyn</Text>

      </View>
     
      <View style={styles.box}>
      <TouchableOpacity
          style={styles.buttonTelegram}
          onPress={() => navigation.navigate("SignInScreen")}
        >
          <Text style={styles.buttonText}>Sign in </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTelegram2}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={styles.buttonText2}>Sign Up </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  box: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
   
  },
  labeltext:{
    color:"#000",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color:"#fff",
    justifyContent:"center",
    alignItems:"center",
    
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    marginBottom: 10,
   fontSize:18,

  },
  buttonText2:{
   color:"#FFF0DB",
   fontSize:18,
  },
  orangebox:{
    backgroundColor:"#d9480f",
    borderRadius:"50%",
    width: responsiveWidth(38),
    height: responsiveHeight(17),
    justifyContent:"center",
    marginBottom:20,

  },
  buttonTelegram: {
    backgroundColor: "#FFF0DB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom:20,
  },
  buttonTelegram2: {
    borderColor: "#d9480f",
    borderWidth:2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom:20,
  },
});
