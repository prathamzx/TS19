import React from 'react';

const Auth = props => {
  const handleClick = () => {
    props.history.push('/');
  };
  return (
    <div className='c-container'>
      <p className='back' onClick={() => props.history.push('/')}>
        /
      </p>
      <h1>You need to be authenticated.</h1>
      <p onClick={handleClick} className='pointer'>
        > {'try /auth <signin/signup>'}
      </p>
    </div>
  );
};

export default Auth;
