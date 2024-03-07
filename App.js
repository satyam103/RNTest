/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Routing from './src/routing/Routing';
import {Provider} from 'react-redux';
import store from './src/redux/Store';
// import {AppProvider} from './src/hooks/AppContext';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <Provider store={store}>
      {/* <AppProvider> */}
        {/* <GestureHandlerRootView style={{flex: 1}}> */}
        {/* <NavigationContainer> */}
          <Routing />
        {/* </NavigationContainer> */}
        {/* </GestureHandlerRootView> */}
      {/* </AppProvider> */}
    </Provider>
  );
}

export default App;
