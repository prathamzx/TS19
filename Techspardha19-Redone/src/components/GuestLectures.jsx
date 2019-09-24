import React from 'react';
import Back from './Back';
import Loading from './Loading';
import Guest from './Guest';

const GuestLectures = props => {
    document.body.style.overflow = 'hidden';
    
  return (
    <div className='hide-overflow'>
      <Loading title='guest_lectures' />
      <div className='c-container'>
        <Back history={props} />
        <h1>/guest_lectures</h1>
        <Guest />
      </div>
    </div>
  );
};

export default GuestLectures;
