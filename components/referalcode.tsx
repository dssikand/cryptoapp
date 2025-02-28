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
import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { checkReferalCode, UserRegister } from '../services/user.services';
import CommonLoader from './common/commonloader';
import { useMutation } from '@tanstack/react-query';
import { GetUser, SetAuthToken, SetUser } from '../utils/common';
import Toast from 'react-native-toast-message';

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
  const [refferedby,setRefferedby] = useState('')
  const {mutateAsync: userregister, isPending} = useMutation({
    mutationFn: UserRegister,
    mutationKey: ['USER_REGISTER'],
  }) 
  const {mutateAsync: checkRefer,isPending: checkReferPending} = useMutation({
    mutationFn: checkReferalCode,
    mutationKey: ['CHECK_REFER']
  })
  const HandleRegister = async () => {
        // if (passphrase.trim().length < 0) {
        //   Alert.alert("Phrase Can't be Empty");
        // } else {
          const user = await GetUser()
          console.log(user)
          try {
            if(refferedby.trim() != ''){
              const refreresponse = await checkRefer({referralCode: refferedby})
              console.log(refreresponse)
              if(refreresponse.success){
                const response = await userregister({name: "", refferedby: refferedby,country:"",_id: user._id,isProfileCompleted: true});
                console.log(response);
                if (response.success) {
                  Toast.show({
                    type: 'success',
                    text1: 'Login Successfully',
                  });3
                  navigation.navigate("App",{screen:"Home",params:{screen:"MainTabs",params:{screen:"Wallet"}}})
                  
              
                } else {
                  Toast.show({
                    type: 'error',
                    text1: response.message,
                  });
                }
              }else{
                Toast.show({
                  type:"error",
                  text1: refreresponse.message
                })
              }
            }else{
              const response = await userregister({name: "", refferedby: refferedby,country:"",_id: user._id,isProfileCompleted: true});
              console.log(response);
              if (response.success) {
                Toast.show({
                  type: 'success',
                  text1: 'Login Successfully',
                });3
                navigation.navigate("App",{screen:"Home",params:{screen:"MainTabs",params:{screen:"Wallet"}}})
                
            
              } else {
                Toast.show({
                  type: 'error',
                  text1: response.message,
                });
              }
            }
           
          } catch (e: any) {
            console.log(e.response.data);
            Toast.show({
              type: 'error',
              text1: e.response.data.message,
            });
          }
        // }
      };
  
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.skipButton }  onPress={() => HandleRegister()} >
          <Text style={styles.skipText}>   {t("Account.skip")}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{t("Common.referralCode")}</Text>
        <Text style={styles.description}>
        {t("Account.enterReferralCode.intro1")}<Text style={styles.highlight}>{t("Account.enterReferralCode.intro2")}</Text> {t("Account.enterReferralCode.intro3")}.
        </Text>
        <Text style={styles.description}>
        {t("Account.signUpByReferral.intro1")}
          <Text style={styles.highlight}>{t("Account.signUpByReferral.intro2")}</Text>.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter referral code"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            maxLength={10}
            onChangeText={setRefer => setRefferedby(setRefer)}

          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => HandleRegister()} >
          <Text style={styles.submitText}>{t("Account.submitCode")}</Text>
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


