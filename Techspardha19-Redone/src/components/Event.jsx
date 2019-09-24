import React, { useEffect, useState, useContext } from 'react';
import Back from './Back';
import Context from '../contextStore/Context';
import Loading from './Loading';
import Typist from 'react-typist';
import axios from 'axios';
import Sound from 'react-sound';
import dateFormat from 'dateformat';
const Event = props => {
  document.body.scroll = 'yes';
  document.body.style.overflow = 'auto';
  const event = props.match.params.event;
  const category = props.match.params.category;
  const [bool, setState2] = useState('PLAYING');
  const [iState, setState] = useState({});
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const res = await axios.get(
          `https://us-central1-techspardha-87928.cloudfunctions.net/api/events/description?eventCategory=${category}&eventName=${event}`
        );
        setState(res.data.data);
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

    getEventDetails();
  }, []);

  if (iState === undefined) return <p>fetching data..</p>;
  if (iState.coordinators === undefined) return <p>fetching data..</p>;
  const coord =
    iState.coordinators.length > 0 ? (
      iState.coordinators.map((c, index) => (
        <div key={index}>
          <p>- {c.coordinator_name}</p>
          <p>[{c.coordinator_number}]</p>
        </div>
      ))
    ) : (
      <p>fetching coordinators...</p>
    );

  const register = async () => {
    if (state.user == null || !state.isAuth) {
      props.history.push('/auth');
    } else {
      const body = {
        eventName: event,
        eventCategory: category,
        email: state.user.email
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: state.token
        }
      };

      try {
        dispatch({
          type: 'ADD_ERROR',
          payload: { msg: 'Registering' }
        });
        setTimeout(() => {
          dispatch({
            type: 'REMOVE_ERRORS'
          });
        }, 3000);
        const res = await axios.put(
          'https://us-central1-techspardha-87928.cloudfunctions.net/api/user/event',
          body,
          config
        );
        dispatch({
          type: 'ADD_ERROR',
          payload: { msg: res.data.message }
        });
        dispatch({
          type: 'ADD_ERROR',
          payload: { msg: 'registered' }
        });
        setTimeout(() => {
          dispatch({
            type: 'REMOVE_ERRORS'
          });
        }, 3000);
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
    }
  };
  function time(timestamp) {
    var myDate = new Date(timestamp);
    var x = dateFormat(myDate, 'hh:MM TT');
    return x;
  }
  function date(timestamp) {
    var myDate = new Date(timestamp);
    var x = dateFormat(myDate, "dddd, dd mmm");
    return x;
  }
  const pause = function pausemusic() {
    setState2('STOPPED');
  };

  return (
    <>
      <Sound url='../../type2.mp3' playStatus={bool} />
      <Loading title={event} />
      <div className='c-container'>
        <Back history={props} />
        <span>
          <div className='heading'>
            <div>
              <h1>{`/${event}`}</h1>
            </div>
            <div className='flagship'>
              <span>
                {' '}
                {iState.flagship === 'true' ? <p>[flagship]</p> : null}
              </span>
            </div>
          </div>
        </span>
        <Typist
          startDelay={0}
          avgTypingDelay={0}
          stdTypingDelay={0}
          cursor={{
            show: true,
            blink: true,
            element: '>',
            hideWhenDone: false
          }}
          onTypingDone={pause}
        >
          <div>
            <div className='min-details'>
              <h3 onClick={register} className='register'>
                [- REGISTER -]
              </h3>
              <p>start time: {time(iState.startTime).toString()}, {date(iState.startTime).toString()} </p>
              <p>venue: {iState.venue}</p>
              <span>
                google_form:
                <a
                  target='_blank'
                  style={{ textDecoration: 'underline' }}
                  href={iState.file}
                >
                  link
                </a>
              </span>
              <h4>event_description:</h4>
              <p> {iState.description}</p>
              <h4>rules:</h4>
              <div>
                {iState.rules != null && iState.rules.length > 0 ? (
                  iState.rules.map((r, i) => <p key={i}>- {r}</p>)
                ) : (
                  <p>no rules</p>
                )}
              </div>
              <br />
              <h4>Coordinators :</h4>
              {coord}
            </div>
          </div>
        </Typist>
      </div>
    </>
  );
};

export default Event;
