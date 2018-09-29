import React from 'react';
import PropTypes from 'prop-types';

export class Feed extends React.Component {
  render() {
    return (
      <box width="100%-2" height="100%-2">
        Feed
      </box>
    );
  }
}

Feed.propTypes = {
  data: PropTypes.object.isRequired,
}

