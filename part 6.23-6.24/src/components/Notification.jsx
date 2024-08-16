// src/components/Notification.jsx
import React, { useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const { state, dispatch } = useNotification();

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.message, dispatch]);

  if (!state.message) return null;

  return (
    <div style={{
      padding: '10px',
      background: state.messageType === 'success' ? 'lightgreen' : 'lightcoral',
      color: 'black',
      border: '1px solid',
      borderRadius: '5px',
      marginBottom: '10px'
    }}>
      {state.message}
    </div>
  );
};

export default Notification;
