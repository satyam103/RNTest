import React, {useDebugValue, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShowPass from '../../component/ShowPass';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {register, setLoggedIn} from '../../redux/Slice';

// ====================== validation Schema ==========================
const signupSchema = yup.object({
  firstName: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  email: yup
    .string()
    .required()
    .matches(
      /^(([a-zA-Z0-9._%-]{3,})+@([a-zA-Z0-9.-]{2,})+\.[a-zA-Z]{2,})$/,
      'email must be a valid email',
    ),
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

// ====================== main function ==============================
const SignUp = props => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(state => state.user);

  // ======================== show/hide password  ==========================
  const viewPassword = e => {
    setShowPass(!showPass);
  };
  const viewConfirmPassword = e => {
    setShowConfirmPass(!showConfirmPass);
  };

  return (
    <LinearGradient colors={['aqua', 'white']}>
      <View style={styles.sigUpContainer}>
        <ScrollView>
          <View style={styles.viewContainer}>
            <Image
              style={styles.image}
              source={require('../../Images/RNTestLogo.jpeg')}
            />
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                pass: '',
                confirmPass: '',
              }}
              validationSchema={signupSchema}
              onSubmit={(values, actions) => {
                const foundUser = data.find(
                  item => item.email === values.email,
                );
                if (foundUser) {
                  alert('This email is already register try another or login.');
                } else {
                  dispatch(register(values));
                  dispatch(setLoggedIn(values));
                  props.navigation.navigate('Dashboard');
                }
                console.log(JSON.stringify(values, null, 2));
                actions.resetForm();
                setToggleCheckBox(!toggleCheckBox);
              }}>
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                errors,
                values,
                touched,
              }) => (
                <>
                  <View style={styles.formCard}>
                    <View style={{marginVertical: 10}}>
                      <Text style={styles.highlight}> SignUp </Text>
                    </View>
                    <View>
                      <View style={styles.formInLine}>
                        <Ionicons
                          name="person-circle"
                          size={20}
                          style={styles.icons}
                        />
                        <TextInput
                          style={styles.textInput}
                          placeholder="First name"
                          placeholderTextColor="#fff"
                          value={values.firstName}
                          onChangeText={handleChange('firstName')}
                          onBlur={handleBlur('firstName')}
                        />
                      </View>
                      {touched.firstName && errors.firstName && (
                        <Text style={styles.error}>{errors.firstName}</Text>
                      )}
                      <View style={styles.formInLine}>
                        <Ionicons
                          name="person-circle"
                          size={20}
                          style={styles.icons}
                        />
                        <TextInput
                          style={styles.textInput}
                          placeholder="Last Name"
                          placeholderTextColor="#fff"
                          value={values.lastName}
                          onChangeText={handleChange('lastName')}
                          onBlur={handleBlur('lastName')}
                        />
                      </View>
                      {touched.lastName && errors.lastName && (
                        <Text style={styles.error}>{errors.lastName}</Text>
                      )}
                      <View style={styles.formInLine}>
                        <Ionicons name="at" size={20} style={styles.icons} />
                        <TextInput
                          style={styles.textInput}
                          placeholder="email"
                          placeholderTextColor="#fff"
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                        />
                      </View>
                      {touched.email && errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                      )}
                      <View style={styles.formInLine}>
                        <Ionicons
                          name="lock-closed"
                          size={20}
                          style={styles.icons}
                        />
                        <TextInput
                          style={styles.textInput}
                          placeholder="Create password"
                          placeholderTextColor="#fff"
                          secureTextEntry={!showPass}
                          autoCorrect={false}
                          value={values.pass}
                          onChangeText={handleChange('pass')}
                          onBlur={handleBlur('pass')}
                        />
                        <ShowPass
                          onViewPass={viewPassword}
                          showPass={showPass}
                        />
                      </View>
                      {touched.pass && errors.pass && (
                        <Text style={styles.error}>{errors.pass}</Text>
                      )}
                      <View style={styles.formInLine}>
                        <Ionicons
                          name="lock-closed"
                          size={20}
                          style={styles.icons}
                        />
                        <TextInput
                          style={styles.textInput}
                          placeholder="Confirm password"
                          placeholderTextColor="#fff"
                          secureTextEntry={!showConfirmPass}
                          autoCorrect={false}
                          value={values.confirmPass}
                          onChangeText={handleChange('confirmPass')}
                          onBlur={handleBlur('confirmPass')}
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
                  </View>
                  <View style={styles.checkBoxView}>
                    <CheckBox
                      disabled={false}
                      value={toggleCheckBox}
                      onValueChange={newValue => setToggleCheckBox(newValue)}
                    />
                    <Text>I agree with </Text>
                    <Pressable
                      onPress={() => props.navigation.navigate('Term')}>
                      <Text style={styles.link}>T&C</Text>
                    </Pressable>
                    <Text> and </Text>
                    <Pressable
                      onPress={() => props.navigation.navigate('PrivacyP')}>
                      <Text style={styles.link}>Privacy policies</Text>
                    </Pressable>
                  </View>
                  <Pressable
                    disabled={!toggleCheckBox && true}
                    onPress={handleSubmit}>
                    <View
                      style={[
                        styles.signupButton,
                        !toggleCheckBox && {backgroundColor: 'grey'},
                      ]}>
                      <Text style={styles.signupLink}>Signup</Text>
                    </View>
                  </Pressable>
                </>
              )}
            </Formik>
          </View>
          <View style={styles.footer}>
            <Text>Already registered ? </Text>
            <Pressable
              style={{marginTop: 5}}
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.link}>Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  sigUpContainer: {
    minHeight: '100%',
  },
  viewContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 80,
  },
  highlight: {
    textAlign: 'center',
    fontWeight: '900',
    width: 250,
    height: 58,
    fontSize: 40,
  },
  formCard: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    minHeight: '30%',
    width: 300,
    shadowColor: 'blue',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 60,
    paddingBottom: 15,
  },
  formInLine: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    borderRadius: 50,
  },
  icons: {
    padding: 10,
    marginHorizontal: 2,
    color: 'white',
  },
  textInput: {
    borderColor: 'black',
    width: 180,
    paddingLeft: 10,
    color: 'white',
  },
  error: {
    color: 'crimson',
    textAlign: 'center',
    marginBottom: 5,
  },
  checkBoxView: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  signupButton: {
    width: 270,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgb(60,200,150)',
    marginVertical: 10,
  },
  signupLink: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    textDecorationLine: 'underline',
    textDecorationColor: 'blue',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default SignUp;
