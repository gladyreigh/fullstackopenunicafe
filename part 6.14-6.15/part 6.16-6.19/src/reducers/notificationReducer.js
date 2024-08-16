// src/reducers/notificationReducer.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload.text;
    },
    clearNotification() {
      return '';
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const notify = (message, seconds) => {
  return (dispatch) => {
    dispatch(setNotification({ text: message }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
