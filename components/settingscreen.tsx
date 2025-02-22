import { Info } from "lucide-react-native";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView , Image, Platform} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Svg, { Path } from "react-native-svg";
const SettingScreen = () => {
  const [activeSection, setActiveSection] = useState("Recovery Password");
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
  });

  return (
    <ScrollView style={styles.container}>
            <Text style={styles.Toptext}>Settings</Text>

      
      {/* Sidebar Buttons */}
      <View style={styles.sidebar}>
  {[ "Recovery Password", "Delete Account"].map((section) => (
    <TouchableOpacity
      key={section}
      style={[styles.button, activeSection === section && styles.activeButton]}
      onPress={() => setActiveSection(section)}
    >
     <Text style={[styles.buttonText, activeSection === section && styles.activeButtonText]}>
  {section}
</Text>

    </TouchableOpacity>
  ))}
</View>

      {/* Render Content Based on Active Section */}
      <View style={styles.profileContainer}>
        {activeSection === "Recovery Password" && <RecoveryPassword />}
        {activeSection === "Delete Account" && <DeleteAccount />}
      </View>
    </ScrollView>
  );
};

// **Account Info Component**


// **Recovery Password Component**
const RecoveryPassword = () => (
  <>
  <View style={styles.card}>
        {/* Header Section */}
        <View>
        <View style={styles.betweenText}>
          <Text style={styles.headerText}>Recovery Password</Text>
          <View style={styles.iconWrapper}>
            <Info size={20} color="#E03000" />
          </View>
          </View>
          <Text style={styles.description}>
            Use your recovery password to load your account on new devices.
          </Text>
        </View>

        <View style={styles.recoveryBox}>
          <Text style={styles.recoveryText}>
            believe visit cross call onion length sponsor hood bulk essay auction dog
          </Text>
        </View>
        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hideSection}>
        <View>
          <Text style={styles.hideTitle}>Hide Recovery Password</Text>
          <Text style={styles.hideDescription}>
            Permanently hide your recovery password on this device.
          </Text>
        </View>
        <TouchableOpacity style={styles.hideButton}>
          <Text style={styles.hideButtonText}>Hide</Text>
        </TouchableOpacity>
      </View>
      </>
);

// **Delete Account Component**
const DeleteAccount = () => (
  <View style={styles.infoContainer}>
    <Text style={styles.text}>Warning: This action cannot be undone. This will permanently delete your account and remove your data from our servers.</Text>
    <TouchableOpacity style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Delete My Account</Text>
    </TouchableOpacity>
  </View>
);

// **Editable Profile Field Component**
const ProfileField = ({ label, value, onChange }: any) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fieldContent}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            autoFocus
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <Text style={styles.fieldText}>{value}</Text>
        )}
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></Path>
            <Path d="M13.5 6.5l4 4"></Path>
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// **Styles**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    padding: 20,
  },
  betweenText:{
   justifyContent:"space-between",
   width:responsiveWidth(80),
   flexDirection:"row"
  },
  Toptext: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: Platform.OS == "ios" ? 45: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  sidebar: {
    marginBottom: 20,
    flexDirection: "row",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 4,
    borderColor: "transparent",
    textAlign:"center"
  },
  activeButton: {
    borderColor: "#FF7F00",
    paddingVertical: 10,
    paddingHorizontal: 10,

  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#999",
    textAlign:"center",
    width:responsiveWidth(40)
  },
  activeButtonText: {
    color: "#FF7F00",
  },
  profileContainer: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF7F00",
  },
  infoContainer: {
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    color: "#AAA",
    fontSize: 16,
    marginBottom: 4,
  },
  fieldContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
  },
  fieldText: {
    color: "#FFF",
    fontSize: 18,
  },
  input: {
    color: "#FFF",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#FF7F00",
    flex: 1,
  },
  editButton: {
    backgroundColor: "#FF7F00",
    padding: 6,
    borderRadius: 16,
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 20,
    lineHeight:22
  },
  resetButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
    marginTop:10
  },
  deleteButton: {
    backgroundColor: "#D9534F",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  textrecove:{
    color:"#ff922b",
    fontWeight:"bold",
    fontSize:22
  },
  avatarContainer: {
    alignSelf: "center", // Center the avatar horizontally
    position: "relative",
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  editButton2: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FF7F00",
    padding: 8,
    borderRadius: 20,
  },
  card: {
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    // borderRadius: 16,
    // borderWidth: 1,
    // borderColor: 'rgba(224, 48, 0, 0.3)',
    // padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconWrapper: {
    backgroundColor: 'rgba(224, 48, 0, 0.2)',
    padding: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  description: {
    color: '#ced4da',
    marginBottom: 20,
  },
  recoveryBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  recoveryText: {
    color: '#06B6D4',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  copyButton: {
    backgroundColor: '#ff922b',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    width:responsiveWidth(20)
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  hideSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: '#4B5563',
    flexDirection: 'column',
    alignItems: 'left',
  },
  hideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  hideDescription: {
    color: '#ced4da',
    fontSize: 14,
    marginTop:10
  },
  hideButton: {
    borderWidth: 1,
    borderColor: '#E03000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'transparent',
    width:responsiveWidth(18),
    textAlign:"center",
    marginTop:20
  },
  hideButtonText: {
    color: '#E03000',
    fontSize: 16,
    textAlign:"center"
  },
});

export default SettingScreen;
