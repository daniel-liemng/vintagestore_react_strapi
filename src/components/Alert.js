import React, { useContext } from 'react';
import { FaWindowClose } from 'react-icons/fa';

import { AlertContext } from '../context/alert';

const Alert = () => {
  const { alert, hideAlert } = useContext(AlertContext);

  let css = 'alert-container';
  if (alert.show) {
    css += ' alert-show';
    if (alert.type === 'danger') {
      css += ' alert-danger';
    }
  }
  return (
    <div className={css}>
      <div className='alert'>{alert.show && alert.msg}</div>
      <button onClick={hideAlert} type='button' className='alert-close'>
        <FaWindowClose />
      </button>
    </div>
  );
};

export default Alert;
