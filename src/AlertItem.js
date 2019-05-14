import React, { forwardRef } from 'react';


export const AlertItem = forwardRef(
  ({ type, message, onClose }, ref) => (
    <div
      ref={ref}
      className={`alert alert-${type}`}
    >
      {message}

      <div onClick={onClose}>&times;</div>
    </div>
  )
);