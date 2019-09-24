import React, { useEffect, useContext, useState } from 'react';
import Context from '../contextStore/Context';
import Loading from './Loading';
import Back from './Back';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact = props => {
  document.body.style.overflow = 'auto';
  const { dispatch } = useContext(Context);
  const [contactDetails, setContactDetails] = useState({
    contacts: []
  });

  useEffect(() => {
    const abortController = new AbortController();
    const getContact = async () => {
      try {
        const res = await axios.get(
          'https://us-central1-techspardha-87928.cloudfunctions.net/api/contacts'
        );
        setContactDetails({
          ...contactDetails,
          contacts: res.data.data.contacts
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
    getContact();
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  if (contactDetails.contacts.length <= 0) return <p>fetching contacts..</p>;
  // console.log(contactDetails);
  return (
    <>
      <Loading title='contact' />
      <div className='c-container'>
        <Back history={props} />
        <h1>/contact</h1>
        <div className='contact-section'>
          <ul>
            {contactDetails &&
              contactDetails.contacts.map((cnt, index) => (
                <Link key={index} to={`/contact/${cnt.section}`}>
                  <li className='cnt-item'>> {cnt.section}</li>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contact;
