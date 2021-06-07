import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IQRCodeScanner } from './interface';
import { Feather } from '@expo/vector-icons';
import {ButtonStyled} from './styles';

const QRCodeScanner: React.FC<IQRCodeScanner> = ({
    setState
}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const requestPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setState(data);
    setIsOpen(false);
  };
 
  if (hasPermission === false) {
    return <Button title={'Aceite a permissão de acesso a camera'} onPress={() => requestPermission()} />;
  }

  if (!isOpen)
    return (
      <ButtonStyled onPress={() => setIsOpen(true)}>
        <Feather name="camera" size={32} color="#312e38"/>
      </ButtonStyled>
    )

  return (
    <Modal 
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      style={styles.container}
    >
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </Modal>
  );
}

export default QRCodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
});