import React from 'react';
import TimelineHome from './Timeline';
import Back from './Back';
import Loading from './Loading';
const EventTimeline = props => {
  return (
    <>
      <Loading title='timeline' />
      <div className='c-container'>
        <Back history={props} />
        <h1>/timeline</h1>
        <div>
          <TimelineHome />
        </div>
      </div>
    </>
  );
};

export default EventTimeline;
