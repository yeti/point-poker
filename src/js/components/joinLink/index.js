import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip'


/*const JoinLink = ({ room }) => (
  <div
    className={'JoinLink'}
  >
    <span className={'JoinLink__cta'}>
      {'Join Link: '}
    </span>
    <span className={'JoinLink__url'}>
      {`${window.location.host}/${room}`}
    </span>

  </div>
);

export default JoinLink;*/

export default class JoinLink extends React.Component {

  constructor(props) {
    super(props);
  }

  get host() {
    return window.location.host;
  }

  get roomId() {
    return this.props.room;
  }

  get joinLink() {
    return `join/${this.host}/${this.roomId}`;
  }

  render() {
    return (
      <div
        className={'JoinLink'}
      >
        <span className={'JoinLink__cta'}>
          {'Join Link: '}
        </span>
        <span className={'JoinLink__url'}>
          {this.joinLink}
        </span>
        <CopyToClipboard text={this.joinLink}
          onCopy={(text, isSuccess) => {ReactTooltip.show(this.refs.copy); }}>
          <button ref='copy' data-tip='Copied to clipboard!' data-for="tooltip">Copy</button>
        </CopyToClipboard>
        <ReactTooltip
          place="right"
          effect="solid"
          id="tooltip"
          event="none"
          afterShow={() => {
            setTimeout(() => {
              ReactTooltip.hide(this.refs.copy);
            }, 1000)}
          }
          />
      </div>
    );
  }
}
