import React, { useState, useContext } from 'react';
import Context from '../contextStore/Context';
import { Redirect } from 'react-router-dom';
import Back from './Back';
import axios from 'axios';
import Loading from './Loading';
import config from '../config.json';
import ReCAPTCHA from 'react-google-recaptcha';
const Query = props => {
  const [Captcha, setCaptcha] = useState(false);
  const { state, dispatch } = useContext(Context);
  const [formData, setFormData] = useState({
    email: '',
    text: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Captcha) {
      send(formData);
      setFormData({
        email: '',
        text: ''
      });
    } else {
      dispatch({
        type: 'ADD_ERROR',
        payload: { msg: 'Captcha Invalid' }
      });
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ERRORS'
        });
      }, 3000);
    }
  };

  const send = async formData => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: state.token
        }
      };
      const body = JSON.stringify(formData);
      await axios.post(
        'https://us-central1-techspardha-87928.cloudfunctions.net/api/query',
        body,
        config
      );
      dispatch({
        type: 'ADD_ERROR',
        payload: { msg: 'query added.' }
      });
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ERRORS'
        });
      }, 3000);
    } catch (error) {
      dispatch({
        type: 'ADD_ERROR',
        payload: { msg: 'something went wrong.' }
      });
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ERRORS'
        });
      }, 3000);
    }
  };
  const captcha = () => {
    setCaptcha(true);
  };
  if (state.isAuth === false) return <Redirect to='/auth' />;

  return (
    <>
      <Loading title='ask_query' />
      <div className='c-container'>
        <Back history={props} />
        <h1>/ask_your_query.</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-item'>
            <div>
              <label htmlFor='email'>> email</label>
            </div>
            <input
              onChange={handleChange}
              value={formData.email}
              name='email'
              required='required'
              type='email'
            />
          </div>
          <div className='form-item'>
            <div>
              <label htmlFor='email'>> query</label>
            </div>
            <textarea
              rows='10'
              required='required'
              cols='50'
              onChange={handleChange}
              name='text'
              value={formData.text}
              type='text'
            />
          </div>
          <ReCAPTCHA sitekey={config.RKEY} theme={'dark'} onChange={captcha} />
          <button type='submit' className='query-send'>send</button>
        </form>
      </div>
    </>
  );
};

export default Query;
