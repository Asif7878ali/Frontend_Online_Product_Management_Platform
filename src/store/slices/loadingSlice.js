import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    Isloading: false,
  },

  reducers: {
    setLoading: (state, action) => {
      state.Isloading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
