/* eslint-disable */

import React from 'react';

import { storiesOf } from '@storybook/react';

import Layout from 'components/Layout';


const stories = storiesOf('Layout', module);


stories.add('Default', () => (
  <div style={{
    width: '100%',
    height: '99vh',
  }}>
    <Layout>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '5rem',
      }}>
        <span>Content!</span>
      </div>
    </Layout>
  </div>
))
