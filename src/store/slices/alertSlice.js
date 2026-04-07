import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    message: "",
    alertType: "",
    visible: false,
  },
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.alertType = action.payload.alertType;
      state.visible = true;
    },
    hideAlert: (state) => {
      state.visible = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
