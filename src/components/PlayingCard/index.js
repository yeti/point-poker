import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';
import Logo from 'components/Logo';
// import Star from 'react-feather/dist/icons/star'; // include icon directly to save on import size

import './_PlayingCard.scss';

class PlayingCard extends Component {

  get filePath() {
    return `/images/cards/f-${this.props.value}.svg`;
  }
  /* eslint-disable max-len */
  get markup() {
    return (
      <div className="PlayingCard__Image">
        <svg height="336px" style={{ background: '#FFFFFF' }} width="240px" version="1.1" viewBox="0 0 240 336" >
          <defs/>
          <g id="Page-1" fill="none" stroke="none" strokeWidth="1">
            <g id="a-1">
              <g id="full-everythign" transform="translate(-16.000000, -16.000000)">
                <g id="Background" transform="translate(16.000000, 16.000000)">
                  <g id="border/purp">
                    <path id="border" d="M0,0 L240,0 L240,336 L0,336 L0,0 Z M12,12 L12,324 L228,324 L228,12 L12,12 Z" fill="#7E4296"/>
                    <g id="Group" strokeWidth="1" transform="translate(-16.000000, -16.000000)">
                      <g id="bottom-right" transform="translate(194.000000, 290.000000)">
                        <circle id="Oval-Copy" cx="39" cy="39" fill="#7E4296" r="39"/>
                        <path id="Oval-Copy-3" d="M39,69 C44.5977234,69 54.5977234,69 69,69 C69,54.4479716 69,44.4479716 69,39 C69,22.4314575 55.5685425,9 39,9 C22.4314575,9 9,22.4314575 9,39 C9,55.5685425 22.4314575,69 39,69 Z" fill="#FFFFFF"/>
                      </g>
                      <g id="top-left" transform="translate(39.000000, 39.000000) rotate(180.000000) translate(-39.000000, -39.000000) ">
                        <circle id="Oval-Copy" cx="39" cy="39" fill="#7E4296" r="39"/>
                        <path id="Oval-Copy-3" d="M39,69 C44.5977234,69 54.5977234,69 69,69 C69,54.4479716 69,44.4479716 69,39 C69,22.4314575 55.5685425,9 39,9 C22.4314575,9 9,22.4314575 9,39 C9,55.5685425 22.4314575,69 39,69 Z" fill="#FFFFFF"/>
                      </g>
                    </g>
                  </g>
                </g>
                <g id="number-1" fill="#000000" fontFamily="Mallory-Bold" fontSize="30" transform="translate(194.000000, 290.000000)">
                  <text id="?">
                    <tspan x="29.69" y="47">{this.props.value}</tspan>
                  </text>
                </g>
                <g id="number-1-copy" fill="#000000" fontFamily="Mallory-Bold" fontSize="30" transform="translate(41.500000, 41.500000) rotate(180.000000) translate(-41.500000, -41.500000) translate(17.000000, 28.000000)">
                  <text id="?">
                    <tspan x="17.69" y="24">{this.props.value}</tspan>
                  </text>
                </g>
              </g>
              <text id="1" fill="#000000" fontFamily="Mallory-Black, Mallory" fontSize="100">
                <tspan x="96.7" y="203">{this.props.value}</tspan>
              </text>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  render() {
    const {
      className,
      hidden,
      onClick,
    } = this.props;

    const classNames = classwrap(
      [
        'PlayingCard',
        {
          PlayingCard: {
            '--hidden': hidden,
            '--shown': !hidden,
          },
        },
        className,
      ],
    );

    return (
      <div className={classNames} onClick={onClick}>
        <div className="PlayingCard__Container">
          <div className="PlayingCard__Side PlayingCard__Side--front">
            {false
              ? this.markup
              : <img src={this.filePath} className="PlayingCard__Image"/>
            }
          </div>
          <div className="PlayingCard__Side PlayingCard__Side--back">
            <Logo className="PlayingCard__Logo" />
          </div>
        </div>
      </div>
    );
  }
}

PlayingCard.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

PlayingCard.defaultProps = {
  onClick: () => {},
};

export default PlayingCard;
