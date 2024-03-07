import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddBasicDetails from './AddBasicDetails';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {SelectProfileModal} from './SelectProfileModal';
import {addData} from '../../redux/Slice';

const EditProfile = props => {
  const dispatch = useDispatch();
  const data = useSelector(state =>
    state.user.find(item => item.email === state.isLoggedIn[0].email),
  );
  const [image, setImage] = useState(
    data.image ? data.image : require('../../Images/profilepic.jpeg'),
  );
  const [showModal, setShowModal] = useState(false);

  // ====================== handle modal ==========================
  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <View
      style={
        showModal
          ? [styles.editProfileContainer, {opacity: 0.3}]
          : styles.editProfileContainer
      }>
      <ScrollView>
        <Pressable
          style={styles.cancelButton}
          onPress={() => props.navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={'crimson'} />
          <Text style={styles.canceltext}>Cancel</Text>
        </Pressable>
        <Formik
          initialValues={{
            email: data.email,
            image: data.image ? data.image : image,
            firstName: data.firstName ? data.firstName : '',
            lastName: data.lastName ? data.lastName : '',
            userName: data.userName ? data.userName : '',
            phone: data.phone ? data.phone : '',
            DOB: data.DOB ? data.DOB : '',
          }}
          onSubmit={values => {
            values.image = image;
            dispatch(addData(values));
            props.navigation.navigate('AddSocialDetails');
          }}>
          {({handleChange, handleSubmit, values}) => (
            <View style={styles.editprofileform}>
              <View style={styles.editProfile}>
                <View style={styles.imageContainer}>
                  <Pressable onPress={handleModal}>
                    <Image style={styles.image} source={image} />
                  </Pressable>
                </View>
              </View>
              <SelectProfileModal
                showModal={showModal}
                handleModal={handleModal}
                setImage={setImage}
                handleChange={handleChange}
              />
              <View style={styles.editDetails}>
                <AddBasicDetails
                  values={values}
                  handleChange={handleChange}
                />
              </View>
              <Pressable style={styles.buttons} onPress={handleSubmit}>
                <View>
                  <Text style={styles.link}>Save & next</Text>
                </View>
              </Pressable>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  editProfileContainer: {
    padding: 10,
    justifyContent: 'center',
    height: '101%',
  },
  cancelButton: {
    marginTop: 25,
    marginLeft: 15,
    flexDirection: 'row',
  },
  canceltext: {
    fontSize: 20,
    marginTop: 2,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'crimson',
  },
  editprofileform: {
    alignItems: 'center',
    width: 300,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  editProfile: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  header: {
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
  buttons: {
    height: 45,
    width: '100%',
    padding: 5,
    backgroundColor: 'rgb(30,0,255)',
    justifyContent: 'center',
    marginVertical: 2,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  link: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;
