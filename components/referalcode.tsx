import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface SignInPassphraseStepProps {
  value: string;
  loading: boolean;
  onValueChange: (value: string) => void;
  onSignIn: () => void;
}

export default function ReferalCode({
  value,
  loading,
  onValueChange,
  onSignIn,
}: SignInPassphraseStepProps) {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.skipButton }  onPress={() => navigation.navigate("App",{screen:"Home",params:{screen:"MainTabs",params:{screen:"Wallet"}}})} >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Referral Code</Text>
        <Text style={styles.description}>
          Enter the <Text style={styles.highlight}>referral code</Text> of the
          person who referred you.
        </Text>
        <Text style={styles.description}>
          Sign up by referral entitles you to a{' '}
          <Text style={styles.highlight}>20 Qoyn instant bonus</Text>.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter referral code"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            maxLength={10}
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate("App",{screen:"Home",params:{screen:"MainTabs",params:{screen:"Wallet"}}})} >
          <Text style={styles.submitText}>Submit Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
  textArea: {
    width: responsiveWidth(80),
    height: responsiveHeight(10),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top', // This ensures text starts from the top of the input
    marginBottom: 16,
    color: '#fff',
    backgroundColor: '#313334',
  },
  box: {
    width: '100%',
    padding: 20,
    backgroundColor: '#171a1d',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
    alignItems: 'center',
    borderColor: '#d9480f',
    borderWidth: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFF0DB',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
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
    width: '100%',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  skipText: {
    color: 'gray',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  highlight: {
    color: '#00bcd4',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'rgba(75, 75, 75, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 8,
    height: 44,
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
