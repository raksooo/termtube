import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import { Main } from './main';

const App = () => {
  return (
    <Main />
  );
}
 
export const run = () => {
  const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Termtube',
  });
   
  screen.key(['escape', 'q', 'C-c'], () => {
    return process.exit(0);
  });
 
  render(<App />, screen);
}

