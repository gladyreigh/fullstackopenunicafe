// src/components/Notification.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (!notification) return null;

  return (
    <div style={{ padding: '10px', border: '1px solid black', marginBottom: '10px' }}>
      {notification.message}
    </div>
  );
};

export default Notification;
