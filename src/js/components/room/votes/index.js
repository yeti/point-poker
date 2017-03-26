import React from 'react';
import _ from 'lodash';

const Votes = ({ votes }) => {
  return (
    <div>
      {_.map(_.keys(votes), key => (
        <div>
          {`${key && key !== '' ? key : 'anonymous'}: ${votes[key]}`}
        </div>
      ))}
    </div>
  );
};
export default Votes;
