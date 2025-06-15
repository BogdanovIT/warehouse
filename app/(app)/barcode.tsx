import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Barcode from '@kichiyaki/react-native-barcode-generator';

type BarcodeFormat = 'CODE128' | 'EAN13' | 'CODE39';

const isValidEAN13 = (text: string) => /^\d{12,13}$/.test(text);

const BarcodeGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [format, setFormat] = useState<BarcodeFormat>('CODE128');

  const getBarcodeValue = () => {
    if (!inputValue) return ' ';
    
    switch(format) {
      case 'EAN13': 
        return isValidEAN13(inputValue) ? inputValue : '0000000000000';
      case 'CODE39':
        return inputValue.slice(0, 20);
      default:
        return inputValue;
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder={
          format === 'EAN13' ? 'Введите 12-13 цифр' : 'Введите текст'
        }
        keyboardType={format === 'EAN13' ? 'numeric' : 'default'}
      />

      <Picker
        selectedValue={format}
        onValueChange={(itemValue: BarcodeFormat) => setFormat(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="CODE128" value="CODE128" />
        <Picker.Item label="EAN13" value="EAN13" />
        <Picker.Item label="CODE39" value="CODE39" />
      </Picker>
      
      <View style={styles.barcodeContainer}>
        <Barcode
          value={getBarcodeValue()}
          format={format}
          height={100}
          width={format === 'CODE39' ? 1 : 2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  barcodeContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    width: '100%',
  },
});

export default BarcodeGenerator;