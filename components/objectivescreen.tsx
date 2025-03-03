import React, {useState, useRef, useEffect} from 'react';
import {useMutation} from '@tanstack/react-query';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  ImageBackground,
  Animated,
  Easing,
  Linking,
  Alert,
  Clipboard,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CanvasQ from './common/canvasq';
import {useNavigation} from '@react-navigation/native';
import Navbar from './common/navbar';
import {Copy, SquareCheck} from 'lucide-react-native';
import {useQuery} from '@tanstack/react-query';
import {ActiveUser, CurrentUser, SubmitCode} from '../services/user.services';
import {t} from 'i18next';
import CommonLoader from './common/commonloader';
import Toast from 'react-native-toast-message';
import {SetAuthToken, SetUser} from '../utils/common';

const ObjectiveScreen = () => {
  const navigation = useNavigation();
  const [seeMoreVisible, setSeeMoreVisible] = useState(false);
  const openLink = prefix => {
    Linking.openURL(`https://www.qoyn.network/mining.html?prefix=${prefix}`);
  };
  const [code, setCode] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const {mutateAsync: codeSubmit, isPending} = useMutation({
    mutationFn: SubmitCode,
    mutationKey: ['SUBMIT_CODE'],
  });
  const copyToClipboard = (text: string, message: string) => {
    Clipboard.setString(text);
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
    });
  };
  const CodeSubmit = async () => {
    if (code.trim().length < 0) {
      Alert.alert("Phrase Can't be Empty");
    } else {
      try {
        const response = await codeSubmit({code: code});
        console.log(response);
        if (response.success) {
          Toast.show({
            type: 'success',
            text1: 'Login Successfully',
          });
          3;
          navigation.navigate('App', {
            screen: 'Home',
            params: {screen: 'MainTabs', params: {screen: 'Mining'}},
          });
          SetAuthToken(response.token);
          SetUser(response.data);
        } else {
          Toast.show({
            type: 'error',
            text1: response.message,
          });
          navigation.navigate('App', {
            screen: 'Home',
            params: {screen: 'MainTabs', params: {screen: 'Mining'}},
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
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const {data, isLoading} = useQuery({
    queryFn: CurrentUser,
    queryKey: ['CURRENT_USER'],
  });

  const outerContentTranslateY = useRef(new Animated.Value(-100)).current; // Start above screen
  const {data: activeuserdata, isLoading: isactiveloading} = useQuery({
    queryFn: ActiveUser,
    queryKey: ['ACTIVE_USER'],
  });

  console.log(activeuserdata, 'rdegt');
  // const activepuzzle=activeuserdata.data.puzzle ;
  useEffect(() => {
    // Animate the outer content from top to its position
    Animated.timing(outerContentTranslateY, {
      toValue: 0, // Moves to original position
      duration: 1000, // 1 second
      easing: Easing.out(Easing.exp), // Smooth easing
      useNativeDriver: true,
    }).start();
  }, []);
  const translateY = useRef(new Animated.Value(-100)).current; // Start above the screen
  useEffect(() => {
    // Animate the button from top to bottom
    Animated.timing(translateY, {
      toValue: 0, // Moves to its original position
      duration: 1000, // 1 second
      easing: Easing.bounce, // Smooth bounce effect
      useNativeDriver: true,
    }).start();
  }, []);
  if (isactiveloading || isLoading) {
    return <CommonLoader />;
  }
  return (
    <ImageBackground
      source={require('../assets/img/crypt.jpeg')} // Change to your image path
      style={styles.background}
      resizeMode="cover">
      <Navbar />

      <View style={styles.container}>
        {/* Referral Code Section */}

        {/* Balance Card Section */}

        {/* Continue Button */}

        <View style={styles.centeredView}>
          <Text style={styles.modalText}>{t('ProofOfWork.objective')}</Text>

          <View style={styles.modalView}>
            <Text style={styles.modalText2}>
              {t('MiningSession.objective.description')}{' '}
              <Text style={styles.text2}>{activeuserdata.data.puzzle}</Text>
            </Text>
            <TouchableOpacity
              onPress={() => setSeeMoreVisible(!seeMoreVisible)}>
              <Text style={styles.modalText3}>
                {seeMoreVisible ? 'See Less' : 'See More'}
              </Text>
            </TouchableOpacity>
            {seeMoreVisible && (
              <View>
                <Text style={styles.title}>
                  {t('MiningSession.conditions.title')}
                </Text>

                {/* Allowed Characters */}
                <View style={styles.row}>
                  <SquareCheck color={'#ff922b'} />
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>
                      {t('MiningSession.conditions.sub1.title')}:
                    </Text>
                    <Text style={styles.value}>A–Z, a–z, 0–9</Text>
                  </View>
                </View>

                {/* Max Length */}
                <View style={styles.row}>
                  <SquareCheck color={'#ff922b'} />
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>
                      {t('MiningSession.conditions.sub2.title')}
                    </Text>
                    <Text style={styles.value}>
                      {t('MiningSession.conditions.sub2.description')}:
                    </Text>
                  </View>
                </View>

                {/* Prefix */}
                <View style={styles.row}>
                  <SquareCheck color={'#ff922b'} />
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>
                      {t('MiningSession.conditions.sub3.title')}:
                    </Text>
                    <View style={styles.copyContainer}>
                      <Text style={styles.copyText}>
                        {data.data.referralCode}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          copyToClipboard(
                            data.data.referralCode,
                            'Prefix Code Copied',
                          )
                        }>
                        <Copy color={'white'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Suffix */}
                <View style={styles.row}>
                  <SquareCheck color={'#ff922b'} />
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>
                      {t('MiningSession.conditions.sub4.title')}:
                    </Text>
                    <View style={styles.copyContainer}>
                      <Text style={styles.copyText}>
                        {data.data.suffix.suffix}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          copyToClipboard(
                            data.data.referralCode,
                            'Suffix Copied',
                          )
                        }>
                        <Copy color={'white'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Task Description */}
                <Text style={styles.description}>
                  {t('MiningSession.yourTask')} 🚀
                </Text>

                {/* Reward Section */}
                <View style={styles.rewardContainer}>
                  <Text style={styles.label}>{t('MiningSession.reward')}</Text>
                  <Text style={styles.value}>{activeuserdata.data.value}</Text>
                  <Text style={styles.label}>Qoyns</Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    {t('MiningSession.goodLuck')}
                  </Text>
                  <Text style={styles.helpText}>
                    {t('MiningSession.needHelp')}
                    <Text
                      style={[styles.helpText, styles.link]}
                      onPress={() => openLink(data.data.referralCode)}>
                      {' '}
                      {t('MiningSession.miner')}.
                    </Text>
                  </Text>
                </View>
              </View>
            )}

            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: 16,
                borderRadius: 10,
                marginTop: 16,
                borderColor: '#FFA500',
                borderWidth: 1,
              }}>
              <TextInput
                placeholder={t('MiningSession.enterSolution')}
                onChangeText={newCode => setCode(newCode)}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={styles.inputText}
              />
              <TouchableOpacity
                style={styles.submitbtn}
                // onPress={() => navigation.navigate("App",{screen:"Home",params:{screen:"MainTabs",params:{screen:"Mining"}}})}
                onPress={CodeSubmit}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                  {t('MiningSession.submit')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#000',
    position: 'relative',
  },
  background: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  outercontent: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  Toptext: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 80,
    marginBottom: 30,
  },
  seeMoreContent: {
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  flexDiv: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: responsiveWidth(80),
    height: responsiveHeight(12),
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  coinImage: {
    width: responsiveWidth(90),
    height: responsiveHeight(14),
  },
  referralSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  referralText: {
    color: '#fff',
    fontSize: 16,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  referralCode: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
  },
  card: {
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  balanceInfo: {
    justifyContent: 'space-between',
  },
  balanceHeader: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  coinIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  balanceText: {
    fontSize: 16,
    color: 'white',
  },
  balanceAmount: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 12,
  },
  currency: {
    fontSize: 18,
    color: 'gray',
  },
  amount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  decimal: {
    fontSize: 20,
    color: 'gray',
  },
  levelContainer: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'orange',
  },
  levelSubText: {
    fontSize: 12,
    color: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: -10,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    //   position: "absolute",

    backgroundColor: '#d9480f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    width: responsiveWidth(90),
    marginVertical: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
    alignItems: 'left',
    shadowColor: '#fff0db',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    textAlign: 'left',
  },

  modalText2: {
    color: '#fff0db',
    fontSize: 17,
    marginTop: 10,
    fontWeight: 600,
  },
  modalText3: {
    color: '#4dabf7',
    fontSize: 17,
    marginTop: 10,
  },
  modalText4: {
    color: '#ff6b6b',
    fontSize: 17,
    marginTop: 10,
    textAlign: 'center',
  },
  submitbtn: {
    backgroundColor: '#36383b',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontWeight: '600',
    color: '#fff',
  },
  value: {
    fontWeight: '600',
    color: '#ff922b',
  },
  text2:{
    color: '#ff922b',
    marginLeft:20,
    fontWeight:"700"

  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  copyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 15,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  helpText: {
    color: '#fff',
    lineHeight:26
  },
  link: {
    color: '#00A6FF',
    fontWeight: 'bold',
    paddingBottom: 0,
    marginBottom: 0,
  },
});

export default ObjectiveScreen;
