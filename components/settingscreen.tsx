/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {t} from 'i18next';
import {Info,CircleArrowLeft} from 'lucide-react-native';
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Modal,
  Clipboard,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Svg, {Path} from 'react-native-svg';
import RecoveryModal from './common/recoveverymodal';
import Toast from 'react-native-toast-message';
import passphrase from './common/auth/passphrase';
import {useNavigation} from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CurrentUser, deleteUser } from '../services/user.services';
import CommonLoader from './common/commonloader';
import { AuthContext } from '../authcontext';

export default function SettingScreen() {
  const [activeSection, setActiveSection] = useState('Recovery Password');

  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [recoveryphase, setRecoveryPhase] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    async function setRecoveryphase() {
      const recoveryphase = await AsyncStorage.getItem('passphrase');
      setRecoveryPhase(recoveryphase);
    }
    setRecoveryphase();
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <CircleArrowLeft color={'white'} size={25} />
      </TouchableOpacity>
      <Text style={styles.Toptext}>{t('Common.settings')}</Text>


      <View style={styles.rightPlaceholder} /> {/* Empty space on the right */}
    </View>

      {/* Sidebar Buttons */}
      <View style={styles.sidebar}>
        {[t('Account.recoveryPassword'), t('Account.deleteAccount')].map(
          section => (
            <TouchableOpacity
              key={section}
              style={[
                styles.button,
                activeSection === section && styles.activeButton,
              ]}
              onPress={() => setActiveSection(section)}>
              <Text
                style={[
                  styles.buttonText,
                  activeSection === section && styles.activeButtonText,
                ]}>
                {section}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>

      {/* Render Content Based on Active Section */}
      <View style={styles.profileContainer}>
        {activeSection === 'Recovery Password' && (
          <RecoveryPassword phrase={recoveryphase} />
        )}
        {activeSection === 'Delete Account' && <DeleteAccount />}
      </View>
    </ScrollView>
  );
}

// **Account Info Component**

// **Recovery Password Component**
const RecoveryPassword = ({phrase}) => {
  const [isHidden, setIsHidden] = useState(false);
  const checkRecoveryPhrase = async () => {
    const phrase = await AsyncStorage.getItem('passphrase');
    if(phrase == null){
      setIsHidden(true);
    }else{
      setIsHidden(false);
    }
  };
  useEffect(() => {
    async function Checkphrase(){
      checkRecoveryPhrase();
    }
    Checkphrase();
  }, []);
  const handleHidePassphrase = async () => {
    try {
      await AsyncStorage.removeItem('passphrase'); // Remove from AsyncStorage
      setIsHidden(true); // Hide the passphrase in UI
      Toast.show({
        type: 'success',
        text1: 'Recovery Password Hidden',
        position: 'top',
      });
    } catch (error) {
      console.error('Error hiding passphrase:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to hide recovery password',
        position: 'top',
      });
    }
  };
  const copyToClipboard = text => {
    Clipboard.setString(text);
    Toast.show({
      type: 'success',
      text1: 'Recovery Password copied',
      position: 'top',
    });
  };
  return (
    <>
      {!isHidden && (
        <View style={styles.card}>
          {/* Header Section */}
          <View>
            <View style={styles.betweenText}>
              <Text style={styles.headerText}>
                {t('Account.recoveryPassword')}
              </Text>
              <View style={styles.iconWrapper}>
                <Info size={20} color="#E03000" />
              </View>
            </View>
            <Text style={styles.description}>
              Use your recovery password to load your account on new devices.
            </Text>
          </View>

          <View style={styles.recoveryBox}>
            <Text style={styles.recoveryText}>{phrase}</Text>
          </View>
          <TouchableOpacity
            style={styles.copyButton}

            onPress={async () => {
              copyToClipboard(phrase);
              await AsyncStorage.setItem('passphrase', phrase.join(' '));
            }}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.hideSection}>
        <View>
          <Text style={styles.hideTitle}>Hide Recovery Password</Text>
          <Text style={styles.hideDescription}>
            Permanently hide your recovery password on this device.
          </Text>
        </View>
        <TouchableOpacity style={styles.hideButton} onPress={handleHidePassphrase}>
          <Text style={styles.hideButtonText}>Hide</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

// **Delete Account Component**
const DeleteAccount = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { mutateAsync: deleteUseraccount, isPending } = useMutation({
    mutationFn: deleteUser,
  });
  const { logout } = useContext(AuthContext)
  const { data, isLoading } = useQuery({
    queryFn: CurrentUser,
    queryKey: ['CURRENT_USER']
  });
  console.log(data, "CURRENTUSER DELETE")
  const HandleDelete = async () => {
    try {
      const phrasehash = data?.data?.passphraseHash
      const response = await deleteUseraccount({
        passphraseHash: "delete" + phrasehash,
      });
      logout()
      Toast.show({
        type: 'success',
        text1: 'Account Has Been deleted',
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong with delete Account',
      });
    }
  };
  if (isLoading) {
    return <CommonLoader />;
  }
  return (
    <>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          Warning: This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.deleteButtonText}>Delete My Account</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> {t('Account.assureDelete')}</Text>

            <View style={styles.flexbtn}>
              <TouchableOpacity style={styles.nobtn} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.nobtntext}> {t('Account.cancel')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yesbtn}
                onPress={() => HandleDelete()}

              >
                <Text style={styles.yesbtntext}> {isPending ? <ActivityIndicator /> : <Text>{t('Account.confirm')}</Text>} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};


// **Editable Profile Field Component**
const ProfileField = ({label, value, onChange}: any) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fieldContent}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            autoFocus
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <Text style={styles.fieldText}>{value}</Text>
        )}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}>
          <Svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round">
            <Path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <Path d="M13.5 6.5l4 4" />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// **Styles**
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#000', // Black background
  //   // padding: 20,
  // },
  betweenText: {
    width: responsiveWidth(80),
    flexDirection: 'row',
    gap:10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Toptext: {
    // color: '#fff',
    // fontSize: 22,
    // fontWeight: 'bold',
    // marginTop: Platform.OS == 'ios' ? 45 : 20,
    // marginBottom: 30,
    // textAlign: 'center',
    // flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 45 : 0,
  },
  sidebar: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 4,
    borderColor: 'transparent',
    textAlign: 'center',
  },
  activeButton: {
    borderColor: '#FF7F00',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    textAlign: 'center',
    width: responsiveWidth(40),
  },
  activeButtonText: {
    color: '#FF7F00',
  },
  profileContainer: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF7F00',
  },
  infoContainer: {
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 4,
  },
  fieldContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
  },
  fieldText: {
    color: '#FFF',
    fontSize: 18,
  },
  input: {
    color: '#FFF',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#FF7F00',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#FF7F00',
    padding: 6,
    borderRadius: 16,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  resetButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textrecove: {
    color: '#ff922b',
    fontWeight: 'bold',
    fontSize: 22,
  },
  avatarContainer: {
    alignSelf: 'center', // Center the avatar horizontally
    position: 'relative',
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  editButton2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF7F00',
    padding: 8,
    borderRadius: 20,
  },
  card: {
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    // borderRadius: 16,
    // borderWidth: 1,
    // borderColor: 'rgba(224, 48, 0, 0.3)',
    // padding: 20,
    borderBottomWidth: 1,
    borderColor: '#4B5563',

  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconWrapper: {
    backgroundColor: 'rgba(224, 48, 0, 0.2)',
    padding: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  description: {
    color: '#ced4da',
    marginBottom: 20,
  },
  recoveryBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  recoveryText: {
    color: '#06B6D4',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  copyButton: {
    backgroundColor: '#ff922b',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    width: responsiveWidth(20),
    marginBottom: 20,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  hideSection: {
    marginTop: 30,
    paddingTop: 20,

    flexDirection: 'column',
    alignItems: 'left',
  },
  hideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  hideDescription: {
    color: '#ced4da',
    fontSize: 14,
    marginTop: 10,
  },
  hideButton: {
    borderWidth: 1,
    borderColor: '#E03000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'transparent',
    width: responsiveWidth(18),
    textAlign: 'center',
    marginTop: 20,
  },
  hideButtonText: {
    color: '#E03000',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#1A1B1E',
    // borderRadius: 16,
    padding: 24,

    // maxWidth: 400,
    width: responsiveWidth(100),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(153, 27, 27, 0.3)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 16,
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4B5563',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },
  cancelText: {
    color: '#D1D5DB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 50, // Ensures left alignment
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: Platform.OS == "ios" ? 10 : 0
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1, // Centers the text
  },
  rightPlaceholder: {
    width: 50, // Keeps the right side empty
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
