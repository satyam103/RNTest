import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {usebackbutton} from '../../hooks/backHandler';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {resetLoggedIn, toggleMode} from '../../redux/Slice';

const Profile = props => {
  const data = useSelector(state =>
    state.user.find(item => item.email === state.isLoggedIn[0].email),
  );
  const darkMode = useSelector(state => state.darkMode);
  const dispatch = useDispatch();
  const {colors} = useTheme();
  // ==================== back handler ==============================
  const onbackpress = () => {
    props.navigation.goBack();
    return true;
  };
  usebackbutton(props, onbackpress);
  return (
    <SafeAreaView
      style={[styles.viewContainer, {backgroundColor: colors.background}]}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.profile}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.profilepic}
                source={
                  data.image
                    ? data.image
                    : require('../../Images/profilepic.jpeg')
                }
              />
            </View>
            <Pressable
              style={{backgroundColor: colors.background}}
              onPress={() => props.navigation.navigate('ViewProfile')}>
              <Text style={[styles.name, {color: colors.text}]}>
                {data.firstName + ' ' + data.lastName}
              </Text>
              <Text style={[styles.userName, {color: colors.text}]}>
                {data.userName}
              </Text>
            </Pressable>
            <Pressable
              style={styles.buttons}
              onPress={() => props.navigation.navigate('EditProfile')}>
              <View>
                <Text style={styles.link}>Edit Profile</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.sectionDivider}></View>
          <View style={styles.otherContent}>
            <Pressable
              style={styles.otherLinkView}
              onPress={() => props.navigation.navigate('RenderHTML')}>
              <Ionicons name="card-outline" size={30} color={colors.text} />
              <Text style={[styles.otherLinks, {color: colors.text}]}>
                My Transactions
              </Text>
            </Pressable>
            <Pressable
              style={styles.otherLinkView}
              onPress={() => props.navigation.navigate('ViewProfile')}>
              <Ionicons name="bookmark-outline" size={30} color={colors.text} />
              <Text style={[styles.otherLinks, {color: colors.text}]}>
                Bookmark
              </Text>
            </Pressable>
            <Pressable
              style={styles.otherLinkView}
              onPress={() => props.navigation.navigate('Setting')}>
              <Ionicons name="settings-outline" size={30} color={colors.text} />
              <Text style={[styles.otherLinks, {color: colors.text}]}>
                Settings
              </Text>
            </Pressable>
            <Pressable
              style={styles.otherLinkView}
              onPress={() => props.navigation.navigate('ViewProfile')}>
              <Ionicons
                name="help-circle-outline"
                size={30}
                color={colors.text}
              />
              <Text style={[styles.otherLinks, {color: colors.text}]}>
                Help
              </Text>
            </Pressable>
            <Pressable
              style={styles.otherLinkView}
              onPress={() => {
                dispatch(resetLoggedIn());
                // props.navigation.navigate('Login');
              }}>
              <Ionicons name="log-out-outline" size={30} color={colors.text} />
              <Text style={[styles.otherLinks, {color: colors.text}]}>
                Logout
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    height: '100%',
    backgroundColor: 'white',
  },
  body: {
    marginTop: 40,
    padding: 10,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  profilepic: {
    height: 180,
    width: 180,
    borderRadius: 100,
  },
  name: {
    fontSize: 27,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 17,
    textAlign: 'center',
  },
  buttons: {
    height: 45,
    width: '100%',
    padding: 5,
    backgroundColor: 'rgb(30,0,255)',
    justifyContent: 'center',
    marginVertical: 2,
    alignItems: 'center',
    marginVertical: 25,
    borderRadius: 10,
  },
  link: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionDivider: {
    borderTopWidth: 1,
    borderColor: 'grey',
    marginVertical: 6,
  },
  otherContent: {
    justifyContent: 'center',
    marginVertical: 5,
    width: '100%',
  },
  otherLinkView: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginVertical: 10,
  },
  otherLinks: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 25,
    marginVertical: 3,
  },
  switch: {
    marginTop: 5,
    marginRight:'60%'
  },
});

export default Profile;
