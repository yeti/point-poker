import React from 'react';

const JoinLink = ({ room }) => (
  <div
    className={'JoinLink'}
  >
    <span className={'JoinLink__cta'}>
      {'Join Link: '}
    </span>
    <span className={'JoinLink__url'}>
      {`${window.location.host}/${room}`}
    </span>
  </div>
);

export default JoinLink;
