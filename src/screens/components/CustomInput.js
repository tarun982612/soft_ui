import React from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import FONTS from '../assets/fonts/index';
export default function CustomInput({
  placeholder,
  label,
  onChange,
  onChangeText,
  value,
  secureTextEntry,
  autoCaps,
  editable,
  keyboardType,
  maxLength,
  editablestyle,
  type,
  textInputStyle,
}) {
  return (
    <View style={styles.mainstyle}>
      <Text style={styles.labelstyle}>{label} </Text>
      <TextInput
        style={[styles.inputstyle, textInputStyle, editablestyle]}
        placeholder={placeholder}
        onChange={onChange}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCaps}
        editable={editable}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainstyle: {
    marginHorizontal: 20,
  },
  inputstyle: {
    borderWidth: 3,
    borderColor: 'black',
    height: 40,
    borderRadius: 20,
    paddingLeft: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
  labelstyle: {
    color: 'lightgrey',
    fontSize: 22,
    fontFamily: FONTS.REGULAR,
    marginTop: -18,
    fontWeight: '600',
    fontStyle: 'normal',
  },
});
