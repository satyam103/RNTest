import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import {usebackbutton} from '../../hooks/backHandler';
import RazorpayCheckout from 'react-native-razorpay';
import logo from '../../Images/RNTestLogo.jpeg';
import {Buffer} from 'buffer'

// import Razorpay from 'razorpay';

const CourseScreen = props => {
  const {colors} = useTheme();
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const ref = useRef();
  const image = {
    imagepath: require('../../Images/RNTestLogo.jpeg'),
  };
  // const instance = new Razorpay({

  const makePayment = async amount => {
    const razorpayKey = 'rzp_test_bjd2hh3t4V5Lrj';
    const keySecret = 'ZiaSo1mAbXe6u123lyrZcMLX';

    try {
      const credentials = `${razorpayKey}:${keySecret}`;
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(credentials).toString('base64')}`,
          // Authorization: `Basic ${Buffer.from(credentials).toString('base64')}`,
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR',
          receipt: 'Receipt no. 1',
          notes: {
            notes_key_1: 'Tea, Earl Grey, Hot',
            notes_key_2: 'Tea, Earl Grey… decaf.',
          },
        }),
      });

      const data = await response.json();
      console.log(data);
      setOrderId(await data.id);
      // console.log(data.id + '~~~~~dddd');
      const options = {
        description: 'Purchase description',
        image: image.imagepath,
        currency: 'INR',
        key: razorpayKey,
        amount: amount, // Replace with the actual amount in paise (e.g., 500 for Rs. 5.00)
        order_id: data.id,
        name: 'RNTest',
         // Set to null initially
        prefill: {
          email: 'gaurav.kumar@example.com',
          contact: '9191919191',
          name: 'Gaurav Kumar',
        },
        theme: {color: '#3081D0'},
      };
      checkout(options);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const checkout = async options => {
    RazorpayCheckout.open(options)
      .then(paymentResponse => {
        // console.log(options);
        console.log('Payment success:', paymentResponse);
        // Handle success
      })
      .catch(error => {
        console.error('Payment error:', error);
        // Handle error
      });
  };
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  function onBuffer() {}
  function onEnd() {}
  function videoError() {}

  const onbackpress = () => {
    setFullScreen(false);
    Orientation.lockToPortrait();
    props.navigation.goBack();
    return true;
  };
  usebackbutton(props, onbackpress);
  return (
    <View>
      {!fullScreen && (
        <View style={styles.header}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color={colors.text} />
          </Pressable>
        </View>
      )}
      <View
        style={{
          width: '100%',
          height: fullScreen ? '100%' : 200,
          backgroundColor: 'rgb(0,0,0)',
        }}>
        <TouchableWithoutFeedback onPress={() => setClicked(true)}>
          <Video
            fullscreen={fullScreen}
            paused={paused}
            ref={ref}
            ignoreSilentSwitch="ignore"
            repeat={true}
            onProgress={x => setProgress(x)}
            resizeMode="cover"
            source={require('../../../assets/video/home_video_bg.mp4')}
            onBuffer={onBuffer} // Callback when remote video is buffering
            onEnd={onEnd} // Callback when playback finishes
            onError={videoError} // Callback when video cannot be loaded
            style={[
              styles.backgroundVideo,
              fullScreen && {top: 50, bottom: 60, left: 10, right: 10},
            ]}
          />
        </TouchableWithoutFeedback>
        {clicked && (
          <TouchableOpacity
            style={[
              {
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              },
              fullScreen && {top: 0, bottom: 80},
            ]}
            onPress={() => setClicked(false)}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '95%',
                },
                fullScreen && {
                  marginTop: 10,
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  if (fullScreen) {
                    Orientation.lockToPortrait();
                  } else {
                    Orientation.lockToLandscape();
                  }
                  setFullScreen(!fullScreen);
                }}>
                <Ionicons name="expand" size={24} color={'white'} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%',
              }}>
              <TouchableOpacity
                style={styles.videoIcons}
                onPress={() => ref.current.seek(progress.currentTime - 5)}>
                <Ionicons name="play-back" size={26} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.videoIcons}
                onPress={() => setPaused(!paused)}>
                {paused ? (
                  <Ionicons name="play" size={26} color={'white'} />
                ) : (
                  <Ionicons name="pause" size={26} color={'white'} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.videoIcons}
                onPress={() => ref.current.seek(progress.currentTime + 5)}>
                <Ionicons name="play-forward" size={26} color={'white'} />
              </TouchableOpacity>
            </View>
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                },
                fullScreen && {
                  marginBottom: 10,
                },
              ]}>
              <Text style={{color: 'white'}}>
                {format(progress.currentTime)}
              </Text>
              <Slider
                style={{width: '80%', height: 40}}
                value={progress.currentTime}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={x => ref.current.seek(x)}
              />
              <Text style={{color: 'white'}}>
                {format(progress.seekableDuration)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <Pressable
        onPress={() => {
          makePayment('50000');
        }}>
        <Text> Rs.500</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    padding: 10,
    elevation: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 10,
    left: 5,
    bottom: 10,
    right: 5,
  },
  videoIcons: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default CourseScreen;
