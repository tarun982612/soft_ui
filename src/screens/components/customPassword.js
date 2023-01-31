import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Controller} from 'react-hook-form';
import FONTS from '../assets/fonts/index';
import COLOR from '../assets/color';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomPassword = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  label,
}) => {
  const [seePassword, setSeePassword] = useState(true);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <Text style={styles.heading}>{label}</Text>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : COLOR.PRIMARY},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={seePassword}
            />
            <TouchableOpacity onPress={() => setSeePassword(!seePassword)}>
              <Icon
                name={seePassword ? 'eye-off' : 'eye'}
                size={25}
                style={styles.passwordIcon}
              />
            </TouchableOpacity>
          </View>
          {error && (
            <Text
              style={{
                color: 'red',
                alignSelf: 'stretch',
                fontFamily: FONTS.NunitoRegular,
              }}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    width: '100%',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: FONTS.NunitoRegular,
  },
  heading: {
    marginTop: 10,
    fontFamily: FONTS.NunitoBold,
    fontSize: 18,
  },
  passwordIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomPassword;
