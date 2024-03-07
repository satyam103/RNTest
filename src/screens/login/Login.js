import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShowPass from '../../component/ShowPass';
import ResetPass from './ResetPass';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {isLoggedIn, setLoggedIn} from '../../redux/Slice';
import auth from '@react-native-firebase/auth';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
// ====================== validation Schema ==========================
const loginSchema = yup.object({
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
});

// ====================== main function ==============================
const Login = props => {
  const [showPass, setShowPass] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const data = useSelector(state => state.user);
  const dispatch = useDispatch();

  // ======================== show/hide password  ==========================
  const viewPassword = () => {
    return setShowPass(!showPass);
  };

  // ====================== handle modal ==========================
  const handleModal = () => {
    setShowModal(!showModal);
  };

  // ====================== back handler =========================
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // ====================== google sigin ===========================
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '433221753820-tbjdsmc6jdauadf0p1dmf1g9ib99140t.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
    // await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // // Get the users ID token
    // const {idToken} = await GoogleSignin.signIn();

    // // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
    // // GoogleSignin.configure({
    //   androidClientId:
    //     '433221753820-kg7i4qbl5aged5n682ps8jf2h8kd4bb7.apps.googleusercontent.com',
    //   // iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
    // });
    // GoogleSignin.hasPlayServices()
    //   .then(hasPlayService => {
    //     if (hasPlayService) {
    //       GoogleSignin.signIn()
    //         .then(userInfo => {
    //           console.log(JSON.stringify(userInfo));
    //         })
    //         .catch(e => {
    //           console.log('ERROR IS: ' + JSON.stringify(e));
    //         });
    //     }
    //   })
    //   .catch(e => {
    //     console.log('ERROR ISA: ' + JSON.stringify(e));
    //   });
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   console.log(await GoogleSignin.signIn());
    // } catch (error) {
    //   // console.log('Message', error.message);
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     console.log('Canceled');
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     console.log('Sigining In');
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     console.log('Play service not available');
    //   } else {
    //     console.log('Some other error', error.code);
    //     console.log(JSON.stringify(error, null, 2));
    //   }
    // }
  };

  // const isSignedIn = async () => {
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   if (!isSignedIn) {
  //     getCurrentUserInfo();
  //   } else {
  //     console.log('Login');
  //   }
  // };

  // const getCurrentUserInfo = async () => {
  //   try {
  //     const userInfo = await GoogleSignin.signInSilently();
  //     console.log(userInfo);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_REQUIRED) {
  //       console.log('not signed in');
  //       // alert('Not logged in');
  //     } else {
  //       alert('Something went wrong');
  //       console.log('Something went wrong');
  //     }
  //   }
  // };

  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fbLogin = resCallback => {
    LoginManager.logOut();
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        console.log(result);
        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        ) {
          resCallback({message: 'Email is required'});
        }
        if (result.isCancelled) {
          console.log({message: 'Canceled'});
        } else {
          const userinfo = new GraphRequest(
            '/me?fields=email,name,picture',
            null,
            resCallback,
          );
          new GraphRequestManager().addRequest(userinfo).start();
        }
      },
      function (error) {
        console.log('Login failed with error' + error);
      },
    );
  };

  const onFBLogin = async () => {
    try {
      await fbLogin(_responseInfoCallback);
    } catch (error) {
      console.log('Login failed with error' + error);
    }
  };

  const _responseInfoCallback = async (error, result) => {
    if (error) {
      console.log(error);
      return;
    } else {
      const userInfo = result;
      console.log(userInfo);
    }
  };

  return (
    <LinearGradient colors={['aqua', 'white']}>
      <View style={styles.loginContainer}>
        <ScrollView>
          <View style={styles.viewContainer}>
            <Image
              style={styles.image}
              source={require('../../Images/RNTestLogo.jpeg')}
            />
            <Formik
              initialValues={{email: '', pass: ''}}
              validationSchema={loginSchema}
              onSubmit={ (values, actions) => {
                const loginInfo = data.find(
                  item => item.email === values.email,
                );
                if (loginInfo) {
                  if (loginInfo.pass === values.pass) {
                    dispatch(setLoggedIn(loginInfo));
                    props.navigation.navigate('Dashboard');
                  } else {
                    alert('Wrong credentials');
                    console.log('Wrong credentials');
                  }
                } else {
                  alert('Wrong credentials');
                  console.log('Wrong credentials');
                }
                actions.resetForm();
              }}>
              {({
                handleChange,
                handleSubmit,
                handleBlur,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={styles.formCard}>
                    <View style={{marginVertical: 25}}>
                      <View style={{marginVertical: 10}}>
                        <Text style={styles.title}> Login </Text>
                      </View>
                      <View>
                        <View style={styles.formInLine}>
                          <Ionicons name="at" size={20} style={styles.icons} />
                          <TextInput
                            style={styles.textInput}
                            placeholder="email"
                            placeholderTextColor="#fff"
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            value={values.email}
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
                            placeholder="password"
                            placeholderTextColor="#fff"
                            secureTextEntry={!showPass}
                            onChangeText={handleChange('pass')}
                            value={values.pass}
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
                      </View>
                    </View>
                  </View>
                  <ResetPass showModal={showModal} onClose={handleModal} />
                  <View style={styles.resetLink}>
                    <Text>Forget password ? </Text>
                    <Pressable onPress={handleModal}>
                      <Text style={styles.link}>Reset</Text>
                    </Pressable>
                  </View>
                  <Pressable onPress={handleSubmit}>
                    <View style={styles.loginButton}>
                      <Text style={styles.loginLink}>Login</Text>
                    </View>
                  </Pressable>
                </>
              )}
            </Formik>
            <Text>or</Text>
            <GoogleSigninButton
              style={{borderRadius: 50}}
              size={GoogleSigninButton.Size.Icon}
              color={GoogleSigninButton.Color.Dark}
              onPress={
                () => signIn()
                // .then(res => console.log(res))
                // .catch(error => console.log(error))
              }
            />
            <Pressable onPress={onFBLogin}>
              <Text>Fb login</Text>
            </Pressable>
            <View style={styles.footer}>
              <Text>New User ? {''}</Text>
              <Pressable onPress={() => props.navigation.navigate('Signup')}>
                <Text style={styles.link}>Register</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    minHeight: '100%',
  },
  viewContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 80,
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
    shadowColor: '#000',
  },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    width: 250,
    height: 58,
    fontSize: 40,
  },
  resetLink: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
  },
  loginButton: {
    width: 270,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgb(60,200,150)',
    marginVertical: 10,
  },
  loginLink: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    textDecorationLine: 'underline',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default Login;
