import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Clipboard,
  Modal,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import Modal from "react-native-modal"
import {Copy, ChevronDown, ChevronUp} from 'lucide-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {SetAuthToken, SetUser, USFlag} from '../../../utils/common';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import i18n from '../../../i18n';
import { t } from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { SignInUser } from '../../../services/user.services';
import { AuthContext } from '../../../authcontext';
const languages = [
  {value: 'en', label: 'ENG'},
  {value: 'cn', label: '中文'},
];

export default function PassphraseGenerator({
  onContinue,
  passphrase,
  setPassphrase,
  isSignUpLoading,
}: {
  onContinue: () => void;
  passphrase: string[];
  setPassphrase: React.Dispatch<React.SetStateAction<string[]>>;
  isSignUpLoading: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(languages[0]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const navigation = useNavigation();
   
  const {mutateAsync: siginUser, isPending} = useMutation({
    mutationFn: SignInUser,
    mutationKey: ['SIGN_USER'],
  });
  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Toast.show({
      type:"success",
      text1:"Phrase Copied",
      position:"top"
    });
  };
  const items = [
    {label: 'English', value: 'en'},
    {label: 'Spanish', value: 'es'},
    {label: 'French', value: 'fr'},
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const generatePassphrase = useCallback(async () => {
    setIsLoading(true);
    try {
      const fileName =
        language.value === 'en'
          ? 'https://www.qoyn.network/english.txt'
          : 'https://www.qoyn.network/chinese_simplified.txt';
      const response = await fetch(fileName);
      if (!response.ok) {
        throw new Error(`Failed to fetch word list: ${response.statusText}`);
      }
      const text = await response.text();
      const words = text.split('\n').filter(word => word.trim() !== '');
      const selectedWords: string[] = [];

      // Generate unique words
      const usedIndices = new Set();
      while (selectedWords.length < 12) {
        const randomIndex = Math.floor(Math.random() * words.length);
        if (!usedIndices.has(randomIndex)) {
          usedIndices.add(randomIndex);
          selectedWords.push(words[randomIndex]);
        }
      }

      setPassphrase(selectedWords);
      console.log(selectedWords)
    } catch (error) {
      console.error('Error generating passphrase:', error);
    } finally {
      setIsLoading(false);
    }
  }, [language]);
  const HandleSignup = async () => {
      // if (passphrase.trim().length < 0) {
      //   Alert.alert("Phrase Can't be Empty");
      // } else {
        try {
          console.log(passphrase.join(''))
          const phrase = passphrase.join('');
          const deviceTOken = await AsyncStorage.getItem("deviceToken")
          console.log({ phrases: phrase, type: 'register', deviceToken: deviceTOken })
          const response = await siginUser({ phrases: phrase, type: 'register', deviceToken: deviceTOken });
          console.log(response);
          if (response.success) {
            Toast.show({
              type: 'success',
              text1: 'Login Successfully',
            });3
            navigation.navigate("ReferalCode",{token: response.token})
            // login(response.token);
            SetUser(response.data);
            setModalVisible(false);
          } else {
            Toast.show({
              type: 'error',
              text1: response.message,
            });
            setModalVisible(false);
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
  useEffect(() => {
    generatePassphrase();
  }, [generatePassphrase,language]);
  const handlesetLanguage = (value) => {
    
      console.log(value)
      i18n.changeLanguage(value)
      const selectLang = languages.find((lang) => lang.value == value)
      console.log(selectLang)
      setLanguage(selectLang)
    
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          {/* Language Picker (simulating dropdown) */}
          <DropDownPicker
            open={open}
            value={value}
            items={languages}
            setOpen={setOpen}
            setValue={setValue}
            containerStyle={styles.dropdownContainer}
            ArrowUpIconComponent={({style}) => (
              <ChevronUp style={style} color={'#fff'} />
            )}
            ArrowDownIconComponent={({style}) => (
              <ChevronDown style={style} color={'#fff'} />
            )}
            style={styles.dropdown}
            dropDownDirection="BOTTOM"
            placeholder="ENG"
            placeholderStyle={{
              color: '#fff',
              fontWeight: 'bold',
            }}
            selectedItemLabelStyle={{
              color: '#fff',
            }}
            theme="DARK"
            onChangeValue={(value)=> handlesetLanguage(value)}
          />
        </View>

        <View style={styles.passphraseContainer}>
          {passphrase?.map((word, index) => (
            <View key={index} style={styles.wordContainer}>
              <Text style={{...styles.wordText, ...styles.item}}>{`${
                index + 1
              }.${(index + 1) < 10 ? " ":"" } ${word}`}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.copyButton}
          onPress={async () => {
            copyToClipboard(passphrase.join(" "))
            await AsyncStorage.setItem("passphrase",passphrase.join(' '))
          }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={styles.copyText}>
          {t("Auth.passphraseGenerator.copyAllWords")}
        </Text>
        
        <Copy size={20} color="white" />
      </View>
        </TouchableOpacity>
        <View style={styles.flexEnd}>
          <Text style={styles.disclaimerText}>
          {t("Auth.passphraseGenerator.neverShare")}
          </Text>

          <TouchableOpacity style={styles.buttonTelegram} onPress={toggleModal}>
            <Text style={styles.buttonText}>  {t("Auth.passphraseGenerator.continue")} </Text>
          </TouchableOpacity> 
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> {t("Auth.confirmationModal.title")}</Text>
            <Text style={styles.modalText2}>
            {t("Auth.confirmationModal.description1")}
            </Text>

            <View style={styles.flexbtn}>
              <TouchableOpacity style={styles.nobtn} onPress={toggleModal}>
                <Text style={styles.nobtntext}> {t("Auth.confirmationModal.no")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yesbtn}
                onPress={() =>HandleSignup()}
                
                >
                <Text style={styles.yesbtntext}> {t("Auth.confirmationModal.yes")} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  flexEnd: {
    position: 'absolute',
    bottom: 30, // Adjust the space from the bottom
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#1a1b1e',
    borderRadius: 10,
    alignItems: 'center',
    color: '#fff',
  },

  dropdownContainer: {
    width: responsiveWidth(26),
    marginBottom: 16,
    backgroundColor: '#000',
    color: '#FFF',
  },
  icontext: {
    marginVertical: 16,
  },
  dropdown: {
    backgroundColor: '#000',
    borderColor: '#d9480f',
    borderWidth: 1,
    borderRadius: 8,
    color: '#fff',
  },
  selected: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFF',
  },
  languageLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  buttonTelegram: {
    backgroundColor: '#FFF0DB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 600,
  },

  languageButton: {
    padding: 8,
    backgroundColor: '#555',
    borderRadius: 4,
    margin: 4,
  },
  selectedButton: {
    backgroundColor: '#FFA500',
    color: '#fff',
  },
  languageText: {
    color: '#fff',
    fontSize: 16,
  },
  passphraseContainer: {
    width: '100%',
    height: responsiveHeight(27),
    padding: 16,
    backgroundColor: '#444',
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row', // Enables row layout
    flexWrap: 'wrap', // Allows wrapping
    gap: 10, // Adjust spacing
    borderWidth: 1,
    borderColor: '#fff',

    justifyContent: 'space-between',
  },
  item: {
    width: responsiveWidth(30), // Ensures two items per row

    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  wordContainer: {
    marginBottom: 8,
  },
  wordText: {
    color: '#00FFFF',
    fontFamily: 'monospace',
  },
  copyButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1a0d02',
    borderRadius: 8,
    marginBottom: 16,
  },
  copyText: {
    color: '#d9480f',
    fontSize: 16,
  },
  disclaimerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    marginBottom: 26,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1a1b1e',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#fff0db',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#fff0db',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: '#fff0db',
    fontSize: 20,
    fontWeight: 700,
  },

  modalText2: {
    color: '#fff0db',
    fontSize: 17,
    marginTop: 10,
    fontWeight: 600,
    marginBottom: 20,
  },
  modalText3: {
    color: '#fff0db',
    fontSize: 17,
    marginTop: 10,
  },
  modalText4: {
    color: '#ff6b6b',
    fontSize: 17,
    marginTop: 10,
    textAlign: 'center',
  },
  nobtn: {
    backgroundColor: '#d9480f',
    // borderRadius:"50%",
    justifyContent: 'center',
    borderRadius: 7,
    width: responsiveWidth(20),
    alignItems: 'center',
  },
  yesbtn: {
    backgroundColor: '#fff0db',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontWeight: 'bold',
    borderRadius: 7,
    alignItems: 'center',
    width: responsiveWidth(20),
  },
  flexbtn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    columnGap: 20,
    marginVertical: 10,
  },
  nobtntext: {
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  yesbtntext: {},
});


