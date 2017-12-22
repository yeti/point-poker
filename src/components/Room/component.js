import React from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import AdminPanel from 'components/AdminPanel';
import BackButton from 'components/BackButton';
import Table from 'components/Table';
import View from 'components/View';
import Connecting from 'components/Connecting';
import Disconnected from 'components/Disconnected';
import Hand from 'components/Hand';

const RoomContainer = (props) => {
  const {
    handleVote,
    connected,
    disconnected,
    votes,
    isRevealed,
    handleNext,
    handleReaction,
    socket,
  } = props;

  const classNames = classwrap([
    'Room',
    {
      Room: {
        '--isRevealed': isRevealed,
      },
    },
  ]);

  const isLonely = votes && votes.length < 2;

  window.reaction = handleReaction;
  return (
    <View className={classNames}>
      {!connected &&
        (disconnected
          ? <Disconnected className="Room__MessageView"/>
          : <Connecting className="Room__MessageView"/>
        )

      }
      {connected &&
        <div className="Room__Content">
          <BackButton className="Room__BackButton" />
          {isLonely &&
            <div className="Room__MessageWrapper">
              <div className="Room__Message">
                Waiting for other players to join...
              </div>
            </div>
          }
          <div className="Room__Table">
            {votes &&
              <Table
                users={votes}
                isRevealed={isRevealed}
                userId={socket.id}
              />
            }
          </div>
          <div className="Room__Hand">
            <div className="Room__HandContainer">
              <Hand
                handleVote={handleVote}
                socket={socket}
              />
            </div>
          </div>
          <div className="Room__AdminPanelWrapper">
            <AdminPanel
              className="Room__AdminPanel"
              handleNext={handleNext}
              isRevealed={isRevealed}
            />
          </div>
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
  handleNext: PropTypes.func.isRequired,
  handleVote: PropTypes.func.isRequired,
};

export default RoomContainer;
