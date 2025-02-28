import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Navbar from './common/navbar';
import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { FetchAnnouncement } from '../services/user.services';
import CommonLoader from './common/commonloader';
import { compareAsc, format } from "date-fns";
const AnnouncemntScreen = () => {
  
  const dates = [
    new Date(1995, 6, 2),
    new Date(1987, 1, 11),
    new Date(1989, 6, 10),
  ];
  const {data, isLoading} = useQuery({
    queryFn: FetchAnnouncement,
    queryKey:['FETCH_ANNOUNCEMENT']
  }) 
  if(isLoading){
    return <CommonLoader/>

  }

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
        {
          data.data.map((item)=>  
            <View style={styles.card}>
          <Image 
            source={{ uri:item.imgUrl}}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>
            {item.content}
            </Text>
            <View style={styles.tagContainer}>
             {
              item.tags.map((item)=>
                <Text style={styles.tag}>{item}</Text>
            ) } 
            
            </View>
            <Text style={styles.date}>{format(new Date(item.createdAt), "dd MMM yyyy")} </Text>
          </View>
        </View>)

     
}

        {/* Add More Cards to Test Scrolling */}
      
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
