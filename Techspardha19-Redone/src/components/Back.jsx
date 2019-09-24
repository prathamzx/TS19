import React from 'react';

const Back = ({ history }) => {

  return (
    <>
      <p className='back' onClick={() => {
        history.history.goBack()}}>
        ../
      </p>
    </>
  );
};

export default Back;
