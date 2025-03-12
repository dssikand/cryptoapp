import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Bell, Building2, Pickaxe, Wallet, Settings, ChevronDown, ChevronUp } from 'lucide-react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import i18n from '../../i18n';
import { t } from 'i18next';
import { AuthContext } from '../../authcontext';
const languages = [
  { value: 'en', label: 'ENG' },
  { value: 'cn', label: '中文' },
];

const CustomDrawer = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext)
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      {/* Menu Items */}
      <View style={styles.menuItems}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            navigation.navigate('App', {
              screen: 'Home',
              params: {screen: 'MainTabs', params: {screen: 'Wallet'}},
            })
          }>
          <Wallet color={'#fff'} />
          <Text style={styles.menuText}>{t('Common.wallet')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            navigation.navigate('App', {
              screen: 'Home',
              params: {screen: 'MainTabs', params: {screen: 'Mining'}},
            })
          }>
          <Pickaxe color={'#fff'} />
          <Text style={styles.menuText}>{t('Common.mining')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            navigation.navigate('App', {
              screen: 'Home',
              params: {screen: 'MainTabs', params: {screen: 'Leader'}},
            })
          }>
          <Building2 color={'#fff'} />
          <Text style={styles.menuText}>{t('Common.leader')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            navigation.navigate('App', {
              screen: 'Home',
              params: {screen: 'MainTabs', params: {screen: 'Announcement'}},
            })
          }>
          <Bell color={'#fff'} />
          <Text style={styles.menuText}>{t('Common.announcement')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            navigation.navigate('App', {
              screen: 'Home',
              params: {screen: 'Account', params: {screen: 'Account'}},
            })
          }>
          <Settings color={'#fff'} />
          <Text style={styles.menuText}>{t('Common.Account')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <Text style={[styles.menuText, {color: '#fff'}]}>
            {t('Common.logout')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Move Dropdown & Logout Button to Bottom */}
      <View style={styles.bottomSection}>
        <DropDownPicker
          open={open}
          value={value}
          items={languages}
          setOpen={setOpen}
          setValue={setValue}
          containerStyle={styles.dropdownContainer}
          ArrowUpIconComponent={({style}) => (
            <ChevronUp style={style} color={'#fff'} />
          )}
          ArrowDownIconComponent={({style}) => (
            <ChevronDown style={style} color={'#fff'} />
          )}
          style={styles.dropdown}
          dropDownDirection="AUTO"
          placeholder="ENG"
          placeholderStyle={{
            color: '#fff',
            fontWeight: 'bold',
          }}
          selectedItemLabelStyle={{
            color: '#fff',
          }}
          theme="DARK"
          onChangeValue={value => i18n.changeLanguage(value)}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  menuItems: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 70,
  },
  logoutButton: {
    borderColor: "#d9480f",
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: responsiveWidth(42),
    alignItems: "center",
    marginTop: 20,
  },
  dropdownContainer: {
    width: responsiveWidth(40),
  },
  dropdown: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    color: '#fff',
  },
});

export default CustomDrawer;
