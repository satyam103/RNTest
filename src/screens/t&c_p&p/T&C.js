import React from 'react';
import {Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TermCondition = (props) => {
  const arr = [
    'a',
    'a',
    'a',
    'b',
    'a',
    'k',
    'a',
    'n',
    'a',
    'p',
    'f',
    'd',
    's',
    'r',
    'r',
    'n',
    'e',
    'g',
    't',
    'y',
    'h',
    'b',
  ];
  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.header}>
        <Pressable onPress={props.navigation.goBack}>
          <Ionicons name="arrow-back-circle" size={28}/>
        </Pressable>
        <Text style={styles.heading}>Terms & Conditions</Text>
        <Text></Text>
      </View>
      <View style={styles.mainContainer}>
        <ScrollView>
          <View>
            {arr.map((value, index) => {
              return (
                <View key={index}>
                  <Text style={styles.terms}>vbsjdbcjnc nklncnkmncbjn</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    height: '100%',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'rgb(140,190,190)',
    justifyContent: 'space-between',
    padding: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'times new roman',
  },
  mainContainer: {
    padding: 10,
  },
  terms: {
    marginVertical: 10,
  },
});

export default TermCondition;
