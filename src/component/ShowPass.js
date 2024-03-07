import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ShowPass = props => {
  return (
    <>
      {!props.showPass ? (
        <TouchableOpacity onPress={() => props.onViewPass()}>
          <Ionicons name="eye" size={20} style={styles.icons} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => props.onViewPass()}>
          <Ionicons name="eye-off" size={20} style={styles.icons} />
        </TouchableOpacity>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  icons: {
    padding: 10,
    marginHorizontal: 2,
    color: 'white',
  },
});

export default ShowPass;
