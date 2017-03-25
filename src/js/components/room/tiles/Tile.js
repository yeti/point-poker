import React from 'react';
// import _ from 'lodash';

const Tile = ({ value, onClick, isCurrent }) => (
  <div
    className={`Tiles__item ${isCurrent ? 'Tiles__item--active' : ''}`}
    onClick={onClick}
  >
    <span className={'Tiles__item__value'}>
      {value}
    </span>
  </div>
);

export default Tile;
