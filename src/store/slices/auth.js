import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const initialState = {
  userData,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { userData } = action.payload;
      state.userData = userData;
    },
    setLogout: (state) => {
      state.userData = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
