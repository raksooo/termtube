import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import { Main } from './main';

const App = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(resolve, 1500);
  });

  return (
    <Main subscriptionFeed={promise} />
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

