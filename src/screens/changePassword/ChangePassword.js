import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, View, StyleSheet, TextInput, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewPass from '../login/NewPass';
import {useSelector} from 'react-redux';
import * as yup from 'yup';
import {Formik} from 'formik';
import ShowPass from '../../component/ShowPass';

const passSchema = yup.object({
  pass: yup
    .string()
    .required()
    .min(8)
    .max(15)
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    ),
  confirmPass: yup
    .string()
    .required()
    .oneOf([yup.ref('pass')], 'Passwords do not match'),
});

const ChangePassword = props => {
  const {colors} = useTheme();
  const loggedUser = useSelector(state => state.isLoggedIn[0]);
  const [verified, setVerified] = useState(false);
  const [showOldPass, viewOldPass] = useState(false);
  const oldPass = yup.object({
    Password: yup
      .string()
      .required()
      .matches(loggedUser.pass, 'Password do not match'),
  });
  return (
    <View>
      <View style={styles.header}>
        <Pressable onPress={() => props.navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={colors.text} />
        </Pressable>
      </View>
      <View style={styles.changePassContainer}>
        <View style={styles.cardHeader}>
          <Ionicons name="person-circle" size={90} color={colors.text} />
          <Text style={{fontSize: 20, color: colors.text}}>
            Change Password
          </Text>
        </View>
        <View style={styles.changePasswordView}>
          <Formik
            initialValues={{Password: ''}}
            validationSchema={oldPass}
            onSubmit={values => {
              if (values.Password === loggedUser.pass) {
                setVerified(true);
              }
            }}>
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              touched,
              values,
              errors,
            }) => (
              <>
                <View style={{marginTop: 10, alignSelf: 'flex-start'}}>
                  <Text style={{marginLeft: 15, fontSize: 16}}>
                    Old Password:
                  </Text>
                </View>
                <View style={[styles.formInLine]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your current password"
                    placeholderTextColor="#000"
                    onChangeText={handleChange('Password')}
                    value={values.Password}
                    onBlur={handleBlur('oldPass')}
                    editable={!verified}
                    secureTextEntry={!showOldPass}
                  />
                  <ShowPass onViewPass={() => viewOldPass(!showOldPass)} showPass={showOldPass} />
                </View>
                {touched.Password && errors.Password && (
                  <Text style={styles.error}>{errors.Password}</Text>
                )}
                {!verified ? (
                  <Pressable onPress={handleSubmit}>
                    <View style={styles.buttonView}>
                      <Text style={styles.submitButton}>Verify</Text>
                    </View>
                  </Pressable>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.success}>verified </Text>
                    <Ionicons
                      name="checkmark-done-circle"
                      color={'green'}
                      size={12}
                    />
                  </View>
                )}
              </>
            )}
          </Formik>
          <NewPass
            emailFound={loggedUser.email}
            onClose={props.navigation.goBack}
            passSchema={passSchema}
            edit={verified}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 50,
    padding: 10,
  },
  cardHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  changePassContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePasswordView: {
    width: '90%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  formInLine: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 30,
    marginTop: 10,
    width: 330,
  },
  textInput: {
    width: 280,
    paddingHorizontal: 20,
    color: 'black',
  },
  error: {
    color: 'crimson',
    textAlign: 'center',
    marginBottom: 5,
  },
  success: {
    color: 'green',
    marginBottom: 5,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(40,140,255)',
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    padding: 10,
  },
  submitButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ChangePassword;
