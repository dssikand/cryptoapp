import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ActivityIndicator, Clipboard,Modal } from "react-native";

import { useNavigation } from "@react-navigation/native";
// import Modal from "react-native-modal"
import { Copy } from "lucide-react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { USFlag } from "../../../utils/common";
import { responsiveWidth,responsiveHeight } from "react-native-responsive-dimensions";
const languages =[
    { value: "en", label: "ENG",   },
    { value: "cn", label: "中文",  },
  ];

export default function PassphraseGenerator({
  onContinue,
  passphrase,
  setPassphrase,
  isSignUpLoading,
}: {
  onContinue: () => void;
  passphrase: string[];
  setPassphrase: React.Dispatch<React.SetStateAction<string[]>>;
  isSignUpLoading: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(languages[0]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  
  const items = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const generatePassphrase = useCallback(async () => {
    setIsLoading(true);
    try {
      const fileName =
        language.value === "en" ? "https://www.qoyn.network/english.txt" : "/chinese_simplified.txt";
      const response = await fetch(fileName);
      if (!response.ok) {
        throw new Error(`Failed to fetch word list: ${response.statusText}`);
      }
      const text = await response.text();
      const words = text.split("\n").filter((word) => word.trim() !== "");
      const selectedWords: string[] = [];

      // Generate unique words
      const usedIndices = new Set();
      while (selectedWords.length < 12) {
        const randomIndex = Math.floor(Math.random() * words.length);
        if (!usedIndices.has(randomIndex)) {
          usedIndices.add(randomIndex);
          selectedWords.push(words[randomIndex]);
        }
      }

      setPassphrase(selectedWords);
    } catch (error) {
      console.error("Error generating passphrase:", error);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  useEffect(() => {
    generatePassphrase();
  }, [generatePassphrase]);

  return (
    <>
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        {/* Language Picker (simulating dropdown) */}
        <DropDownPicker
        open={open}
        value={value}
        items={languages}
        setOpen={setOpen}
        setValue={setValue}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownDirection="BOTTOM"
      
      />
      </View>

      <View style={styles.passphraseContainer}>
        {passphrase?.map((word, index) => (
          <View key={index} style={styles.wordContainer}>
            <Text style={styles.wordText}>{`${index + 1}. ${word}`}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.copyButton}
        onPress={() => {
          Clipboard.setString(passphrase.join(" "));
        }}
      >
        <Text style={styles.copyText}>Copy All Words <Copy size={20} color={"white"} style={styles.icontext}/> </Text>
      </TouchableOpacity>

      <Text style={styles.disclaimerText}>Never share your secret passphrase with anyone and store it safely.</Text>

       <TouchableOpacity
               style={styles.buttonTelegram}
                onPress={toggleModal}
             >
               <Text style={styles.buttonText} >Continue </Text>
             </TouchableOpacity>
    </View>
   
    <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Important Security Notice</Text>
              <Text style={styles.modalText2}>Have you safely stored your passphrase?</Text>

              <Text style={styles.modalText3}>You will need it to access your account.</Text>

              <Text style={styles.modalText4}>If you lose your passphrase, you will permanently lose access to your account.</Text>
<View style={styles.flexbtn}>
<TouchableOpacity
               style={styles.nobtn}  onPress={toggleModal}
             >
               <Text style={styles.nobtntext} >No </Text>
             </TouchableOpacity>

<TouchableOpacity
               style={styles.yesbtn}
             >
               <Text style={styles.yesbtntext} >Yes </Text>
             </TouchableOpacity>

</View>

             
            </View>
          </View>
        </Modal>
   
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#1a1b1e",
    borderRadius: 10,
    alignItems: "center",
    color:"#fff",
  },
 
  dropdownContainer: {
    width: responsiveWidth(40),
    marginBottom: 20,
    backgroundColor:"#000",
  },
  icontext:{
    marginVertical:16
  },
  dropdown: {
    backgroundColor: "#000",
    borderColor: "#d9480f",
    borderWidth: 1,
    borderRadius: 8,
  },
  selected: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  languageLabel: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8,
  },
  buttonTelegram: {
    backgroundColor: "#FFF0DB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom:20,
  },
  buttonText: {
   fontSize:18,
   fontWeight:600,

  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  languageButton: {
    padding: 8,
    backgroundColor: "#555",
    borderRadius: 4,
    margin: 4,
  },
  selectedButton: {
    backgroundColor: "#FFA500",
    color:"#000",
  },
  languageText: {
    color: "#fff",
    fontSize: 16,
  },
  passphraseContainer: {
    width: "100%",
    padding: 16,
    backgroundColor: "#444",
    borderRadius: 8,
    marginBottom: 16,
  },
  wordContainer: {
    marginBottom: 8,
  },
  wordText: {
    color: "#00FFFF",
    fontFamily: "monospace",
  },
  copyButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#1a0d02",
    borderRadius: 8,
    marginBottom: 16,
  },
  copyText: {
    color: "#d9480f",
    fontSize: 16,
  },
  disclaimerText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
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
    alignItems: 'center',
    shadowColor: '#fff0db',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  modalText:{
    color: "#fff0db",
    fontSize:20,
    fontWeight:700
  },
 
  modalText2:{
    color: "#fff0db",
    fontSize:17,
    marginTop:10,
    fontWeight:600
    
  },
  modalText3:{
    color: "#fff0db",
    fontSize:17,
    marginTop:10,
    
  },
  modalText4:{
    color: "#ff6b6b",
    fontSize:17,
    marginTop:10,
    textAlign:"center",
    
  },
  nobtn:{
    backgroundColor:"#d9480f",
    // borderRadius:"50%",
    justifyContent:"center",
    borderRadius:7,
  },
  yesbtn:{
    backgroundColor:"#fff0db",
    paddingHorizontal:10,
    paddingVertical:8,
    fontWeight:"bold",
    borderRadius:7,

   
  },
  flexbtn:{
    justifyContent:"space-between",
    flexDirection:"row",
    columnGap:20,
    marginVertical:20


  },
  nobtntext:{
    color:"#fff",
    paddingHorizontal:10,
    paddingVertical:8,
    fontWeight:"bold",

  },
  yesbtntext:{
  }

 
});
