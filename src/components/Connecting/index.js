import React from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import MessageView from 'components/MessageView';
import Wifi from 'react-feather/dist/icons/wifi'; // include icon directly to save on import size
import './_Connecting.scss';

const Connecting = ({ className }) => {
  return (
    <MessageView
      className={classwrap(['Connecting', className])}
      icon={<Wifi size={100}/>}
      title="Connecting"
    />
  );
};

Connecting.propTypes = {
  className: PropTypes.string,
};

export default Connecting;
