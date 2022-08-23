import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  updater: null,
  admin: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      console.log(action);
      state.token = action.payload;
    },
    addUpdater: (state, action) => {
      console.log(action);
      state.updater = action.payload;
    },
    addAdmin: (state, action) => {
      console.log(action);
      state.admin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, addUpdater, addAdmin } = userSlice.actions;

export const selectToken = (state) => state.user.token;
export const selectUser = (state) => state.user.updater;
export const selectAdmin = (state) => state.user.admin;

export default userSlice.reducer;
