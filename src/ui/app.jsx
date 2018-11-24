import React from 'react';
import PropTypes from 'prop-types';
import { LoadingScreen } from './loadingScreen';
import { Feed } from './feed';
import { getVideos } from '../videoRetriever';

export class App extends React.Component {
  state = {
    videos: getVideos(),
  };

  constructor(props, context) {
    super(props, context);

    this._reload = this._reload.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.subscriptionFeed !== nextProps.subscriptionFeed;
  }

  _reload() {
    this.setState({ videos: getVideos() });
  }

  render() {
    const {
      videos,
    } = this.state;

    return (
      <LoadingScreen promise={videos}>
        <Feed reload={this._reload} />
      </LoadingScreen>
    );
  }
}

