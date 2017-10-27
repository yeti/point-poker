/* eslint-disable */

import React from 'react';

import { storiesOf } from '@storybook/react';

import PlayingCard from 'components/PlayingCard';


const stories = storiesOf('PlayingCard', module);


stories.add('Default', () => (
    <div style={{
      width: '100%',
      height: '100%',
      padding: '5rem'
    }}>
      <PlayingCard value="1" />
    </div>
  )
);
