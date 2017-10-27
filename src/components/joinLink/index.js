import React from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import Share2 from 'react-feather/dist/icons/share-2'; // include icon directly to save on import size
import classwrap from 'classwrap';

import './_JoinLink.scss';

export default class JoinLink extends React.Component {

  static get propTypes() {
    return {
      alternateAnimation: PropTypes.bool,
      code: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      alternateAnimation: false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
    };
  }

  get host() {
    return window.location.host;
  }

  get joinLink() {
    return `${this.host}/join/${this.props.code}`;
  }

  get messageDuration() {
    return 2000;
  }

  get message() {
    return 'Copied to\nClipboard!';
  }

  showMessage() {
    // If message is already showing, do nothing
    if (!this.state.showMessage) {
      // Show message
      this.toggleMessage(true, () => {
        // Then hide it
        setTimeout(() => {
          this.toggleMessage(false);
        }, this.messageDuration);
      });
    }
  }

  toggleMessage(showMessage = !this.state.showMessage, cb = () => {}) {
    this.setState({
      showMessage,
    }, cb);
  }

  render() {
    const {
      code,
    } = this.props;

    const {
      showMessage,
    } = this.state;

    const classnames = classwrap([
      'JoinLink',
      {
        JoinLink: {
          '--animation1': !this.props.alternateAnimation,
          '--animation2': this.props.alternateAnimation,
          '--showMessage': showMessage,
          '--hideMessage': !showMessage,
        },
      },
    ]);

    return (
      <CopyToClipboard
        className={classnames}
        text={this.joinLink}
        onCopy={() => this.showMessage()}
      >
        <div>
          <div className="JoinLink__Container">
            <div className="JoinLink__Icon">
              <Share2 size={15}/>
            </div>
            <span className={'JoinLink__Code'}>
              {code}
            </span>
          </div>
          <div className="JoinLink__Message">
            {this.message}
          </div>
        </div>
      </CopyToClipboard>
    );
  }
}
