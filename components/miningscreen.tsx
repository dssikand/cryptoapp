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
  Easing,Linking
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
import { Copy, SquareCheck } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { ActiveUser, CurrentUser } from '../services/user.services';
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
  const outerContentTranslateY = useRef(new Animated.Value(-100)).current; // Start above screen
  const {data, isLoading} = useQuery({
    queryFn: CurrentUser,
    queryKey:['CURRENT_USER']
  }) 
  const referalcode=!isLoading ? data.data.referralCode :''
  const totalvalue= !isLoading ? data?.data?.totalValue?.referralBonus + data?.data?.totalValue?.referralsMiningCodeSum + data?.data?.totalValue?.userMiningCodeSum :0
  console.log(totalvalue);
  
  
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
  if(!isLoading){
    console.log(data.data,"data")
  }
  return (
    <ImageBackground
      source={require('../assets/img/crypt.jpeg')} // Change to your image path
      style={styles.background}
      resizeMode="cover">
        <Navbar/>

      <View style={styles.container}>
      <Text style={styles.Toptext}>Mining</Text>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          {/* <Image
          source={require('../assets/img/coin_color.png')}
          style={styles.coinImage}
          resizeMode="contain"
        /> */}
          <CanvasQ />
        </View>

        {/* Referral Code Section */}
        <View style={styles.referralSection}>
          
          <Text style={styles.referralText}>Referral Code</Text>
          <View style={styles.referralCodeContainer}>
              <Text style={styles.referralCode}>{referalcode} <Copy color={"white"} size={20} style={styles.iconcopy}/></Text>
             
            </View>
          <View style={styles.codeContainer}>
            <TouchableOpacity>
              {/* <Svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
              <Path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
            </Svg> */}
            </TouchableOpacity>
          </View>
        </View>

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
                  <Text style={styles.balanceText}>Your balance</Text>
                  <View style={styles.balanceAmount}>
                    <Text style={styles.currency}>QYN</Text>
                    <Text style={styles.amount}>0</Text>
                    <Text style={styles.decimal}>.00</Text>
                  </View>
                </View>
                <View style={styles.levelContainer}>
                  <Text style={styles.levelText}>Level 1</Text>
                  <Text style={styles.levelSubText}>Platinum</Text>
                </View>
              </View>
            </Animated.View>
          </View>
        </LinearGradient>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Animated.View
            style={[styles.buttonContainer, {transform: [{translateY}]}]}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Objective")}>
              <Text style={styles.buttonText} >
                Continue
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Objective</Text>
              <Text style={styles.modalText2}>
                Find a string that produces a SHA256 hash starting with
              </Text>
              <TouchableOpacity onPress={() => setSeeMoreVisible(!seeMoreVisible)}>
            <Text style={styles.modalText3}>
              {seeMoreVisible ? 'See Less' : 'See More'}
            </Text>
          </TouchableOpacity>
          {seeMoreVisible && (
            <View>
           <Text style={styles.title}>Conditions</Text>

           {/* Allowed Characters */}
           <View style={styles.row}>
             <SquareCheck color={"#ff922b"}/>
             <View style={styles.textContainer}>
               <Text style={styles.label}>Allowed Characters:</Text>
               <Text style={styles.value}>A–Z, a–z, 0–9</Text>
             </View>
           </View>
     
           {/* Max Length */}
           <View style={styles.row}>
             <SquareCheck color={"#ff922b"} />
             <View style={styles.textContainer}>
               <Text style={styles.label}>Max Length:</Text>
               <Text style={styles.value}>70 characters</Text>
             </View>
           </View>
     
           {/* Prefix */}
           <View style={styles.row}>
             <SquareCheck  color={"#ff922b"}/>
             <View style={styles.textContainer}>
               <Text style={styles.label}>Prefix:</Text>
               <View style={styles.copyContainer}>
                 <Text style={styles.copyText}>7kunusxk16</Text>
                 <Copy color={"white"} />
               </View>
             </View>
           </View>
     
           {/* Suffix */}
           <View style={styles.row}>
             <SquareCheck color={"#ff922b"}/>
             <View style={styles.textContainer}>
               <Text style={styles.label}>Suffix:</Text>
               <View style={styles.copyContainer}>
                 <Text style={styles.copyText}>1234</Text>
                 <Copy color={"white"}/>
               </View>
             </View>
           </View>
     
           {/* Task Description */}
           <Text style={styles.description}>
             Your task is to generate a valid string that meets these criteria. 🚀
           </Text>
     
           {/* Reward Section */}
           <View style={styles.rewardContainer}>
             <Text style={styles.label}>Reward</Text>
             <Text style={styles.value}>70</Text>
             <Text style={styles.label}>Qoyns</Text>
           </View>
     
           {/* Footer */}
           <View style={styles.footer}>
             <Text style={styles.footerText}>Good luck mining Qoyn!</Text>
             <Text style={styles.helpText}>
               Need help? Use our
               <TouchableOpacity onPress={openLink}>
               <Text style={styles.link}> miner.</Text>
</TouchableOpacity>
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
                  placeholder="Enter your solution"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  style={styles.inputText}
                />
                <TouchableOpacity
                  style={styles.submitbtn}
                  onPress={toggleModal}>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
});

export default MiningScreen;
