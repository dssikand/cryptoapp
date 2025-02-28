import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const RecoveryModal = ({ visible, onContinue, onCancel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}  // ✅ Make sure `visible` is used correctly
      onRequestClose={onCancel} // Handles back button on Android
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Hide Recovery Password Permanently</Text>
          <Text style={styles.description}>
            Without your recovery password, you cannot load your account on new devices.
          </Text>
          <Text style={styles.description}>
            We strongly recommend you save your recovery password in a safe and secure place before continuing.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding:20
  },
  container: {
    backgroundColor: '#1A1B1E',
    borderRadius: 16,
    padding: 24,
    maxWidth: 400,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(153, 27, 27, 0.3)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 16,
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4B5563',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },
  cancelText: {
    color: '#D1D5DB',
  },
});

export default RecoveryModal;
