/* eslint-disable react/react-in-jsx-scope */
import { ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import Navbar from './common/navbar';
import { t } from 'i18next';
import { CircleArrowLeft } from 'lucide-react-native';
import { useState } from 'react';

export default function SupportScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <ImageBackground
            source={require('../assets/img/crypt.jpeg')}
            style={styles.background}
            resizeMode="cover"
        >
            <Navbar />
            <View style={styles.container}>
                <View style={styles.centeredView}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        >
                            <CircleArrowLeft color="white" size={25} />
                        </TouchableOpacity>

                        <Text style={styles.modalText}>{t('Account.accountInfo')}</Text>


                    </View>

                </View>
            </View>
            <View style={styles.container2}>
                <View>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>

                        <Text style={styles.modalText}>{t('Common.support')}</Text>

                    </TouchableOpacity>
                </View>
            </View>
            <Modal animationType="slide" transparent={true} visible={modalVisible} onDismiss={() => setModalVisible(false)} >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)} style={{
                    height: 100
                }}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText3}>{t('Common.supportEmail')}</Text>
                            <Text style={styles.modalText2}>
                                support@qoyn.network
                            </Text>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: responsiveWidth(100),
        height: responsiveHeight(100),
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // dimmed background,
        height: responsiveHeight(80)
    },

    modalView: {
        backgroundColor: '#1a1b1e',
        padding: 25,
        borderRadius: 16,
        width: '80%',
        height: responsiveHeight(12.5)
        // alignItems: 'center',
    },

    modalText3: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff0db',
        marginBottom: 10,
        // textAlign: 'center',
    },

    modalText2: {
        fontSize: 15,
        color: '#fff',
        // textAlign: 'center',
        lineHeight: 22,
    },

    container: {
        flex: 1,
        paddingTop: responsiveHeight(15), // moves everything below navbar
        paddingHorizontal: 16,

    },
    container2: {
        // flex: 1 / 3,
        paddingTop: responsiveHeight(10), // moves everything below navbar
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    centeredView: {
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        width: '100%',
    },
    backButton: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rightPlaceholder: {
        width: 50,
    },
    modalText: {
        color: '#fff0db',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        flex: 1,
    },
});
