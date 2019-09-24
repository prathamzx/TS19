import React, { useContext, useState } from 'react';
import Back from './Back';
import Loading from './Loading';
import Context from '../contextStore/Context';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const Onboard = props => {
  const { state, dispatch } = useContext(Context);
  const [formData, setFormData] = useState({
    phone: '',
    college: '',
    year: ''
  });

  if (state.user == null || state.user.onBoard == true)
    return <Redirect to='/' />;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    const body = JSON.stringify({
      ...formData,
      email: state.user.email
    });

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: state.token
        }
      };
      const res = await axios.put(
        'https://us-central1-techspardha-87928.cloudfunctions.net/api/user',
        body,
        config
      );
      dispatch({
        type: 'ONBOARDED',
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: 'ADD_ERROR',
        payload: { msg: 'error: try refreshing...' }
      });
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ERRORS'
        });
      }, 3000);
    }
  };
  let i=0,text='';
  function name(n) {
    while (i < n.length) {
      if (n[i] === ' ') {
        text += '_';
        i++;
      } else {
        text += n[i];
        i++;
      }
    }
    return text;
  }

  return (
    <>
      <Loading title='onboard' />
      <div className='c-container'>
        <Back history={props} />
        <h1>/onboard</h1>
        <h2>hey @+{name(state.user.name)  }/</h2>
        <p>> welcome_to_techspardha/2019</p>

        <div className='form'>
          <form onSubmit={onSubmit}>
            <label htmlFor='phone'>phone_no</label>
            <div className='form-item'>
              <input
                name='phone'
                onChange={handleChange}
                type='text'
                maxLength='10'
                required='required'
              />
            </div>
            <label htmlFor='college'>college</label>
            <div className='form-item'>
              <input
                name='college'
                onChange={handleChange}
                type='text'
                required='required'
              />
            </div>
            <label htmlFor='year'>year</label>
            <div className='form-item'>
              <select name='year' onChange={handleChange} required='required'>
                <option value='1st'>1st</option>
                <option value='2nd'>2nd </option>
                <option value='3rd'>3rd</option>
                <option value='4th'>4th</option>
              </select>
            </div>
            <button className='query-send'>send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Onboard;
