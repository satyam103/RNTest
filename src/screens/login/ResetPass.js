import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as yup from 'yup';
import NewPass from './NewPass';
import {useSelector} from 'react-redux';

// ====================== validation Schema ==========================
const emailSchema = yup.object({
  email: yup
    .string()
    .required()
    .matches(
      /^(([a-zA-Z0-9._%-]{3,})+@([a-zA-Z0-9.-]{2,})+\.[a-zA-Z]{2,})$/,
      'email must be a valid email',
    ),
});
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

const ResetPass = props => {
  const data = useSelector(state => state.user);
  const [emailFound, setEmailFound] = useState();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={props.onClose}>
      <View style={styles.modalContainer}>
        <View style={{height: '100%'}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                props.onClose();
                setEmailFound();
              }}>
              <Ionicons name="close" size={30} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.modalContent}>
              <View style={styles.card}>
                <Formik
                  initialValues={{email: ''}}
                  validationSchema={emailSchema}
                  onSubmit={(values, actions) => {
                    const email = data.find(
                      item => item.email === values.email,
                    );
                    if (email) {
                      setEmailFound(values.email);
                    } else {
                      alert('Email not found');
                      actions.resetForm();
                    }
                  }}>
                  {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => (
                    <>
                      <View style={{justifyContent: 'center'}}>
                        <View style={styles.cardHeader}>
                          <Ionicons name="person-circle" size={90} />
                          <Text style={{fontSize: 20}}>
                            Reset Your Password
                          </Text>
                        </View>
                        <View style={{marginTop: 10}}>
                          <Text style={{marginLeft: 15, fontSize: 16}}>
                            Username:
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.formInLine,
                            emailFound && [
                              styles.formInLine,
                              {backgroundColor: 'grey'},
                            ],
                          ]}>
                          <TextInput
                            style={styles.textInput}
                            placeholder="Enter your email"
                            placeholderTextColor="#000"
                            keyboardType="email-address"
                            editable={emailFound ? false : true}
                            selectTextOnFocus={emailFound ? false : true}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                          />
                        </View>
                        {touched.email && errors.email && (
                          <Text style={styles.error}>{errors.email}</Text>
                        )}
                      </View>
                      {!emailFound && (
                        <Pressable onPress={handleSubmit}>
                          <View style={styles.buttonView}>
                            <Text style={styles.submitButton}>Search</Text>
                          </View>
                        </Pressable>
                      )}
                    </>
                  )}
                </Formik>
                {emailFound && (
                  <NewPass
                    passSchema={passSchema}
                    emailFound={emailFound}
                    onClose={props.onClose}
                    edit={true}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgb(240,240,240)',
    height: '100%',
  },
  header: {
    backgroundColor: 'grey',
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 5,
    paddingRight: 5,
  },
  closeIcon: {
    color: 'rgb(255,90,80)',
    marginHorizontal: 10,
  },
  modalContent: {
    marginVertical: 100,
    maxHeight: 600,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingRight: 5,
  },
  card: {
    maxHeight: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
    elevation: 20,
    padding: 5,
    shadowColor: 'black',
  },
  cardHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  account: {
    height: 90,
    width: 90,
    borderWidth: 1,
    borderRadius: 50,
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
  passwordView: {
    marginTop: 25,
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

export default ResetPass;
