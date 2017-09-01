import React from 'react';
import _ from 'lodash';

const Votes = ({ votes, isRevealed }) => {
  return (
    <div className="Votes">
      {_.map(votes, voter => (
        <div className={`Votes__item ${_.get(voter, 'vote') ? 'Votes__item--ready' : 'Votes__item--not-ready'} ${isRevealed ? 'Votes__item--reveal' : ''}`}>
          <div className={'Votes__item__front'}>
            {_.get(voter, 'user')}
          </div>
          <div className={'Votes__item__back'}>
            {_.get(voter, 'vote') || '(No Vote)'}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Votes;
