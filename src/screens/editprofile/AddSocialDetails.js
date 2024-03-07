import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {addSocialData} from '../../redux/Slice';

const options = [
  {name: 'HackerRank', image: require('../../Images/HackerRank.png')},
  {name: 'LeetCode', image: require('../../Images/LeetCode.png')},
  {name: 'GeeksForGeeks', image: require('../../Images/GeeksForGeeks.png')},
  {name: 'HackerEarth', image: require('../../Images/HackerEarth.png')},
  {name: 'Codechef', image: require('../../Images/Codechef.png')},
  {name: 'Coderbyte', image: require('../../Images/Coderbyte.png')},
];
const socialSchema = yup.object({
  id: yup.string().required(),
});
const AddSocialDetails = props => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedData, setSelectedData] = useState('');
  const index = options.findIndex(value => value.name === selectedData);
  const [accounts, setAccounts] = useState([]);
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const data = useSelector(state =>
    state.user.find(item => item.email === state.isLoggedIn[0].email),
  );
  return (
    <View style={styles.editProfileContainer}>
      <ScrollView>
        <Pressable
          style={styles.backButton}
          onPress={() => props.navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={'crimson'} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Formik
          initialValues={{linkedIn: '', github: ''}}
          onSubmit={() => {
            dispatch(addSocialData({email: data.email, accounts}));
            props.navigation.navigate('Account');
          }}>
          {({handleChange, handleSubmit, values}) => (
            <View style={styles.socialForm}>
              <View style={styles.detailsForm}>
                <View style={styles.heading}>
                  <Text style={[styles.title, {color: colors.text}]}>
                    Social Accounts
                  </Text>
                </View>
                <View style={styles.form}>
                  <View style={styles.inputView}>
                    <Text style={[styles.label, {color: colors.text}]}>
                      LinkedIn :
                    </Text>
                    <View style={styles.inputLine}>
                      <Image
                        source={require('../../Images/linkedIn.png')}
                        style={styles.socialLogo}
                      />
                      <TextInput
                        style={styles.textinput}
                        placeholder="LinkedIn Id"
                        onChangeText={handleChange('linkedIn')}
                      />
                    </View>
                  </View>
                  <View style={styles.inputView}>
                    <Text style={[styles.label, {color: colors.text}]}>
                      GitHub :
                    </Text>
                    <View style={styles.inputLine}>
                      <Image
                        source={require('../../Images/github.png')}
                        style={styles.socialLogo}
                      />
                      <TextInput
                        style={styles.textinput}
                        placeholder="GitHub Id"
                        onChangeText={handleChange('github')}
                      />
                    </View>
                  </View>
                  {accounts.map((item, index) => {
                    return (
                      <View style={styles.inputView} key={index}>
                        <Text style={[styles.label, {color: colors.text}]}>
                          {item.name}
                        </Text>
                        <View style={styles.inputLine}>
                          <Image
                            source={item.image}
                            style={styles.socialLogo}
                          />
                          <TextInput
                            style={styles.codingplatforms}
                            placeholder="Your Id"
                            value={item.id}
                            editable={false}
                          />
                          {/* <TouchableOpacity
                            style={styles.remove}
                            onPress={() => {
                              setAccounts(prev =>
                                prev.map(
                                  (items, newIndex) => newIndex !== index,
                                ),
                              );
                            }}>
                            <Ionicons name="trash" size={28} color={'red'} />
                          </TouchableOpacity> */}
                        </View>
                      </View>
                    );
                  })}
                  {isSelected ? (
                    <View style={styles.inputView}>
                      <Formik
                        initialValues={{id: ''}}
                        validationSchema={socialSchema}
                        onSubmit={values => {
                          setAccounts(prev => [
                            ...prev,
                            {
                              name: selectedData,
                              image: options[index].image,
                              id: values.id,
                            },
                          ]);
                          setIsSelected(!isSelected);
                          console.log(accounts);
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
                            <Text style={[styles.label, {color: colors.text}]}>
                              {selectedData}
                            </Text>
                            <View style={styles.inputLine}>
                              <Image
                                source={options[index].image}
                                style={styles.socialLogo}
                              />
                              <TextInput
                                style={styles.textinput}
                                placeholder="Enter your id"
                                onChangeText={handleChange('id')}
                                value={values.id}
                                onBlur={handleBlur('id')}
                              />
                            </View>
                            {touched.id && errors.id && (
                              <Text style={styles.error}>{errors.id}</Text>
                            )}
                            <Pressable
                              style={styles.addanother}
                              onPress={handleSubmit}>
                              <Ionicons
                                name="add-circle"
                                size={34}
                                color={colors.text}
                              />
                            </Pressable>
                          </>
                        )}
                      </Formik>
                    </View>
                  ) : (
                    <View style={styles.inputView}>
                      <Text style={[styles.label, {color: colors.text}]}>
                        Other Accounts
                      </Text>
                      <SelectDropdown
                        data={options.map(item => item.name)}
                        dropdownStyle={{borderWidth: 1}}
                        buttonStyle={styles.dropdown}
                        renderDropdownIcon={() => (
                          <Ionicons
                            name="chevron-down"
                            size={26}
                            color={'black'}
                          />
                        )}
                        defaultButtonText="Choose one..."
                        onSelect={value => {
                          setIsSelected(!isSelected);
                          setSelectedData(value);
                          console.log(value);
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
              <Pressable
                style={styles.buttons}
                onPress={() => {
                  if (values.linkedIn) {
                    setAccounts(prev => [
                      ...prev,
                      {
                        name: 'linkedIn',
                        image: require('../../Images/linkedIn.png'),
                        id: values.linkedIn,
                      },
                    ]);
                  }
                  if (values.github) {
                    setAccounts(prev => [
                      ...prev,
                      {
                        name: 'github',
                        image: require('../../Images/github.png'),
                        id: values.github,
                      },
                    ]);
                  }
                  handleSubmit();
                }}>
                <View>
                  <Text style={styles.link}>Save</Text>
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
  backButton: {
    marginTop: 25,
    marginLeft: 15,
    flexDirection: 'row',
  },
  backText: {
    fontSize: 20,
    marginTop: 2,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'crimson',
  },
  socialForm: {
    alignItems: 'center',
    width: 300,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  detailsForm: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: 'times new roman',
    fontWeight: 'bold',
    color: 'black',
  },
  form: {
    marginVertical: 5,
  },
  inputView: {
    margin: 8,
    width: 300,
  },
  inputLine: {
    flexDirection: 'row',
    backgroundColor: 'rgb(200,200,200)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLogo: {
    height: 40,
    width: 40,
    borderRadius: 50,
    margin: 5,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    margin: 3,
  },
  textinput: {
    backgroundColor: 'white',
    width: 250,
  },
  codingplatforms: {
    backgroundColor: 'rgba(180,150,0,0.4)',
    width: 250,
    color: 'black',
  },
  remove: {
    width: 40,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
  },
  addanother: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  dropdown: {
    backgroundColor: 'white',
    height: 50,
    width: 180,
    borderWidth: 1,
    margin: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    paddingLeft: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  dropDownButton: {
    paddingRight: 15,
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
    alignSelf: 'center',
  },
  link: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddSocialDetails;
