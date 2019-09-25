import React, { useEffect, useState, useContext } from 'react';
import Back from './Back';
import Loading from './Loading';
import axios from 'axios';
import Context from '../contextStore/Context';
const Sponsors = props => {
  document.body.scroll = 'yes';
  document.body.style.overflow = 'auto';
  const { dispatch } = useContext(Context);
  const [istate, setState] = useState({
    sponsors: []
  });
  useEffect(() => {
    const getSponsors = async () => {
      try {
        const res = await axios.get(
          'https://us-central1-techspardha-87928.cloudfunctions.net/api/sponsors'
        );
        setState({
          ...istate,
          sponsors: res.data.data.paisa
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
    getSponsors();
  }, []);

  function titleSponsor(sponsor, index) {
    if (sponsor.sponsorSection=="Title Sponsor") {
      return 'titleSponsor';
    } else {
      return 'spnsrImgAndTitleSection';
    }
  }

  return (
    <>
      <Loading title='sponsors' />
      <div className='c-container'>
        <Back history={props} />
        <h1>Sponsors</h1>

        <div className='sponsor'>
          {istate.sponsors.map((sponsor, index) => (
            <div key={index} className={titleSponsor(sponsor, index)}>
              <span className='sectionAndImage'>
                <span className='spsrTitle'>{sponsor.sponsorSection}</span>
                  <span className='spnsrImageDiv'>
                {sponsor.sponsors.map((url, index2) => (
                    <img
                      key={index2}
                      className='sponsorImage'
                      src={url.imageUrl}
                      target={url.targetUrl}
                    ></img>
                ))}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sponsors;
