import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import { Main } from './main';
import { getVideos } from '../videoRetriever';

class App extends React.Component {
  state = {
    videos: getVideos(),
  };

  constructor(props, context) {
    super(props, context);

    this.reload = this.reload.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.videos !== nextState.videos;
  }

  reload() {
    this.setState({ videos: getVideos() });
  }

  render() {
    const {
      videos,
    } = this.state;

    return (
      <Main subscriptionFeed={videos} reload={this.reload} />
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

