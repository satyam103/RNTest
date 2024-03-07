import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OptionAccordion = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Pressable style={styles.paymentMode} onPress={() => setExpanded(!expanded)}>
        <Text style={{color:'black'}}>{props.name}</Text>
        <Ionicons name={expanded? "chevron-up":"chevron-down"} color={'black'} size={18} />
      </Pressable>
      {expanded && (
        <View style={styles.accordionBody}>
          <View style={styles.accordionList}>
            <Text>
              asdhahdhsdhhshhdhhvhhhbhbhhbhhhhhhhhbhbhghghbhbhhhbhhbhbhbhb
            </Text>
          </View>
          <View style={styles.addNew}>
            <Ionicons name="add" color={'black'} size={24} />
            <Text>Add New {props.name}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  paymentMode: {
    width: '98.8%',
    marginTop: 10,
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 2,
  },
  accordionBody: {
    backgroundColor: 'white',
  },
  accordionList: {
    padding: 10,
  },
  addNew: {
    flexDirection: 'row',
    padding: 8,
    borderWidth:0.5,
    // elevation: 1,
  },
});

export default OptionAccordion;
