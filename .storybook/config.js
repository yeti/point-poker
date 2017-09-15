
import { configure } from '@storybook/react';

const resolver = require.context('../src', true, /\.stories\.js$/);

configure(() => {
  resolver.keys().forEach(filename => resolver(filename));
}, module);
