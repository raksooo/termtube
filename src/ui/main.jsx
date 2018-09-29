import React from 'react';
import PropTypes from 'prop-types';

export class Main extends React.Component {
  render() {
    return (
      <box top="center"
           left="center"
           width="100%"
           height="100%"
           border={{type: 'line'}}
           style={{border: {fg: 'blue'}}}>
        Termtube!
      </box>
    );
  }
}

