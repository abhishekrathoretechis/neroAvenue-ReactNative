import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Pdf from 'react-native-pdf';

const InChatViewFile = ({ props, visible, onClose,navigation }) => {
  let { currentMessage } = props;
  
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      style={{ height: 600 }}
    >
      <View style={{ flex: 1, padding: 20 }}>
        <Pdf source={{ uri: currentMessage?.file?.url }} style={{ flex: 1 }} />
        <TouchableOpacity onPress={onClose} style={styles.buttonCancel}>
          <Text style={styles.textBtn}>X</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default InChatViewFile;

const styles = StyleSheet.create({
  buttonCancel: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'black',
    left: 13,
    top: 20,
  },
  textBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
