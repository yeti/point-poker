import React from 'react';
import PropTypes from 'prop-types';

import View from 'components/View';
import Table from 'components/Table';

import Ballot from './participants/ballot';

const RoomContainer = (props) => {
  const {
    socket,
    connected,
    votes,
    isRevealed,
    onClickReveal,
    onClickNext,
    isAdmin } = props;
  return (
    <View className="Room app__view">
      {connected &&
        <div className="Room__content">
          <div className="Room__Table">
            {votes &&
              <Table
                users={votes}
                isRevealed={isRevealed}
              />
            }
          </div>
            <div className="Ballot__container">
              <Ballot
                  socket={socket}
                />
            </div>
            {isAdmin &&
              <div className="Room__admin_panel">
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
      }
      {!connected &&
        <div>
          Disconnected
          <a href="">Reconnect</a>
        </div>
      }
    </View>
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
