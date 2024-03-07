import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {usebackbutton} from '../../hooks/backHandler';
import {useSelector} from 'react-redux';
import { StreamChat } from 'stream-chat';
import { chatApiKey } from '../../../chatConfig';

const Home = props => {
  const course = [
    {name: 'cpp', image: require(`../../Images/cpp.png`)},
    {name: 'python', image: require(`../../Images/python.png`)},
    {name: 'js', image: require(`../../Images/js.png`)},
    {name: 'java', image: require(`../../Images/java.png`)},
    {name: 'c_sharp', image: require(`../../Images/c_sharp.png`)},
    {name: 'kotlin', image: require(`../../Images/kotlin.png`)},
  ];
  // ========================= back handler ============================
  const onbackpress = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
  usebackbutton(props, onbackpress);

  // ===================================================================
  const userData = useSelector(state =>
    state.user.find(item => item.email === state.isLoggedIn[0].email),
  );
  const client = StreamChat.getInstance(chatApiKey);
  // const connClient = async () => {
  //   await client.connectUser(
  //     {
  //       id: 'restless-brook-9',
  //       name: 'restless',
  //       // image: "https://bit.ly/2u9Vc0r",
  //     },
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicmVzdGxlc3MtYnJvb2stOSIsImV4cCI6MTY5OTM3NDQyMn0._qVREi1EnVV6mpt9J_ttQr0U6JkWsUpGm0SMZmwcXqQ',
  //   ); // token generated server side
  //   return client;
  // };
  // const channel = async () => {
  //   const channel = client.channel(
  //     'messaging',
  //     'the-small-council_8kVmlT7HjP',
  //     {
  //       name: 'Private Chat About the Kingdom',
  //       image: 'https://bit.ly/2F3KEoM',
  //       members: ['restless-brook-9'],
  //       session: 8, // custom field, you can add as many as you want
  //     },
  //   );

  //   await channel.watch();

  //   return channel;
  // };
  return (
    <SafeAreaView style={styles.viewContainer}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>
              Hi, {userData.firstName + ' ' + userData.lastName}
            </Text>
            <Text>What would you like to learn today ?</Text>
          </View>
          <View>
            <Pressable
              onPress={() => {
                props.navigation.navigate('inbox');
              }}>
              <Ionicons name="chatbox" size={22} color={'black'} />
            </Pressable>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.courses}>
            {course.map((item, index) => {
              return (
                <TouchableOpacity key={index}>
                  <View style={styles.courseCard}>
                    <Image style={styles.cardImage} source={item.image} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.continueLearning}>
            <View style={styles.continueHeader}>
              <View>
                <Text style={styles.continueHeading}>Continue Learning</Text>
              </View>
              <View>
                <Ionicons name="arrow-forward" size={26} color="white" />
              </View>
            </View>
            <View style={styles.continueCard}>
              <View style={styles.leftScroll}></View>
              <View style={styles.cardBody}></View>
              <View style={styles.rightScroll}></View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    height: '100%',
  },
  header: {
    height: 90,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 25,
    elevation: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'times new roman',
  },
  body: {
    marginVertical: 10,
  },
  courses: {
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  courseCard: {
    backgroundColor: 'white',
    height: 80,
    width: 80,
    margin: 12,
    elevation: 14,
    borderRadius: 10,
  },
  cardImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  continueLearning: {
    margin: 5,
    height: 150,
    borderRadius: 15,
    backgroundColor: 'rgb(200,200,200)',
  },
  continueHeader: {
    height: 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  continueHeading: {
    fontSize: 21,
    color: 'white',
  },
  continueCard: {},
  footer: {
    height: 80,
    flexDirection: 'row',
    backgroundColor: 'rgb(245,215,225)',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    marginTop: 680,
    width: '100%',
    elevation: 30,
  },
  active: {
    height: '100%',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  other: {
    height: '100%',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
