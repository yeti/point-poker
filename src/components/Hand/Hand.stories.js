/* eslint-disable */

import React from 'react';

import { storiesOf } from '@storybook/react';

import Hand from 'components/Hand';


const stories = storiesOf('Hand', module);

stories.add('Default', () => (
    <div style={{
      width: '90vmin',
      height: '50vmin',
      padding: '5rem'
    }}>
      <Hand />
    </div>
  )
);
