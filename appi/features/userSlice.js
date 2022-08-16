import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      console.log(action);
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken } = userSlice.actions;

export const selectToken = (state) => state.user.token;

export default userSlice.reducer;
