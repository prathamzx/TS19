import React from 'react';
import Back from './Back';
import Loading from './Loading';
import EventsList from './EventsList';

const EventCategories = props => {
    document.body.style.overflow = 'hidden';
  return (
    <div className='hide-overflow'>
      <Loading title='events' />
      <div className='c-container'>
        <Back history={props} />
        <h1>/event_categories</h1>
        <EventsList />
      </div>
    </div>
  );
};

export default EventCategories;
