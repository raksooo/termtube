import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import { Main } from './main';
import { getVideos } from '../videoRetriever';

class App extends React.Component {
  state = {
    videos: getVideos(),
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.videos !== nextState.videos;
  }

  render() {
    const {
      videos,
    } = this.state;

    return (
      <Main subscriptionFeed={videos} />
    );
  }
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

