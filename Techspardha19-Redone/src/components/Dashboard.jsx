import React, { useContext, useState, useEffect } from 'react';
import Loading from './Loading';
import Back from './Back';
import Context from '../contextStore/Context';
import axios from 'axios';
import dateFormat from 'dateformat';
const Dashboard = props => {
  document.body.scroll = 'yes';
  document.body.style.overflow = 'auto';
  const { state, dispatch } = useContext(Context);
  const [istate, setState] = useState([]);
  useEffect(() => {
    const getRegisteredEvents = async () => {
      try {
        const res = await axios.get(
          'https://us-central1-techspardha-87928.cloudfunctions.net/api/user/event',
          {
            headers: {
              authorization: state.token
            }
          }
        );
        setState([...res.data.data.events]);
      } catch (error) {}
    };

    getRegisteredEvents();
  }, []);
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

  istate.sort((x, y) => {
    var a = new Date(x.startTime);
    var b = new Date(y.startTime);
      console.log("sort");
    return a - b;
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;

  });
  console.log(istate);
  const eventList =
    istate.length > 0 ? (
      istate.map((event,index) => (
        <div className='reg-eve' key={index}>
          <div className="reg-eve-name">
            <p>{event.eventName}</p>
          </div>
          <div>
            <p>{time(event.startTime)},  {date(event.startTime)}</p>
          </div>
        </div>
      ))
    ) : (
      <p>no registered events.</p>
    );
console.log(istate);
  const { phone, name, college, year } = state.user;
  return (
    <div className="dashboard">
      <Loading title='dashboard' />
      <div className='c-container .overflow-dash'>
        <Back history={props} />
        <h1>/dashboard</h1>
        <div className='details'>
          <h3>name> {name}</h3>
          <p>
            <span className='bold'>college> </span>
            {college}
          </p>
          <p>
            <span className='bold'>phone> </span>
            {phone}
          </p>
          <p>
            <span className='bold'>year>  </span>
            {year}
          </p>
        </div>
        <div className='reg-events'>
          <h4>@registered_events:</h4>
          {eventList}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
