import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  password: "",
  transactions: [], //{ customerName: "", date: '', for: '', details: '', paid: false, cluster: 'a unique cluster', receipt: 'an image of receipt }
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setTransactions(state, action) {
      state.transactions = action.payload;
    },
  },
});
export const { setUserName, setPassword, setTransactions } = userSlice.actions;

export default userSlice.reducer;
