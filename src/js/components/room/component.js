import React from 'react';
import PropTypes from 'prop-types';
import JoinLink from '../joinLink';
import Participants from './participants';

const RoomContainer = (props) => {
  const {
    socket,
    getUsername,
    getRoomId,
    connected,
    votes,
    isRevealed,
    onClickReveal,
    onClickNext,
    isAdmin } = props;
  return (
    <div className="Room App__content__view">
      {connected &&
        <div className="Room__content">
          <div className="Room__session">
            {`Session ${getRoomId()}`}
            {false &&
              <JoinLink
                room={getRoomId()}
              />
            }
          </div>
          <div className="Room__participants">
            {votes &&
              <Participants
                socket={socket}
                user={getUsername()}
                room={getRoomId()}
                votes={votes}
                isRevealed={isRevealed}
              />
            }
            {isAdmin &&
              <div>
                <a
                  className="btn"
                  onClick={onClickReveal}
                >
                  Reveal
                </a>
                <a
                  className="btn"
                  onClick={onClickNext}
                >
                  Next
                </a>
              </div>
            }
          </div>
        </div>
      }
      {!connected &&
        <div>
          Disconnected
          <a href="">Reconnect</a>
        </div>
      }
    </div>
  );
};

RoomContainer.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  votes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
    vote: PropTypes.any,
  })),
  getRoomId: PropTypes.func.isRequired,
  getUsername: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  onClickReveal: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
};

export default RoomContainer;
