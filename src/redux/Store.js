import {configureStore} from '@reduxjs/toolkit';
import {darkModeSlice,isLoggedIn,searchResult,userData} from './Slice';

const store = configureStore({
  reducer: {
    darkMode: darkModeSlice.reducer,
    isLoggedIn: isLoggedIn.reducer,
    user:userData.reducer,
    searchResult:searchResult.reducer,
  },
});

export default store;