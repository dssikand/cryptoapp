import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Menu, CircleUserRound } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      {/* Left: Hamburger Icon */}
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.openDrawer()}>
        <Menu color="white" size={30} />
      </TouchableOpacity>

      {/* Right: User Icon */}
      {/* <TouchableOpacity style={styles.iconButton}>
        <CircleUserRound color="white" size={30} />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: responsiveHeight(6),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    zIndex: 100,
  },
  iconButton: {
    padding: 10,
  },
});

export default Navbar;
