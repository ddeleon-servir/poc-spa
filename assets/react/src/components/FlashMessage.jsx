import React from 'react';

function FlashMessage({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow">
      {message}
    </div>
  );
}

export default FlashMessage;