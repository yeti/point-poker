import React from 'react';
import PropTypes from 'prop-types';
import classwrap from 'classwrap';

import './_MessageView.scss';

const MessageView = ({ className, icon, title, subtitle, subtitleHref }) => {
  return (
    <div className={classwrap(['MessageView', className])}>
      <div className="MessageView__Content">
        <div className="MessageView__Icon">
          {icon}
        </div>
        <div className="MessageView__Text">
          <div className="MessageView__Title">
            {title}
          </div>
          <div className="MessageView__Subtitle">
            <a className="MessageView__Link" href={subtitleHref}>
              {subtitle}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

MessageView.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleHref: PropTypes.string,
};

export default MessageView;
