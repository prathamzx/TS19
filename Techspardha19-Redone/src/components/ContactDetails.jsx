import React, { useEffect, useContext, useState } from 'react';
import Context from '../contextStore/Context';
import Loading from './Loading';
import Back from './Back';
import axios from 'axios';

const ContactDetails = props => {
  // document.body.style.overflow = 'auto';
  const { dispatch } = useContext(Context);
  const [contactDetails, setContactDetails] = useState({
    contacts: []
  });

  useEffect(() => {
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
  }, []);
  if (contactDetails.contacts.length <= 0) return <p>fetching contacts..</p>;

  const secContacts = contactDetails.contacts.filter(
    cnt => props.match.params.section === cnt.section
  );

  const people =
    secContacts[0].people.length > 0 ? (
      secContacts[0].people.map((ppl, index) => (
        <div key={index}>
          {/* <img className='contact-img' src={ppl.imageUrl} alt={ppl.name} /> */}
          <p>- {ppl.name}</p>
          <p>&nbsp;&nbsp;{ppl.post}</p>
          <p>&nbsp;&nbsp;[{ppl.phoneNo}]</p>
          <br/>
        </div>
      ))
    ) : (
      <p>No contacts found</p>
    );
    console.log(contactDetails);
  return (
    <>
      <Loading title='contact' />
      <div className='c-container'>
        <Back history={props} />
        <h1>/{props.match.params.section}</h1>
        <div>{people}</div>
      </div>
    </>
  );
};

export default ContactDetails;
