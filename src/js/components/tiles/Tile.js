import React from 'react';
// import _ from 'lodash';

const Tile = ({ value, onClick, isCurrent }) => (
  <div
    className={`Tiles__item ${isCurrent ? 'Tiles__item--active' : ''}`}
    onClick={onClick}
  >
    {value}
  </div>
);

export default Tile;
