import React from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import MessageView from 'components/MessageView';
import WifiOff from 'react-feather/dist/icons/wifi-off'; // include icon directly to save on import size
import RefreshCw from 'react-feather/dist/icons/refresh-cw'; // include icon directly to save on import size
import './_Disconnected.scss';

const Disconnected = ({ className }) => {
  return (
    <MessageView
      className={classwrap(['Disconnected', className])}
      icon={<WifiOff size={100} color="white"/>}
      title="You are disconnected"
      subtitle={<span><RefreshCw size={10} /> Reconnect</span>}
      subtitleHref="" // To refresh page
    />
  );
};

Disconnected.propTypes = {
  className: PropTypes.string,
};

export default Disconnected;
