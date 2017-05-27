import React from 'react';

export default class FloatingButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }
  }

  toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className={`FloatingButton ${this.state.isOpen ? 'FloatingButton--isOpen' : 'FloatingButton--isClosed'}`}>

        <div className="FloatingButton__parent" onClick={() => {this.toggleOpen()}}>
          <span className="FloatingButton__parent__content">
            {'+'}
          </span>
        </div>

        <div className="FloatingButton__children">
          <div className="FloatingButton__child">
          </div>
        </div>
      </div>
    );
  }
}
