import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import FONTS from '../assets/fonts/index';
import COLOR from '../assets/color';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';

const CustomDropdown = ({
  control,
  name,
  rules = {},
  placeholder,
  label,
  onchange,
}) => {
  const [country, setCountry] = useState('');
  const [listCountry, setlistCountry] = useState([]);
  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')

      .then(function (response) {
        setlistCountry([...response.data]);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{label}</Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={listCountry}
        search
        maxHeight={300}
        labelField="name"
        valueField="value"
        placeholder="Select country"
        searchPlaceholder="Search..."
        value=""
        onChange={onchange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    height: 40,
    borderRadius: 10,
    paddingLeft: 8,
    fontSize: 16,
    marginHorizontal: 18,
    marginTop: -28,
    flexDirection: 'column',
  },
  dropdown: {
    borderWidth: 3,
    width: '103%',
    borderColor: 'black',
    height: 40,
    borderRadius: 18,
    paddingLeft: 8,
    fontSize: 16,
    height: 40,
    marginLeft: -10,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    fontSize: 18,
    fontFamily: FONTS.NunitoRegular,
    marginBottom: 10,
  },
  iconStyle: {
    marginRight: 10,
    marginBottom: 7,
  },
  heading: {
    marginTop: 10,
    fontFamily: FONTS.NunitoBold,
    fontSize: 18,
  },
  selectedTextStyle: {
    fontFamily: FONTS.NunitoRegular,
    fontSize: 18,
    color: COLOR.BLACK,
    marginBottom: 12,
  },
});

export default CustomDropdown;
