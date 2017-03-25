import React from 'react';
import _ from 'lodash';

const Messages = ({ messages }) => {
  return (
    <div>
      {_.map(_.keys(messages), key => (
        <div>
          {`${key}: ${messages[key]}`}
        </div>
      ))}
    </div>
  );
};
export default Messages;
