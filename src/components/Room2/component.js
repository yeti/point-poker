import React from 'react';
import PropTypes from 'prop-types';

import AdminPanel from 'components/AdminPanel';
import BackButton from 'components/BackButton';
import Table from 'components/Table';
import View from 'components/View';
import Connecting from 'components/Connecting';
import Disconnected from 'components/Disconnected';

import Ballot from './participants/ballot';

const RoomContainer = (props) => {
  const {
    socket,
    connected,
    disconnected,
    votes,
    isRevealed,
    onClickReveal,
    onClickNext,
  } = props;
  return (
    <View className="Room">
      {!connected &&
        (disconnected
          ? <Disconnected className="Room__MessageView"/>
          : <Connecting className="Room__MessageView"/>
        )

      }
      {connected &&
        <div className="Room__Content">
          <BackButton className="Room__BackButton" />
          <div className="Room__Table">
            {votes &&
              <Table
                users={votes}
                isRevealed={isRevealed}
              />
            }
          </div>
            <div className="Room__Hand">
              <Ballot
                  socket={socket}
                />
            </div>
            <AdminPanel
              className="Room__AdminPanel"
              handleReveal={onClickReveal}
              handleNext={onClickNext}
              isRevealed={isRevealed}
            />
          </div>
      }
    </View>
  );
};

RoomContainer.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  disconnected: PropTypes.bool.isRequired,
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
