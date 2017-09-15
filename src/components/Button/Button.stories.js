/* eslint-disable */

import React from 'react';

import { storiesOf } from '@storybook/react';

import Button from 'components/Button';


const stories = storiesOf('Button', module);


stories.add('Default', () => (
    <div style={{ width: '10rem', padding: '5rem' }}>
      <Button>
        Buttons Yo!
      </Button>
    </div>
  )
);

stories.add('Primary', () => (
    <div style={{ width: '10rem', padding: '5rem' }}>
      <Button>
        Clickity Click Clack
      </Button>
    </div>
  )
);
