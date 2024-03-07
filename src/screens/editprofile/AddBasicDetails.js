import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const AddBasicDetails = props => {
  const {colors} = useTheme();
  return (
    <View style={styles.form}>
      <View style={styles.inputView}>
        <Text style={[styles.label, {color: colors.text}]}>Name :</Text>
        <View style={styles.nameinputView}>
          <TextInput
            style={[
              styles.textinput,
              {borderColor: colors.border, color: colors.text, width: '45%'},
            ]}
            placeholder="First name"
            placeholderTextColor={colors.text}
            value={props.values.firstName}
            onChangeText={props.handleChange('firstName')}
          />
          <TextInput
            style={[
              styles.textinput,
              {borderColor: colors.border, color: colors.text, width: '45%'},
            ]}
            placeholder="Last name"
            placeholderTextColor={colors.text}
            value={props.values.lastName}
            onChangeText={props.handleChange('lastName')}
          />
        </View>
      </View>
      <View style={styles.inputView}>
        <Text style={[styles.label, {color: colors.text}]}>Username :</Text>
        <TextInput
          style={[
            styles.textinput,
            {borderColor: colors.border, color: colors.text},
          ]}
          placeholder="Username"
          placeholderTextColor={colors.text}
          value={props.values.userName}
          onChangeText={props.handleChange('userName')}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={[styles.label, {color: colors.text}]}>Phone :</Text>
        <TextInput
          style={[
            styles.textinput,
            {borderColor: colors.border, color: colors.text},
          ]}
          placeholder="Phone no"
          placeholderTextColor={colors.text}
          value={props.values.phone}
          onChangeText={props.handleChange('phone')}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={[styles.label, {color: colors.text}]}>DOB :</Text>
        <TextInput
          style={[
            styles.textinput,
            {borderColor: colors.border, color: colors.text},
          ]}
          placeholder="DOB"
          placeholderTextColor={colors.text}
          value={props.values.DOB}
          onChangeText={props.handleChange('DOB')}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  form: {
    marginVertical: 10,
    width: 300,
  },
  inputView: {
    margin: 5,
  },
  nameinputView: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 3,
  },
  textinput: {
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginHorizontal: 5,
  },
});

export default AddBasicDetails;
