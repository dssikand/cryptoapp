import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, Animated, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Navbar from './common/navbar';

const leaderboardData = [
  { id: '1', rank: 1, username: 'backy6666', coins: '25.20' },
  { id: '2', rank: 2, username: 'cryptoKing', coins: '18.75' },
  { id: '3', rank: 3, username: 'minerPro', coins: '15.40' },
  { id: '4', rank: 4, username: 'blockchainDude', coins: '12.00' },
  { id: '5', rank: 5, username: 'Satoshi', coins: '10.50' },
  { id: '6', rank: 6, username: 'BitLover', coins: '9.25' },
  { id: '7', rank: 7, username: 'HashMaster', coins: '8.80' },
];

const LeaderboardScreen = () => {
  const animations = useRef(leaderboardData.map(() => new Animated.Value(0))).current;

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

  const renderItem = ({ item, index }) => {
    return (
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: animations[index],
            transform: [
              {
                translateY: animations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Pressable>
          {({ pressed }) => (
            <LinearGradient
              colors={pressed ? ['#1a1b1e', '#E03000'] : ['#1a1b1e', '#1a1b1e80']}
              style={styles.card}
            >
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>Rank</Text>
                <LinearGradient colors={['#F06400', '#FFBF6E']} style={styles.rankCircle}>
                  <Text style={styles.numberText}>{item.rank}</Text>
                </LinearGradient>
              </View>
              <View style={styles.userContainer}>
                <Text style={styles.username}>User</Text>
                <Text style={styles.coins}>{item.username}</Text>
              </View>
              <View style={styles.userContainer}>
                <Text style={styles.username}>Total Coins</Text>
                <Text style={styles.coins}>
                  {item.coins}
                  <Text style={styles.coinsDecimal}>.00</Text>
                </Text>
              </View>
            </LinearGradient>
          )}
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <>
      <Navbar />
      <ImageBackground source={require("../assets/img/crypt.jpeg")} style={styles.background} resizeMode="cover">
        <Text style={styles.Toptext}>LeaderBoard</Text>

        {/* Ensuring Full-Height View for FlatList */}
        <View style={styles.bg}>
          <FlatList
            data={leaderboardData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={true}  // Enable vertical scrolling indicator
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
  Toptext: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 20,
    textAlign: "center",
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
    padding: 16,
    borderWidth: 1,
    borderColor: '#E03000',
  },
  rankContainer: {
    height: 32,
    borderRadius: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userContainer: {
    height: 32,
    borderRadius: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankCircle: {
    width: 30,
    height: 30,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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

export default LeaderboardScreen;
