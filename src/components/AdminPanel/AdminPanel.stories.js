/* eslint-disable */

import React from 'react';

import { storiesOf } from '@storybook/react';

import AdminPanel from 'components/AdminPanel';


const stories = storiesOf('Admin Panel', module);

stories.add('Default', () => (
    <div style={{
      width: '90vmin',
      height: '50vmin',
      padding: '5rem'
    }}>
      <AdminPanel />
    </div>
  )
);
