// src/reducers/notificationReducer.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return { message: action.payload.message, timeoutId: action.payload.timeoutId };
    },
    clearNotification() {
      return null;
    }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, duration) => {
  return dispatch => {
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);

    dispatch(setNotification({ message, timeoutId }));
  };
};

export default notificationSlice.reducer;
