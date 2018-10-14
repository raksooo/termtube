import React from 'react';
import PropTypes from 'prop-types';
import { LoadingScreen } from './loadingScreen';
import { Feed } from './feed';

export class Main extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.subscriptionFeed !== nextProps.subscriptionFeed;
  }

  render() {
    const {
      subscriptionFeed
    } = this.props;

    return (
      <box top="center"
           left="center"
           width="100%"
           height="100%"
           border={{type: 'line'}}
           style={{border: {fg: 'blue'}}}>
        <LoadingScreen promise={subscriptionFeed}>
          <Feed />
        </LoadingScreen>
      </box>
    );
  }
}

Main.propTypes = {
  subscriptionFeed: PropTypes.object.isRequired,
}

