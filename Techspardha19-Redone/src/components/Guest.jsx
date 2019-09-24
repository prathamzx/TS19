import React, { useEffect, useState, useContext } from 'react';
import Back from './Back';
import Loading from './Loading';
import axios from 'axios';
import Context from '../contextStore/Context';
import { Link } from 'react-router-dom';
const Guest = props => {
  document.body.style.overflow = 'hidden';
  const { dispatch } = useContext(Context);
  const [istate, setState] = useState({
    guests: []
  });
  useEffect(() => {
    const getGuests = async () => {
      try {
        const res = await axios.get(
          'https://us-central1-techspardha-87928.cloudfunctions.net/api/lectures'
        );
        setState({
          ...istate,
          guests: res.data.data.lectures
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
    getGuests();
  }, []);

  const dguests = istate.guests ? (
    istate.guests.map((guest, index) => (
      <div className='guest-card' key={index}>
        <div className='guest-img'>
          <img className='guest' src={guest.imageUrl}></img>
        </div>
        <p className='guest-name'>&lt;{guest.name}/&gt;</p>
        <div className='guest-desc'><span className="guest-pointer">
          <p className='date'>
            {guest.date}, {guest.time}
          </p>
          <p>{guest.desc}</p>
          </span>
        </div>
      </div>
    ))
  ) : (
    <h1>Loading</h1>
  );

  return (
    <>
        <div className='yo horizontal-scroll-wrapper squares'>{dguests}</div>
    </>
  );
};

export default Guest;
