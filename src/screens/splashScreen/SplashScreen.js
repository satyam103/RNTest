import React from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <View style={styles.viewContainer}>
        <Image
          style={styles.image}
          source={require('../../Images/RNTestLogo.jpeg')}
        />
        <View style={{marginVertical: 20}}>
          <Text style={styles.highlight}> RNTest </Text>
        </View>
        <View>
          <Text style={styles.aboutContainer}>
            A fast and easy way to learn things. A platform that provides a
            quick way to learn coding concepts and enhance skills.
          </Text>
        </View>
      </View>

      {/* <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#00ff00"  />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashContainer: {
    height:"100%",
    backgroundColor: 'rgb(20,120,210)',
  },
  activityIndicator:{
    marginBottom:50,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 80,
  },
  highlight: {
    textAlign: 'center',
    backgroundColor: 'white',
    fontWeight: '900',
    width: 200,
    height: 58,
    fontSize: 40,
  },
  aboutContainer: {
    marginTop: 70,
    color: 'white',
    width: 300,
    textAlign: 'justify',
  },
});

export default SplashScreen;
