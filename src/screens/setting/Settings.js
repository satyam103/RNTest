import React from 'react';
import {View, StyleSheet, Pressable, Text, Switch} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleMode} from '../../redux/Slice';

const Settings = props => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.darkMode);

  const {colors} = useTheme();
  return (
    <View style={styles.settingContainer}>
      <View style={styles.header}>
        <Pressable onPress={() => props.navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={colors.text} />
        </Pressable>
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.linkContainer}>
          <Text style={[styles.linkText, {color: colors.text}]}>General</Text>
        </View>
        <View style={[styles.card, darkMode && {backgroundColor: 'grey'}]}>
          <Pressable style={styles.linkContainer} onPress={() => props.navigation.navigate('PaymentOpt')}>
            <Text style={[styles.linkText, {color: colors.text}]}>
              Payment Options
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </Pressable>
          <Pressable
            style={styles.linkContainer}
            onPress={() => props.navigation.navigate('ChangePassword')}>
            <Text style={[styles.linkText, {color: colors.text}]}>
              Change Password
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </Pressable>
        </View>
        <View style={styles.linkContainer}>
          <Text style={[styles.linkText, {color: colors.text}]}>Theme</Text>
        </View>
        <View style={[styles.card, darkMode && {backgroundColor: 'grey'}]}>
          <View style={styles.linkContainer}>
            <Text style={[styles.linkText, {color: colors.text}]}>
              DarkMode
            </Text>
            <Switch
              style={styles.switch}
              trackColor={{false: 'grey', true: 'white'}}
              thumbColor={darkMode ? 'aqua' : '#f4f3f4'}
              value={darkMode}
              onValueChange={() => {
                dispatch(toggleMode());
              }}
            />
          </View>
        </View>
        <View style={styles.linkContainer}>
          <Text style={[styles.linkText, {color: colors.text}]}>About</Text>
        </View>
        <View style={[styles.card, darkMode && {backgroundColor: 'grey'}]}>
          <Pressable
            style={styles.linkContainer}
            onPress={() => props.navigation.navigate('Term')}>
            <Text style={[styles.linkText, {color: colors.text}]}>
              Term and Condition
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </Pressable>
          <Pressable
            style={styles.linkContainer}
            onPress={() => props.navigation.navigate('PrivacyP')}>
            <Text style={[styles.linkText, {color: colors.text}]}>
              Privacy Policy
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  settingContainer: {},
  header: {
    height: 50,
    padding: 10,
  },
  viewContainer: {
    margin: 5,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  linkText: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  switch: {
    marginTop: 5,
  },
  card: {
    margin: 10,
    padding: 10,
    elevation: 5,
    // height: 100,
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    // alignSelf:'flex-end'
  },
});

export default Settings;
