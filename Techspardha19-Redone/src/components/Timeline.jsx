import React, { useEffect, useContext, useState } from 'react';
import Context from '../contextStore/Context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Elist from '../EventImg';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import dateFormat from 'dateformat';
const TimelineHome = () => {
  const { state, dispatch } = useContext(Context);
  const [istate, setState] = useState({
    timeline: []
  });
  useEffect(() => {
    const getTimeline = async () => {
      try {
        const res = await axios.get(
          'https://us-central1-techspardha-87928.cloudfunctions.net/api/events/timeline'
        );
        setState({
          ...istate,
          timeline: res.data.data.events
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
    getTimeline();
  }, []);
  function getImage(eventName) {
    var x;
    Elist.map((element, index) => {
      if (element.event == eventName) {
        x = element.img;
        return false;
      }
    });
    return x;
  }
  function time(timestamp) {
    var myDate = new Date(timestamp);
    var x = dateFormat(myDate, 'hh:MM TT');
    return x;
  }
  function date(timestamp) {
    var myDate = new Date(timestamp);
    var x = dateFormat(myDate, "dddd, dd mmm'yy");
    return x;
  }
  istate.timeline.sort((x, y) => {
    var a = new Date(x.startTime);
    var b = new Date(y.startTime);
    return a - b;
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });

  var now = new Date();
  var timenow = now.getTime();

  const timeline = istate.timeline ? (
    istate.timeline.map((event, index) => (
      <div className='' key={index}>
        {event.startTime >= timenow - 60 * 60 * 1000 ? (
          <Timeline>
            <TimelineEvent
              title={
                <p className='timeline-title'>
                  {time(event.startTime)} - {time(event.endTime)}
                  <br />
                  {date(event.startTime)}
                </p>
              }
              icon={
                <img
                  className='timeline-img'
                  src={getImage(event.eventCategory)}
                  alt='e-img'
                ></img>
              }
              contentStyle={{ background: 'transparent' }}
              bubbleStyle={{
                background: 'black',
                borderStyle: 'block',
                borderColor: 'black'
              }}
            >
              <p className='timeline-content'>{event.eventName}</p>
                <div className="timeline-dash"></div>
              </TimelineEvent>
          </Timeline>
        ) : (
          <p></p>
        )}

      </div>
    ))
  ) : (
    <h1>Loading</h1>
  );

  return <div className='timeline align-t'>{timeline}</div>;
};

export default TimelineHome;
