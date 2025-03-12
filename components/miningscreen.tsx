import React, {useState, useRef, useEffect} from 'react';

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
  Clipboard,
  Alert,
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
import {ActiveUser, CurrentUser} from '../services/user.services';
import {t} from 'i18next';
import CommonLoader from './common/commonloader';
import Toast from 'react-native-toast-message';

const MiningScreen = () => {
  
  const navigation = useNavigation();
  const [seeMoreVisible, setSeeMoreVisible] = useState(false);
  const openLink = () => {
    Linking.openURL('https://www.qoyn.network/mining.html?prefix=7kunusxk16');
  };
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const coolDownTime = 5 * 60 * 1000;
  const [loading, setLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState({minutes: 0, seconds: 0});

  const outerContentTranslateY = useRef(new Animated.Value(-100)).current;
  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Toast.show({
      type: 'success',
      text1: 'Referral code copied',
      position: 'top',
    });
  }; // Start above screen
  const {data, isLoading} = useQuery({
    queryFn: CurrentUser,
    queryKey: ['CURRENT_USER'],
  });

  useEffect(() => {
    // Animate the outer content from top to its position
    Animated.timing(outerContentTranslateY, {
      toValue: 0, // Moves to original position
      duration: 1000, // 1 second
      easing: Easing.out(Easing.exp), // Smooth easing
      useNativeDriver: true,
    }).start();
    console.log(data?.data?.lastMingTime);
    if (!data?.data?.lastMingTime) {
      // navigation.navigate("mining");
      return;
    }

    const lastSubmitTime = new Date(data?.data?.lastMingTime).getTime();
    const targetTime = lastSubmitTime + coolDownTime;
    const initialTimeLeft = targetTime - Date.now();

    if (initialTimeLeft <= 0) {
      // navigation.navigate("mining");
      return;
    }

    const initialMinutes = Math.floor((initialTimeLeft / (1000 * 60)) % 60);
    const initialSeconds = Math.floor((initialTimeLeft / 1000) % 60);
    setTimeLeft({minutes: initialMinutes, seconds: initialSeconds});

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            clearInterval(timer);
            // navigation.navigate("mining");
            return prev;
          }
          return {minutes: prev.minutes - 1, seconds: 59};
        }
        return {...prev, seconds: prev.seconds - 1};
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data]);
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
  if (isLoading) {
    return <CommonLoader />;

    console.log(data.data, 'data');
  }
  console.log(timeLeft);
  const isTimeToStart = !!(timeLeft.minutes === 0 && timeLeft.seconds === 0);

  const referalcode = data.data.referralCode;
  const totalvalue =
    data?.data?.totalValue?.referralBonus +
    data?.data?.totalValue?.referralsMiningCodeSum +
    data?.data?.totalValue?.userMiningCodeSum;

  return (
    <ImageBackground
      source={require('../assets/img/crypt.jpeg')} // Change to your image path
      style={styles.background}
      resizeMode="cover">
      <Navbar />

      <View style={styles.container}>
        <Text style={styles.Toptext}>{t('Common.mining')}</Text>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <View style={styles.contain}>
            {/* Timer absolute position adjusted */}
            {!isTimeToStart && (
              <View style={[styles.timerContainer]}>
                <Text style={styles.timerText}>{t('Mining.nextMining')}:</Text>
              </View>
            )}

            <CanvasQ />

            {/* Timer absolute position adjusted */}
            {/* {!isTimeToStart && (
              <View style={[styles.timerContainer2]}>
                <Text style={styles.countdownText}>
                  {timeLeft.minutes} :{' '}
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </Text>
              </View>
            )} */}
          </View>
          {/* <Image
          source={require('../assets/img/coin_color.png')}
          style={styles.coinImage}
          resizeMode="contain"
        /> */}
        </View>

        {/* Referral Code Section */}
        {!isTimeToStart && (
        <View style={styles.referralSection}>
        <View style={[styles.timerContainer2]}>
                <Text style={styles.countdownText}>
                  {timeLeft.minutes} :{' '}
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </Text>
              </View>
        </View>
           )}

        {/* Balance Card Section */}

        <LinearGradient
          colors={['#000000', 'rgba(0,0,0,0.5)']}
          style={styles.card}>
          <View style={styles.balanceInfo}>
            <Image
              source={require('../assets/img/mine.png')}
              style={styles.coinImage}
              resizeMode="cover"
            />

            {/* <Image source={require('./assets/coin_plain.png')} style={styles.coinIcon} /> */}
            <Animated.View
              style={[
                styles.outercontent,
                {transform: [{translateY: outerContentTranslateY}]},
              ]}>
              <View style={styles.flexDiv}>
                <View style={styles.balanceHeader}>
                  <Text style={styles.balanceText}>{t('Wallet.myWallet')}</Text>
                  <View style={styles.balanceAmount}>
                    <Text style={styles.currency}>QYN</Text>
                    <Text style={styles.amount}>{totalvalue}</Text>
                    <Text style={styles.decimal}>.00</Text>
                  </View>
                </View>
                <View style={styles.levelContainer}>
                  <Text style={styles.levelText}>Level 1</Text>
                  <Text style={styles.levelSubText}>
                    {t('Common.platinum')}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>
        </LinearGradient>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Animated.View
            style={[styles.buttonContainer, {transform: [{translateY}]}]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Objective')}
              disabled={!isTimeToStart || loading}>
              {loading ? (
                <CommonLoader />
              ) : !isTimeToStart ? (
                <View style={styles.containerbtn}>
                  <Text style={styles.text}>Mining Session starting soon</Text>
                  <Text style={styles.timer}>
                    {timeLeft.minutes} :{' '}
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>{t('Common.continue')}</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop:6
  },
  outercontent: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  Toptext:{
color:"#fff",
fontSize:22,
fontWeight:"bold",
marginTop:80,
marginBottom:30
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
    marginBottom: 40,
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
    marginTop:30
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
    bottom: -20,
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
  },
  link: {
    color: '#00A6FF',
    fontWeight: 'bold',
    paddingBottom:0,
    marginBottom:0
  },
  contain: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    position: 'relative',
  },
  timerContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top:responsiveHeight(-1)
  },
  timerContainer2: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom:responsiveHeight(-2)
  },
  timerText: {
    fontSize: 14,
    color: 'white',
  },
  countdownText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  containerbtn: {
    flexDirection: 'row', // Replaces `flex`
    alignItems: 'center', // Replaces `items-center`
    justifyContent: 'center', // Replaces `justify-center`
    gap: 8, // Replaces `gap-2`
  },
  text: {
    fontSize: 16, // Adjust as needed
    color: 'white',
  },
  timer: {
    fontSize: 12, // Replaces `text-xs`
    color: 'white',
  },
});

export default MiningScreen;
