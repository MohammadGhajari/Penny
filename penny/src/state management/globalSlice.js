import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});
export const { setUsers } = globalSlice.actions;

export default globalSlice.reducer;
