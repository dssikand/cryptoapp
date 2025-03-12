import {Copy} from 'lucide-react-native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
// import { useUserContext } from "@/lib/context/UserContext";
// import { CopyTool } from "../CopyTool";  // Assume CopyTool is implemented similarly in React Native
// import { useTranslations } from "next-intl";
import SvgUri from 'react-native-svg-uri';
import Navbar from './navbar';
import { t } from 'i18next';
import Toast from 'react-native-toast-message';

export function WalletCard({refrealCode, totalValue}) {
  //   const t = useTranslations("Wallet");
  //   const { userData } = useUserContext();
  //   const referralCode = userData?.referralCode;
  const amount =
    totalValue?.referralBonus +
    totalValue?.referralsMiningCodeSum +
    totalValue?.userMiningCodeSum;
  const copyToClipboard = (text: string, message: string) => {
    Clipboard.setString(text);
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/img/cardimg.png')}
          style={styles.walletImageq}
          resizeMode="cover"
        />
        <Image
          source={require('../../assets/img/box.png')}
          style={styles.walletImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.cardBackground}>
        <View style={styles.walletContent}>
          <View style={styles.texticon}>
            <Text style={styles.walletTitle}>{t('Wallet.yourBalance')}</Text>
            <TouchableOpacity>
              <Image
                source={require('../../assets/img/coin_plain.png')}
                style={styles.conimage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.balanceSection}>
            <Text style={styles.currencyText}>QYN</Text>
            <View style={styles.balance}>
              <Text style={styles.balanceText}>{amount}</Text>
              <Text style={styles.decimalText}>.00</Text>
            </View>
          </View>

          <View style={styles.referralSection}>
            <Text style={styles.referralLabel}>
              {t('Wallet.yourReferralCode')}
            </Text>
            <View style={styles.referralCodeContainer}>
              <Text style={styles.referralCode}>
                {refrealCode}
                <TouchableOpacity
                  onPress={() =>
                    copyToClipboard(refrealCode, 'Referral Code Copied')
                  }>
                  <Copy color={'white'} size={19} style={styles.copyico}/>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  copyico:{
marginLeft:7,
paddingTop:5

  },
  card: {
    padding: 50,
  },
  iconcopy: {paddingLeft:34},
  walletImage: {
    borderRadius: 10,
    width: responsiveWidth(80),
    height: responsiveHeight(25),
    position: 'absolute',
    left: 53,
    top: 80,
  },
  walletImageq: {
    width: responsiveWidth(80),
    height: responsiveHeight(20),
    borderRadius: 10,
  },

  cardBackground: {
    paddingHorizontal: 40,
    position: 'absolute',
    left: 10,
    top: 95,
  },
  walletContent: {
    width: '100%',
    padding: 16,
    justifyContent: 'space-between',
    color: '#000',
  },
  texticon: {
    justifyContent: 'space-between',
    width: responsiveWidth(73),
    flexDirection: 'row',
  },
  decimalText: {color: '#fff', fontSize: 18},
  referralCode: {
    color: '#ff922b',
    fontWeight: 'bold',
    fontSize: 19,
  },
  walletTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 14,
  },
  balanceSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginTop: 16,
  },
  currencyText: {
    fontSize: 20,
    color: '#B0B0B0',
    fontWeight: 'bold',
  },
  balance: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  balanceLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  referralSection: {
    marginTop: 10,
  },
  referralLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 8,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom:6,
    verticalAlign:"middle",
    
  },
  cardInner: {
    position: 'relative',
    width: '100%',
    aspectRatio: 437 / 256,
    marginHorizontal: 'auto',
    paddingVertical: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  coinImage: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  walletText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 16,
    paddingRight: 16,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 16,
    paddingRight: 16,
    gap: 8,
  },
  currency: {
    fontSize: 20,
    color: 'gray',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  amountFraction: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  balanceText: {
    color: 'white',
    fontSize: 30,
    opacity: 0.8,
    textAlign: 'center',
  },
  referralContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  referralText: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
  },
  conimage: {
    width: responsiveWidth(10),
    height: responsiveHeight(6),
  },
});
