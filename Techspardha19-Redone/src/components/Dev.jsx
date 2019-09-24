import React, { useEffect, useState, useContext } from 'react';
import Context from '../contextStore/Context';
import Back from './Back';
import Loading from './Loading';
import axios from 'axios';
const Dev = props => {
  document.body.style.overflow = 'auto';

  const { state, dispatch } = useContext(Context);
  const [istate, setState] = useState([]);

  useEffect(() => {
    const getDevs = async () => {
      try {
        const res = await axios.get(
          'https://us-central1-techspardha-87928.cloudfunctions.net/api/about'
        );

        setState([...res.data.data.devs]);
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
    getDevs();
  }, []);

  return (
    <>
      <Loading title='devs' />
      <div className='c-container'>
        <Back history={props} />
        <h1>/devs</h1>
        <div className='n-devs'>
          {istate.length > 0 &&
            istate.map((d, i) => (
              <div key={i} className='n-dev'>
                <div className='d-img'>
                  <img className='dev-img' src={d.imageUrl} alt='img' />
                </div>
                <div className='n-details'>
                  <div className='n-name'>
                    <p>{d.name}</p>
                  </div>
                  <div className='g-icon'>
                    <a href={d.link}>
                      {' '}
                      <i className='fab fa-github fa-2x'></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Dev;
