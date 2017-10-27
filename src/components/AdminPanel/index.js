import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';
import ArrowRight from 'react-feather/dist/icons/arrow-right'; // include icon directly to save on import size


import Button from 'components/Button';
import './_AdminPanel.scss';

class AdminPanel extends Component {

  render() {
    const {
      className,
      handleNext,
      isRevealed,
    } = this.props;

    const classNames = classwrap(
      [
        'AdminPanel',
        className,
      ],
    );

    return (
      <div className={classNames}>
        <div className="AdminPanel__Buttons">
          <Button
            buttonType={isRevealed ? 'primary' : 'default'}
            className="AdminPanel__Button AdminPanel__Button--next"
            onClick={handleNext}
          >
            <span>Next <ArrowRight size={12}/></span>
          </Button>
        </div>
      </div>
    );
  }
}

AdminPanel.propTypes = {
  className: PropTypes.string,
  handleNext: PropTypes.func,
  isRevealed: PropTypes.bool,
};

AdminPanel.defaultProps = {
  handleNext: () => {},
};

export default AdminPanel;
