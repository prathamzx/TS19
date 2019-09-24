import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from '../config.json';
import Context from '../contextStore/Context';
import axios from 'axios';
import Loading from './Loading';
import LinesRain from './LinesRain.jsx';
import Sound from 'react-sound';
import './dino.css';
import TimelineHome from './Timeline.jsx';
import './btn.scss';
const Home = props => {
  // document.body.scroll = "yes";
  document.body.style.overflow = 'hidden';
  const [bool, setState1] = useState('PLAYING');
  const { state, dispatch } = useContext(Context);
  const { isAuth } = state;
  const [obfuscate, setObfuscate] = useState({
    obs: true
  });

  if (state.user && !state.user.onBoard) {
    props.history.push('/onboard');
  }
  useEffect(() => {
    setTimeout(() => {
      setObfuscate({
        ...obfuscate,
        obs: false
      });
    }, 300);
  }, []);
  const list = [
    '/about',
    '/events',
    '/guest_lectures',
    '/sponsors',
    '/ask_queries',
    '/timeline',
    '/contact',
    '/devs'
  ];

  // const tickAudioClip=()=>{
  //   if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7")!=-1) || (navigator.appVersion.indexOf("MSIE 8")!=-1)) {
  //     if (document.all)
  //      {
  //       document.all.sound.src = "click.mp3";
  //      }
  //     }
  //     else {
  //     {
  //     var audio = document.getElementsByTagName("audio")[0];
  //     audio.volume=0.3;
  //     audio.play();
  //     }
  //     }
  // }

  const homeList = list.map((item, index) => (
    <li key={index} className={item === '/timeline' ? 'yoyo' : null}>
      <div className='gt'>&gt;&nbsp;</div>

      <Link to={item}>
        <span className='menu-list'>{item}</span>
      </Link>
    </li>
  ));

  const onsuccess = async user => {
    try {
      const id_token = user.getAuthResponse().id_token;
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify({ idToken: id_token });

      const res = await axios.post(
        'https://us-central1-techspardha-87928.cloudfunctions.net/api/login',
        body,
        config
      );

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: 'ADD_ERROR',
        payload: { msg: 'auth error' }
      });
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ERRORS'
        });
      }, 3000);
    }
  };
  const onfailure = () => {
    dispatch({
      type: 'ADD_ERROR',
      payload: { msg: 'auth error' }
    });
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_ERRORS'
      });
    }, 3000);
  };

  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    });
    dispatch({
      type: 'ADD_ERROR',
      payload: { msg: 'user logged out.' }
    });
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_ERRORS'
      });
    }, 3000);
  };
  let text = '',
    i = 0;
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
    <div className='Lightning'>
      <Loading title='home' />
      <LinesRain />
      <div className='container'>
        <div className='move-user'>
          <div className='user-img'>
            {state.user && (
              <img className='l-user' src={state.user.picture} alt='user-img' />
            )}
          </div>
          <div className='sudo'>
            {state.user && (
              <p
                className='pointer'
                onClick={() => props.history.push('/dashboard')}
              >
                @+{name(state.user.name)}/
              </p>
            )}
            {isAuth ? (
              <div className='logout'>
                <GoogleLogout
                  clientId={config.GIDKEY}
                  render={renderProps => (
                    <p
                      className='p-logout'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      {'<logout>'}
                    </p>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            ) : (
              <div className='signin'>
                <GoogleLogin
                  clientId={config.GIDKEY}
                  render={renderProps => (
                    <p
                      className='p-signin'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      {'<Signin/Signup>'}
                    </p>
                  )}
                  isSignedIn={true}
                  onSuccess={onsuccess}
                  onFailure={onfailure}
                />
              </div>
            )}
          </div>
        </div>
        <div className='Menu bb'>
          <div className='title-main'>
            <p> TECHSPARDHA/2019</p>
          </div>
          <div className='subb'>
            <p>#include&lt;Spectrum_Of_Innovation&gt;</p>
          </div>
          <ul className='homeList'>{homeList}</ul>
        </div>
        <br />
        <div className='no-mobile'>
          <TimelineHome />
        </div>
        <div className='logo'>
          <img className='blueLogo' src='techLogoGlitchBlue.png' />
          <img className='redLogo' src='techLogoGlitchRed.png' />
          <img className='mainLogo' src='techLogo.png' />
        </div>
        <p className='devText'>Developed by Technobyte</p>
        <style></style>
      </div>
    </div>
  );
};

export default Home;
