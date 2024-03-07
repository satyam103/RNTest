import React, {useRef, useState} from 'react';
import {Animated, Text, View, StyleSheet, Button} from 'react-native';
import GlobalStyle from './GlobalStyle';
import Video from 'react-native-video';
import {Easing} from 'react-native';

const Notifications = () => {
  const [animatedValue] = useState(new Animated.Value(0));
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function onBuffer() {}
  function onEnd() {}
  function videoError() {}

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const slideInOutAnim = toValue =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    });
  return (
    <View style={GlobalStyle.notificationContainer}>
      <View style={GlobalStyle.header}>
        <Text style={GlobalStyle.heading}>Notification</Text>
      </View>
      <View
        style={{
          backgroundColor: 'rgb(239, 239, 239)',
          justifyContent: 'flex-end',
          alignContent: 'center',
          flex: 1,
        }}>
        <Video
          ignoreSilentSwitch="ignore"
          repeat={true}
          resizeMode="cover"
          // eslint-disable-next-line
          source={require('../../../assets/video/home_video_bg.mp4')}
          ref={ref => {
            this.player = ref;
          }}
          onBuffer={onBuffer} // Callback when remote video is buffering
          onEnd={onEnd} // Callback when playback finishes
          onError={videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
        />
        <Text>This is notifications screen</Text>

        <Animated.View
          style={[
            styles.fadingContainer,
            {
              // Bind opacity to animated value
              opacity: fadeAnim,
            },
          ]}>
          <View style={{height:80,width:'100%',backgroundColor: 'powderblue',}}>
            <Text style={styles.fadingText}>Fading View!</Text>
          </View>
        </Animated.View>
        <View style={styles.buttonRow}>
          <Button
            title="Fade In View"
            onPress={() => {
              fadeIn();
              slideInOutAnim(1).start();
            }}
          />
          <Button
            title="Fade Out View"
            onPress={() => {
              fadeOut();
              slideInOutAnim(1).start();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});

export default Notifications;
