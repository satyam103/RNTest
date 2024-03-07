import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OptionAccordion from './OptionAccordion';

const options = ['Saved Card', "UPI Id", "Net Banking"]

const PaymentOptions = props => {
  const {colors} = useTheme();
  return (
    <View>
      <View style={styles.header}>
        <Pressable onPress={() => props.navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={colors.text} />
        </Pressable>
      </View>
      <View style={styles.viewPaymentMode}>
        {options.map((item,index) => (
            <OptionAccordion name={item} key={index}/>

        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 50,
    padding: 10,
  },
  viewPaymentMode: {
    width: '90%',
    alignItems: 'center',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
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
    // borderWidth: 0.5,
    padding:8,
    elevation:1,
  },
});

export default PaymentOptions;
