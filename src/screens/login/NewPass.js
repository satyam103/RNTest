import React, {useState} from 'react';
import {Formik} from 'formik';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import ShowPass from '../../component/ShowPass';
import {useDispatch} from 'react-redux';
import {resetPass} from '../../redux/Slice';

const NewPass = props => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const dispatch = useDispatch();
  // ======================== show/hide password  ==========================
  const viewPassword = () => {
    setShowPass(!showPass);
  };
  const viewConfirmPassword = () => {
    setShowConfirmPass(!showConfirmPass);
  };
  return (
    <Formik
      initialValues={{email: props.emailFound, pass: '', confirmPass: ''}}
      validationSchema={props.passSchema}
      onSubmit={values => {
        dispatch(resetPass(values));
        console.log(JSON.stringify(values, null, 2));
        alert('Password changed successfully !!!');
        props.onClose();
      }}>
      {({handleBlur, handleChange, handleSubmit, values, errors, touched}) => (
        <>
          <View style={styles.passwordView}>
            <Text style={styles.passwordLabel}>Enter New Password</Text>
            <View style={styles.formInLine}>
              <TextInput
                style={styles.textInput}
                placeholder="New password"
                placeholderTextColor="#000"
                secureTextEntry={!showPass}
                value={values.pass}
                onBlur={handleBlur('pass')}
                onChangeText={handleChange('pass')}
                editable={props.edit}
              />
              <ShowPass onViewPass={viewPassword} showPass={showPass} />
            </View>
            {touched.pass && errors.pass && (
              <Text style={styles.error}>{errors.pass}</Text>
            )}
            <Text style={styles.passwordLabel}>Confirm Password</Text>
            <View style={styles.formInLine}>
              <TextInput
                style={styles.textInput}
                placeholder="Confirm password"
                placeholderTextColor="#000"
                secureTextEntry={!showConfirmPass}
                value={values.confirmPass}
                onBlur={handleBlur('confirmPass')}
                onChangeText={handleChange('confirmPass')}
                editable={props.edit}
              />
              <ShowPass
                onViewPass={viewConfirmPassword}
                showPass={showConfirmPass}
              />
            </View>
            {touched.confirmPass && errors.confirmPass && (
              <Text style={styles.error}>{errors.confirmPass}</Text>
            )}
          </View>
          <Pressable onPress={handleSubmit} disabled={!props.edit && true}>
            <View
              style={[
                styles.buttonView,
                !props.edit && {backgroundColor: 'grey'},
              ]}>
              <Text style={styles.submitButton}>Reset</Text>
            </View>
          </Pressable>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
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
  passwordView: {
    marginTop: 15,
  },
  passwordLabel: {
    paddingHorizontal: 10,
    color: 'black',
    marginTop: 5,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(40,140,255)',
    borderRadius: 10,
    height: 50,
    margin: 10,
    padding: 10,
  },
  submitButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  icons: {
    padding: 10,
    marginHorizontal: 2,
    color: 'black',
  },
});

export default NewPass;
