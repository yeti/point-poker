import React from 'react';
import PropTypes from 'prop-types';

import './_participant.scss';
import './_participants.scss';

const Participant = ({ name, value, isRevealed }) => {
  const displayValue = value || 'N/A';
  const displayStatus = value ? 'ready' : 'not ready';
  return (
    <div className={`Participant ${value ? 'Participant--ready' : 'Participant--not-ready'} ${isRevealed ? 'Participant--reveal' : ''}`}>
      <div className="Participant__name">
        <span>{name}</span>
      </div>
        <div className="Participant__value">
          { isRevealed
            ? displayValue
            : displayStatus
          }
        </div>
    </div>
  );
};

Participant.propTypes = {
  name: PropTypes.any,
  value: PropTypes.any,
  isRevealed: PropTypes.any,
};

const Participants = ({ votes, isRevealed, socket }) => {
  let self;
  const others = [];

  votes.forEach((vote) => {
    if (vote.id === socket.id) {
      self = vote;
    } else {
      others.push(vote);
    }
  });

  return (
    <div className="Participants">
      <Participant
        name={self.user}
        value={self.vote}
        socket={socket}
        isSelf={true}
        isRevealed={isRevealed}
      />
      {others.map(participant => (
        <Participant
          name={participant.user}
          value={participant.vote}
          isSelf={false}
          socket={socket}
          isRevealed={isRevealed}
        />
      ))}
    </div>
  );
};
export default Participants;

Participants.propTypes = {
  votes: PropTypes.any,
  isRevealed: PropTypes.any,
  socket: PropTypes.any,
};
