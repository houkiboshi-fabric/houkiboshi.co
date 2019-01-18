import React from 'react';
import AppProvider from './src/store/provider.js';
import wrapPageElementWithTransition from './src/helpers/wrapPageElement.js';

// React Context in Browser
// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};

// Page Transitions
export const wrapPageElement = wrapPageElementWithTransition;
