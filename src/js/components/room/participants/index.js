import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Participant = ({ name, value, isRevealed }) => {
  return (
    <div className={`Participant ${value ? 'Participant--ready' : 'Participant--not-ready'} ${isRevealed ? 'Participant--reveal' : ''}`}>
      <div className="Participant__name">
        <span>{name}</span>
      </div>
        <div className="Participant__value">
          { isRevealed
            ? value
              ? value
              : 'N/A'
            : value
              ? 'ready'
              : 'not ready'
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
  const self = _.find(votes, vote => vote.id === socket.id);
  const others = _.filter(votes, vote => vote.id !== socket.id);

  return (
    <div className="Participants">
      <Participant
        name={self.user}
        value={self.vote}
        socket={socket}
        isSelf={true}
        isRevealed={isRevealed}
      />
      {_.map(others, participant => (
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
