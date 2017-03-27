import React from 'react';
import _ from 'lodash';

const Votes = ({ votes, isRevealed }) => {
  return (
    <div className="Votes">
      {_.map(votes, voter => (
        <div className={`Votes__voter ${_.get(voter, 'vote') ? 'Votes__voter--ready' : 'Votes__voter--not-ready'}`}>
          <div className={'Votes__voter__content'}>
            <div className={'Votes__voter__content__name'}>
              {_.get(voter, 'user')}
            </div>
            {isRevealed &&
              <div className={'Votes__voter__content__vote'}>
                {_.get(voter, 'vote') || '(No Vote)'}
              </div>
            }
          </div>
        </div>
      ))}
    </div>
  );
};
export default Votes;
