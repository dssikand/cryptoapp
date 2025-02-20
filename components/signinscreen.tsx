import React,{useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

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
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Passphrase Sign In</Text>
        <Text style={styles.subtitle}>Enter your passphrase to sign in to your account.</Text>

        <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={6} // Control the number of visible lines
        placeholder="Passphrase"
        placeholderTextColor={"#fff"}
        value={text}
        onChangeText={(newText) => setText(newText)}
      />


        <TouchableOpacity
          style={[styles.button, !value && styles.buttonDisabled]}
          // onPress={onSignIn}
          onPress={() => navigation.navigate("App",{screen:"Home",params:{screen:"MainTabs",params:{screen:"Wallet"}}})}
        >
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Passphrase Sign In</Text>}
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")} style={styles.linkContainer}>
        <Text style={styles.text}>New User? </Text>
        <Text style={styles.linkText}>Create an account</Text>
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
    height:responsiveHeight(10),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top", // This ensures text starts from the top of the input
    marginBottom:16,
    color:"#fff",
    backgroundColor:"#313334",
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
    borderColor:"#d9480f",
    borderWidth:2,
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
//   input: {
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 16,
//     marginBottom: 15,
//   },
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
