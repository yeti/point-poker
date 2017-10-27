/* eslint-disable */

import React from 'react';

import { storiesOf } from '@storybook/react';

import Table from 'components/Table';


const stories = storiesOf('Table', module);

stories.add('One', () => (
    <div style={{
      width: '90vmin',
      height: '50vmin',
      padding: '5rem'
    }}>
      <Table users={[
        { user: 'User 1', vote: '1' },
      ]}>
      </Table>
    </div>
  )
);


stories.add('Two', () => (
    <div style={{
      width: '90vmin',
      height: '50vmin',
      padding: '5rem'
    }}>
      <Table users={[
        { user: 'User 1', vote: '1' },
        { user: 'User 2', vote: '1' },
      ]}>
      </Table>
    </div>
  )
);


stories.add('Three', () => (
    <div style={{
      width: '90vmin',
      height: '50vmin',
      padding: '5rem'
    }}>
      <Table users={[
        { user: 'User 1', vote: '1' },
        { user: 'User 2', vote: '1' },
        { user: 'User 3', vote: '1' },
      ]}>
      </Table>
    </div>
  )
);

stories.add('Four', () => (
    <div style={{
      width: '90vmin',
      height: '50vmin',
      padding: '5rem'
    }}>
      <Table users={[
        { user: 'User 1', vote: '1' },
        { user: 'User 2', vote: '1' },
        { user: 'User 3', vote: '1' },
        { user: 'User 4', vote: '1' },
      ]}>
      </Table>
    </div>
  )
);

stories.add('Five', () => (
    <div style={{
      width: '90vmin',
      height: '50vmin',
      padding: '5rem'
    }}>
      <Table users={[
        { user: 'User 1', vote: '1' },
        { user: 'User 2', vote: '1' },
        { user: 'User 3', vote: '1' },
        { user: 'User 4', vote: '1' },
        { user: 'User 5', vote: '1' },
      ]}>
      </Table>
    </div>
  )
);

stories.add('Ten', () => (
    <div style={{
      width: '90vmin',
      height: '50vmin',
      padding: '5rem'
    }}>
      <Table users={[
        { user: 'User 1', vote: '1' },
        { user: 'User 2', vote: '1' },
        { user: 'User 3', vote: '1' },
        { user: 'User 4', vote: '1' },
        { user: 'User 5', vote: '1' },
        { user: 'User 6', vote: '1' },
        { user: 'User 7', vote: '1' },
        { user: 'User 8', vote: '1' },
        { user: 'User 9', vote: '1' },
        { user: 'User 10', vote: '1' },
      ]}>
      </Table>
    </div>
  )
);
