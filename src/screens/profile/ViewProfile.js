import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const ViewProfile = props => {
  const data = useSelector(state =>
    state.user.find(item => item.email === state.isLoggedIn[0].email),
  );

  const {colors} = useTheme();
  return (
    <View style={styles.viewProfile}>
      <ScrollView>
        <View style={styles.header}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color={colors.text} />
          </Pressable>
        </View>
        <View style={styles.viewContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profilepic}
              source={
                data.image
                  ? data.image
                  : require('../../Images/profilepic.jpeg')
              }
            />
            <Text style={[styles.name, {color: colors.text}]}>
              {data.firstName + ' ' + data.lastName}
            </Text>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.profileData}>
              <Text style={[styles.profiletext, {color: colors.text}]}>
                PROFILE
              </Text>
              <View style={styles.sectionDivider}></View>
            </View>
            <View style={styles.dataCard}>
              <View style={styles.labelSection}>
                <Ionicons name="person" size={32} color={colors.text} />
                <Text style={[styles.label, {color: colors.text}]}>
                  Username
                </Text>
              </View>
              <View style={styles.data}>
                <Text style={[styles.dataValue, {color: colors.text}]}>
                  {data.userName}
                </Text>
              </View>
            </View>
            <View style={styles.dataCard}>
              <View style={styles.labelSection}>
                <Ionicons name="call" size={32} color={colors.text} />
                <Text style={[styles.label, {color: colors.text}]}>
                  Contact
                </Text>
              </View>
              <View style={styles.data}>
                <Text style={[styles.dataValue, {color: colors.text}]}>
                  {data.phone}
                </Text>
              </View>
            </View>
            <View style={styles.dataCard}>
              <View style={styles.labelSection}>
                <Ionicons name="mail" size={32} color={colors.text} />
                <Text style={[styles.label, {color: colors.text}]}>Email</Text>
              </View>
              <View style={styles.data}>
                <Text style={[styles.dataValue, {color: colors.text}]}>
                  {data.email}
                </Text>
              </View>
            </View>
            <View style={styles.dataCard}>
              <View style={styles.labelSection}>
                <Ionicons name="calendar" size={32} color={colors.text} />
                <Text style={[styles.label, {color: colors.text}]}>DOB</Text>
              </View>
              <View style={styles.data}>
                <Text style={[styles.dataValue, {color: colors.text}]}>
                  {data.DOB}
                </Text>
              </View>
            </View>
            <View style={styles.sectionDivider}></View>
            <View style={styles.profileData}>
              <Text style={[styles.profiletext, {color: colors.text}]}>
                Other social accounts
              </Text>
            </View>
            {data.account && (
              <View style={styles.socialAccounts}>
                {data.account &&
                  data.account.map((item, index) => {
                    return (
                      <TouchableOpacity key={index}onPress={() => {Linking.openURL(`${item.id}`).catch(() => {alert('Wrong URL')})}}>
                        <Image
                          source={item.image}
                          style={styles.socialAccountsLogo}
                          alt={item.id}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewProfile: {
    padding: 10,
    height: '102%',
  },
  header: {
    height: 50,
    padding: 10,
  },
  viewContainer: {
    paddingHorizontal: 8,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  profilepic: {
    height: 160,
    width: 160,
    borderRadius: 100,
  },
  name: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },
  profileData: {
    marginTop: 20,
  },
  profiletext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  sectionDivider: {
    borderTopWidth: 2,
    borderColor: 'grey',
    marginVertical: 6,
  },
  dataCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  labelSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
    marginTop: 10,
  },
  data: {
    padding: 5,
  },
  dataValue: {
    fontSize: 16,
    marginTop: 12,
    color: 'black',
  },
  socialAccounts: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgb(200,200,200)',
    height: 80,
    maxWidth: '100%',
    alignSelf: 'center',
    padding: 8,
    marginVertical: 15,
  },
  socialAccountsLogo: {
    height: 60,
    width: 60,
    borderRadius: 50,
    margin: 10,
  },
  icons: {
    marginHorizontal: 10,
  },
});

export default ViewProfile;
