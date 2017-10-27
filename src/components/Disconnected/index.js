import React from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import MessageView from 'components/MessageView';
import WifiOff from 'react-feather/dist/icons/wifi-off'; // include icon directly to save on import size
import './_Disconnected.scss';

const Disconnected = ({ className }) => {
  return (
    <MessageView
      className={classwrap(['Disconnected', className])}
      icon={<WifiOff size={100}/>}
      title="You are disconnected"
      subtitle="Reconnect"
      subtitleHref="" // To refresh page
    />
  );
};

Disconnected.propTypes = {
  className: PropTypes.string,
};

export default Disconnected;
