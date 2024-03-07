import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// ====================== dark mode ==========================
const darkModeSlice = createSlice({
  name: 'DarkMode',
  initialState: false,
  reducers: {
    toggleMode(state) {
      return !state;
    },
  },
});

// ========================= isLoggedIn state =============================
const isLoggedIn = createSlice({
  name: 'Login',
  initialState: [{email: 'trisatyam.103@gmail.com'}],
  reducers: {
    setLoggedIn(state, action) {
      state.push(action.payload);
    },
    resetLoggedIn(state) {
      state.pop();
    },
  },
});

// ========================= user data ============================
const userData = createSlice({
  name: 'User',
  initialState: [
    {
      confirmPass: 'aaAA@@22',
      email: 'trisatyam.103@gmail.com',
      firstName: 'Satyam',
      lastName: 'Tripathi',
      pass: 'aaAA@@22',
    },
    {
      firstName: 'Ruchika',
      lastName: 'Manwe',
      email: 'ruchi001@gmail.com',
      pass: 'aaAA@@22',
      confirmPass: 'aaAA@@22',
    },
  ],
  reducers: {
    register(state, action) {
      state.push(action.payload);
    },
    resetPass(state, action) {
      const data = state.find(items => items.email === action.payload.email);
      data.pass = action.payload.pass;
      data.confirmPass = action.payload.confirmPass;
    },
    addData(state, action) {
      const data = state.find(items => items.email === action.payload.email);
      data.image = action.payload.image;
      data.firstName = action.payload.firstName;
      data.lastName = action.payload.lastName;
      data.phone = action.payload.phone;
      data.DOB = action.payload.DOB;
      data.userName = action.payload.userName;
    },
    addSocialData(state, action) {
      const allData = state.find(items => items.email === action.payload.email);
      action.payload.accounts.forEach((data, index) => {
        const accountData =
          allData.account &&
          allData.account.find(item => item.name === data.name);
        accountData
          ? (accountData.id = data.id)
          : allData.account
          ? allData.account.push(data)
          : (allData.account = [data]);
      });
    },
  },
});

// ========================= search result =========================
const searchData = createAsyncThunk('searchData', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos/');
  return await response.data;
});
const searchResult = createSlice({
  name: 'search',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(searchData.pending, (state, action) => {
      state.isLoading = true;
      state.isError=false;
    });
    builder.addCase(searchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(searchData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action.payload);
    });
  },
});

export const {toggleMode} = darkModeSlice.actions;
export const {setLoggedIn, resetLoggedIn} = isLoggedIn.actions;
export const {register, addData, resetPass, addSocialData} = userData.actions;
export {searchData};
export {darkModeSlice, isLoggedIn, userData, searchResult};
