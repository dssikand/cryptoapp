import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Navbar from './common/navbar';
import { t } from 'i18next';

const AnnouncemntScreen = () => {
  return (
    <ImageBackground 
      source={require("../assets/img/crypt.jpeg")} // Background Image
      style={styles.background}
      resizeMode="cover"
    >
      <Navbar />
      <Text style={styles.Toptext}>{t("Common.announcement")}</Text>

      {/* Scrollable Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Image 
            source={{ uri: 'https://cdn.pixabay.com/photo/2018/03/31/05/07/blockchain-3277336_1280.png' }}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.title}>Qoyn Beta Launch</Text>
            <Text style={styles.description}>
              Qoyn is a cutting-edge cryptocurrency designed to simplify and revolutionize digital transactions.
              During the beta phase, we’re inviting early users to explore, provide feedback, and help shape the future of Qoyn.
              Join us on this journey to redefine the crypto experience!
            </Text>
            <View style={styles.tagContainer}>
              <Text style={styles.tag}>feature</Text>
              <Text style={styles.tag}>launch</Text>
              <Text style={styles.tag}>update</Text>
            </View>
            <Text style={styles.date}>1st January 2025</Text>
          </View>
        </View>

        {/* Add More Cards to Test Scrolling */}
        <View style={styles.card}>
        <Image 
            source={{ uri: 'https://cdn.pixabay.com/photo/2018/03/31/05/07/blockchain-3277336_1280.png' }}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.title}>New Feature Coming Soon!</Text>
            <Text style={styles.description}>
              We are excited to announce new improvements to the Qoyn platform, including enhanced security and faster transactions.
              Stay tuned for more updates!
            </Text>
            <View style={styles.tagContainer}>
              <Text style={styles.tag}>security</Text>
              <Text style={styles.tag}>update</Text>
              <Text style={styles.tag}>news</Text>
            </View>
            <Text style={styles.date}>5th February 2025</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  Toptext: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 70,
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 50, // Ensure bottom padding for scrolling
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  content: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#CBD5E1',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#374151',
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
  },
  date: {
    fontSize: 12,
    color: '#94A3B8',
    alignSelf: 'flex-end',
    fontWeight: '600',
  },
});

export default AnnouncemntScreen;
