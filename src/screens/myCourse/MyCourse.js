import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyCourse = (props) => {
  const {colors} = useTheme();
  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.pageHeading, {color: colors.text}]}>
          My Courses
        </Text>
      </View>
      <ScrollView>
        <View style={styles.searchBar}>
          <TextInput placeholder="Search for ..." />
          <View style={styles.searchIcon}>
            <Ionicons name="search" size={25} color={'white'} />
          </View>
        </View>
        <View style={styles.myCourseBody}>
          <View style={styles.navbar}>
            <View
              style={[
                styles.navbarLinks,
                {backgroundColor: 'green', color: 'white'},
              ]}>
              <Text style={styles.navLink}>All Courses</Text>
            </View>
            <View style={styles.navbarLinks}>
              <Text style={styles.navLink}>Ongoing</Text>
            </View>
            <View style={styles.navbarLinks}>
              <Text style={styles.navLink}>Completed</Text>
            </View>
          </View>
          <Pressable style={styles.courseContent} onPress={() => props.navigation.navigate('CourseScreen')}>
            <View style={styles.courseImage}></View>
            <View style={styles.courseData}></View>
          </Pressable>
          <Pressable style={styles.courseContent} onPress={() => props.navigation.navigate('CourseScreen')}>
            <View style={styles.courseImage}></View>
            <View style={styles.courseData}></View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 90,
    justifyContent: 'center',
    padding: 25,
    elevation: 1,
  },
  pageHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'space-between',
    alignItems:'center',
    height:50
  },
  searchIcon: {
    height: 40,
    width: 40,
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
  },
  myCourseBody: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },
  navbar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  navbarLinks: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 20,
  },
  navLink: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseContent: {
    height: 120,
    width: '100%',
    marginTop: 15,
    elevation: 5,
    flexDirection: 'row',
    borderRadius: 20,
  },
  courseImage: {
    backgroundColor: 'black',
    width: 120,
    height: '100%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  courseData: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default MyCourse;
