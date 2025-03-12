import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import {WalletCard} from './common/walletcard';
import {useNavigation} from '@react-navigation/native';
import Navbar from './common/navbar';
import {GetUser} from '../utils/common';
import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { CurrentUser } from '../services/user.services';

export function WalletScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const {data, isLoading} = useQuery({
    queryFn: CurrentUser,
    queryKey: ['CURRENT_USER'],
  });
  useEffect(() => {
    async function SetUser() {
      const user = await GetUser();
      setUser(user);
    }
    SetUser();
  }, []);
  console.log(data);
  return (
    <ImageBackground
      source={require('../assets/img/crypt.jpeg')} // Change to your image path
      style={styles.background}
      resizeMode="cover">
      <Navbar />
      <View style={styles.container}>
        {/* Wallet Card with Fade-in Animation */}
        <Animatable.View animation="fadeInUp" duration={1200} delay={500}>
          <WalletCard
            refrealCode={data?.data?.referralCode}
            totalValue={data?.data?.totalValue}
          />
        </Animatable.View>

        {/* Levels Section */}
        <View style={styles.container2}>
          {['Level 1', 'Level 2', 'Level 3', 'Level 4'].map((level, index) => (
            <Animatable.View
              key={level}
              animation="zoomIn"
              delay={index * 200}
              duration={1000}
              style={[styles.level, index === 0 ? styles.activeLevel : null]}>
              <Text
                style={[styles.text, index === 0 ? styles.activeText : null]}>
                {level}
              </Text>
            </Animatable.View>
          ))}
        </View>

        {/* Activity Section with Bounce Animation */}
        <View style={styles.containercard}>
          {[t("Wallet.minedCoins"), t("Wallet.referralsBonus")].map((activity, index) => (
            <Animatable.View
              key={activity}
              animation="bounceIn"
              delay={index * 300}
              duration={1500}
              style={styles.card}>
              <LinearGradient
                colors={['rgba(240, 100, 0, 0.2)', 'transparent']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.gradient}
              />
              <View style={styles.cardContent}>
                <View style={styles.activity}>
                  <Image
                    source={require('../assets/img/coin.png')} // Path to local image
                    style={styles.imageText}
                  />
                  <Text style={styles.activityText}>{activity}</Text>
                </View>
                <View style={styles.amount}>
                  <Text style={styles.amountText}>
                    <Text style={styles.decimalText}>
                      {activity !== 'Mined Coins'
                        ? data?.data?.totalValue?.referralBonus
                        : data?.data?.totalValue?.userMiningCodeSum}
                      .00
                    </Text>
                  </Text>
                </View>
              </View>
            </Animatable.View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
    height: responsiveHeight(100),
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: Platform.OS == 'ios' ? responsiveHeight(8) : 30,
  },
  background: {
    flex: 1,
    width: responsiveWidth(100),
    height: Platform.OS == 'ios' ? responsiveHeight(100) : responsiveHeight(90),
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    marginTop: 10,
  },
  level: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 24, 24, 0.5)', // Gray background
    borderWidth: 2,
    borderColor: 'rgba(64, 64, 64, 0.3)', // Subtle gray border
  },
  activeLevel: {
    backgroundColor: 'rgba(255, 165, 0, 0.2)', // Orange active background
    borderColor: 'rgba(255, 165, 0, 0.3)', // Orange border
  },
  text: {
    color: 'rgba(128, 128, 128, 0.5)', // Gray text for inactive levels
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  activeText: {
    color: 'orange', // Active level text color
  },
  containercard: {
    padding: 10,
    marginTop: 10,
    position: 'relative',
  },
  card: {
    borderRadius: 8,
    padding: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 16,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  imageText: {
    width: responsiveWidth(7),
    height: responsiveHeight(3),
    resizeMode: 'contain',
  },
  activityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#fff',
  },
  decimalText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default WalletScreen;
