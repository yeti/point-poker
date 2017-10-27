import React from 'react';
import io from 'socket.io-client';

import RoomContainer from './component';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants';
import './_room.scss';

export default class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      votes: null,
      isAdmin: false,
      connected: false,
      disconnected: false,
      isRevealed: false,
    };

    this.socket = io('/');

    this.socket.on('connect', (client) => {
      this.setState({
        connected: true,
        disconnected: false,
        client,
      });
    });

    this.socket.on('disconnect', () => {
      this.setState({
        disconnected: true,
        connected: false,
      });
    });

    this.socket.on('update', (data) => {
      this.setState({
        votes: data,
      });
    });

    this.socket.on('You are admin', (isAdmin) => {
      this.setState({
        isAdmin,
      });
    });

    this.socket.on('boot', () => {
      this.socket.disconnect();
    });

    this.socket.on('reveal', (isRevealed) => {
      this.setState({
        isRevealed,
      });
    });

    this.socket.on('reset', () => {
      this.setState({
        isRevealed: false,
      });
    });

    this.socket.on('authenticate', (data, callback) => {
      callback({
        room: this.getRoomId(),
        user: this.getUsername(),
      });
    });

    this.saveUsername();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  saveUsername() {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, this.getUsername());
  }

  getRoomId() {
    return this.props.params.room;
  }

  getUsername() {
    return this.props.params.user;
  }

  handleReveal() {
    this.socket.emit('reveal', !this.state.isRevealed);
  }

  handleNext() {
    this.socket.emit('reset', true);
  }

  handleVote(vote) {
    this.socket.emit('vote', vote);
  }

  getSocket() {
    return this.socket;
  }

  render() {
    return (
      <RoomContainer
        socket={this.socket}
        getUsername={() => this.getUsername()}
        getRoomId={() => this.getRoomId()}
        handleReveal={() => this.handleReveal()}
        handleNext={() => this.handleNext()}
        handleVote={vote => this.handleVote(vote)}
        {...this.state}
        />
    );
  }
}
