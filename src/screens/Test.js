import React, {useState, useRef} from 'react';
import {ScrollView, Animated,View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import  {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const Header_Max_Height = 50;
const Header_Min_Height = 0;

const Test = () => {
    const insets = useSafeAreaInsets();
    const scrollY = useRef(new Animated.Value(0)).current;
  //   const [headerVisible, setHeaderVisible] = useState(true);

    const scrollHandler = Animated.event(
      [{nativeEvent: {contentOffset: {y: scrollY}}}],
    );

    const animateHeaderTransform = scrollY.interpolate({
      inputRange: [0, Header_Max_Height + insets.top],
      outputRange: [0, -Header_Max_Height - insets.top],
      extrapolate: 'clamp',
    });

  //   const animateHeaderOpacity = scrollY.interpolate({
  //     inputRange: [0, Header_Max_Height - Header_Min_Height],
  //     outputRange: [1, 0],
  //     extrapolate: 'clamp',
  //   });
    const headerHeight =  scrollY.interpolate({
      inputRange: [0, Header_Max_Height ],
      outputRange: [Header_Max_Height , 0],
      extrapolate: 'clamp'
    })
//   const scrollY = useSharedValue(0);

//   const headerHeight = interpolate(
//     scrollY.value,
//     [0, 100],
//     [100, 0],
//     Extrapolate.CLAMP,
//   );

//   const scrollHandler = useAnimatedScrollHandler(event => {
//     scrollY.value = event.contentOffset.y;
//   });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          height: headerHeight,
          backgroundColor: '#3498db',
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ translateY: animateHeaderTransform }],
        }}>
        <Text style={styles.headerText}>Your Header</Text>
      </Animated.View>
      <ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}>
        {/* Your scrollable content goes here */}
        {Array.from({length: 50}).map((_, index) => (
          <View key={index} style={styles.contentItem}>
            <Text style={{color: 'black'}}>Item {index + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // paddingTop: Header_Max_Height + insets.top,
  },
  contentItem: {
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Test;
