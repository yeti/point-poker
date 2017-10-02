import React from 'react';

import './_votes.scss';

const Votes = ({ votes, isRevealed }) => {
  return (
    <div className="Votes">
      {votes.map(voter => (
        <div className={`Votes__item ${voter.vote ? 'Votes__item--ready' : 'Votes__item--not-ready'} ${isRevealed ? 'Votes__item--reveal' : ''}`}>
          <div className={'Votes__item__front'}>
            {voter.user}
          </div>
          <div className={'Votes__item__back'}>
            {voter.vote || '(No Vote)'}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Votes;
