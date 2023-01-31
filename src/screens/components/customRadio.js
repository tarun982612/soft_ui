import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import FONTS from '../assets/fonts/index';
import RadioButtonRN from 'radio-buttons-react-native';
import COLOR from '../assets/color';
import Icon from 'react-native-vector-icons/Ionicons';
const data = [
  {
    label: 'Male',
  },
  {
    label: 'Female',
  },
];

const CustomRadio = ({name, rules = {}, label, selectedbtn}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{label}</Text>

      <RadioButtonRN
        boxStyle={styles.box}
        style={styles.radio}
        textStyle={styles.text}
        data={data}
        selectedBtn={selectedbtn}
        icon={<Icon name="radio-button-on-outline" size={25} color="#2c9dd1" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginTop: -20,
  },
  radio: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 80,
  },
  input: {
    fontSize: 18,
    fontFamily: FONTS.NunitoRegular,
  },
  heading: {
    marginTop: 10,
    fontFamily: FONTS.NunitoBold,
    fontSize: 18,
  },
  box: {
    flex: 1,
    borderColor: COLOR.WHITE,
    height: 40,
    width: 200,
  },
  text: {
    fontSize: 18,
    height: 40,
    top: 11,
    marginLeft: 10,
    fontFamily: FONTS.NunitoRegular,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomRadio;
