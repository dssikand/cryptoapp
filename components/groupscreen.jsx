import React, { useEffect, useRef,useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Animated,
  FlatList,
  Platform,
  RefreshControl
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Navbar from './common/navbar';
import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import {  LeaderBoard } from '../services/user.services';
import CommonLoader from './common/commonloader';
import { CurrentUser } from '../services/user.services';
import { Feather } from 'lucide-react-native';
const leaderboardData = [
  { id: '1', rank: 1, referralCode: 'REF12345', coins: '25.20' },
  { id: '2', rank: 2, referralCode: 'REF67890', coins: '18.75' },
  { id: '3', rank: 3, referralCode: 'REF11223', coins: '15.40' },
  { id: '4', rank: 4, referralCode: 'REF44556', coins: '12.00' },
  { id: '5', rank: 5, referralCode: 'REF77889', coins: '10.50' },
  { id: '6', rank: 6, referralCode: 'REF99001', coins: '9.25' },
  { id: '7', rank: 7, referralCode: 'REF22334', coins: '8.80' },
];

const GroupScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const total = (totalvalue) => {
    const total = totalvalue.referralBonus + totalvalue.referralsMiningCodeSum + totalvalue.userMiningCodeSum
    return total
  }
  const onRefresh = () => {
    setRefreshing(true);
    Animated.timing(pullAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(); // Reset animation
    setTimeout(() => {
      setRefreshing(false); // Simulate an API call
    }, 1000);
  };

  const animations = useRef(
    leaderboardData.map(() => new Animated.Value(0)),
  ).current;
  const {data, isLoading} = useQuery({
    queryFn: CurrentUser,
    queryKey: ['CURRENT_USER'],
    enabled: !refreshing
  });
  const pullAnim = useRef(new Animated.Value(0)).current; // Track pull distance
  console.log(data);
  useEffect(() => {
    animations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 800,
        delay: index * 500,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const renderItem = ({item, index}) => {
    console.log(index)
    return (
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: animations[index],
            // transform: [
            //   {
            //     translateY: animations.interpolate({
            //       inputRange: [0, 1],
            //       outputRange: [50, 0],
            //     }),
            //   },
            // ],
          },
        ]}>
        <Pressable>
          {({pressed}) => (
            <LinearGradient
              colors={
                pressed ? ['#1a1b1e', '#E03000'] : ['#1a1b1e', '#1a1b1e80']
              }
              style={styles.card}>
              <View
                style={{
                  padding: Platform.OS == 'ios' ? 10 : 0,
                }}>
                {Platform.OS == 'ios' ? (
                  <View style={styles.userContainer}>
                    <View>
                      <Text style={styles.username}>
                        {t('LeaderBoard.rank')}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#d9480f',
                        width: 30,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50,
                      }}>
                      <Text style={styles.coins}>{index + 1}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.rankContainer}>
                    <Text style={styles.rankText}>{t('LeaderBoard.rank')}</Text>
                    <View
                      style={{
                        padding: responsiveWidth(13),
                      }}>
                      <LinearGradient
                        colors={['#F06400', '#FFBF6E']}
                        style={styles.rankCircle}>
                        <Text style={styles.numberText}>{index + 1}</Text>
                      </LinearGradient>
                    </View>
                  </View>
                )}

                <View style={styles.userContainer}>
                  <Text style={styles.username}>{t('LeaderBoard.referralCode')}</Text>

                  <Text style={styles.coins}>{item?.referralId?.referralCode}</Text>
                </View>
                <View style={styles.userContainer}>
                  <Text style={styles.username}>
                    {t('LeaderBoard.totalCoins')}
                  </Text>
                  <Text style={styles.coins}>
                    {total(item?.referralId?.totalValue)}
                    <Text style={styles.coinsDecimal}>.00</Text>
                  </Text>
                </View>
              </View>
            </LinearGradient>
          )}
        </Pressable>
      </Animated.View>
    );
  };
  if (isLoading) {
    return <CommonLoader />;
  }
  return (
    <>
      <Navbar />
      <ImageBackground
        source={require('../assets/img/crypt.jpeg')}
        style={styles.background}
        resizeMode="cover">
        <Text style={styles.Toptext}>{t('Common.group')}</Text>

        {/* Ensuring Full-Height View for FlatList */}
        <View style={styles.bg}>
        {/* <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ translateY: pullAnim }] }, // Move icon with pull
        ]}
      >
        <Feather name="chevron-down" size={30} color="white" />
      </Animated.View> */}
          <FlatList
            data={data.data.referrals}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={true} // Enable vertical scrolling indicator
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['black']} 
              tintColor="black"  />
            }
            onScroll={(event) => {
              const pullDistance = event.nativeEvent.contentOffset.y;
              if (pullDistance < 0) {
                pullAnim.setValue(Math.abs(pullDistance)); // Move icon down
              }
            }}
            ListEmptyComponent={
                          <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Your group is currently empty. Invite your friends by sharing your referral code to grow the community and unlock more rewards!</Text>
                          </View>
                        }
          />
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    padding: 10,
    height: responsiveHeight(100),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: responsiveHeight(50)
  },
  emptyText: {
    fontSize: 18,
    color: 'white',
    textAlign:'center'
  },
  Toptext: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 80,
    marginBottom: 20,
    textAlign: 'center',
  },
  background: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  animatedContainer: {
    marginVertical: 10,
  },
  card: {
    borderRadius: 8,
    padding: Platform.OS == 'ios' ? 0 : 16,
    borderWidth: 1,
    borderColor: '#E03000',
    overflow: 'hidden',
  },
  rankContainer: {
    height: 32,
    flex: 1,
    borderRadius: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // margin: Platform.OS == 'ios' ? 10 : 0,
    width: Platform.OS == 'ios' ? responsiveWidth(100) : responsiveWidth(100),
  },
  userContainer: {
    height: 32,
    borderRadius: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  circlediv: {
    // position: Platform.OS == 'ios' ? 'absolute' : 'relative',
    // left: Platform.OS == 'ios' ? -50 : 0,
  },
  rankCircle: {
    width: 30,
    height: 30,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: Platform.OS == 'ios' ? 'absolute' : 'relative',
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffbf6e',
  },
  numberText: {
    color: 'white',
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffbf6e',
  },
  coins: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  coinsDecimal: {
    fontSize: 10,
    color: '#fff',
  },
});

export default GroupScreen;
