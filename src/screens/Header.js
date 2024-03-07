import React from 'react';
import {ScrollView, Animated, View, Text, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Your Header</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    // color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
