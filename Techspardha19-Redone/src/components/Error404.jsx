import React from 'react';
const Error404 = props => {
  return (
    <div className='c-container'>
      <p className='back' onClick={() => props.history.push('/')}>
        ../
      </p>
      <h1>error 404</h1>
    </div>
  );
};

export default Error404;
