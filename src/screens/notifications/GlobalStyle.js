import {StyleSheet} from 'react-native';

const GlobalStyle = StyleSheet.create({
  notificationContainer: {
    height: '100%',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 8,
    elevation: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'times new roman',
  },
});

export default GlobalStyle;
