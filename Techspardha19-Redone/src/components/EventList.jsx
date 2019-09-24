import React, { useEffect, useState, useContext } from 'react';
import Back from './Back';
import Typist from 'react-typist';
import Context from '../contextStore/Context';
import Loading from './Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sound from 'react-sound';
const EventList = props => {
  document.body.scroll = 'yes';
  document.body.style.overflow = 'auto';
  const [bool, setState1] = useState('PLAYING');
  const category = props.match.params.category;
  const { dispatch } = useContext(Context);
  const [istate, setState] = useState({
    events: []
  });
  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(
          'https://us-central1-techspardha-87928.cloudfunctions.net/api/events'
        );
        setState({
          ...istate,
          events: res.data.data.events
        });
      } catch (error) {
        dispatch({
          type: 'ADD_ERROR',
          payload: { msg: 'Error Occured: Try refreshing' }
        });
        setTimeout(() => {
          dispatch({
            type: 'REMOVE_ERRORS'
          });
        }, 3000);
      }
    };
    getEvents();
  }, []);
  const pause = function pausemusic() {
    setState1('PAUSED');
  };
  if (istate.events.length <= 0) return <p>fetching events..</p>;
  return (
    <>
      <Loading title={`${category}`} />
      <div className='c-container'>
        <Back history={props} />
        <h1>{`/${category}`}</h1>

        <div className='ievent-list'>
          <ul className="event-ul">
            {istate.events
              .filter(event => event.eventCategory === category)
              .map((event, index) => (
                <Link key={index} to={`/events/${category}/${event.eventName}`}>
                  <Typist
                    startDelay={50}
                    avgTypingDelay={60}
                    stdTypingDelay={300}
                    cursor={{
                      show: false,
                      blink: true,
                      element: '>',
                      hideWhenDone: true
                    }}
                    onTypingDone={pause}
                  >
                    <li className='cnt-item'>> {event.eventName}</li>
                  </Typist>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EventList;
