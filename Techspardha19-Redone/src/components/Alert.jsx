import React, { useContext } from 'react';
import Context from '../contextStore/Context';
const Alert = () => {
  const { state } = useContext(Context);
  const alerts =
    state.errors.length > 0
      ? state.errors.map((error, index) => (
          <p className='alerts' key={index}>
            {error.msg}.
          </p>
        ))
      : null;
  return (
    <>
      <div>{alerts}</div>
    </>
  );
};

export default Alert;
