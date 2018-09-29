import React from 'react';
import PropTypes from 'prop-types';

export class LoadingScreen extends React.Component {
  state = {
    elapsedSeconds: 0,
    finished: false,
    data: null,
  };

  interval = null;

  componentDidMount() {
    const {
      promise,
    } = this.props;

    promise.then(data => this.setState({ finished: true, data }));

    this.interval = setInterval(() => {
      this.setState(LoadingScreen._incrementElapsedSeconds);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static _incrementElapsedSeconds(prevState) {
    return { elapsedSeconds: prevState.elapsedSeconds + 1 };
  }

  _getLoadingText() {
    const {
      elapsedSeconds,
    } = this.state;

    const maxDots = 3;
    const numberOfDots = elapsedSeconds % (maxDots + 1);
    const numberOfSpaces = maxDots - numberOfDots;
    const dots = '.'.repeat(numberOfDots);
    const spaces = ' '.repeat(numberOfSpaces);
    return `Loading${dots}${spaces} (${elapsedSeconds}s)`;
  }

  render() {
    const {
      children,
    } = this.props;

    const {
      finished,
      data,
    } = this.state;

    if (finished === true) {
      return React.cloneElement(children, { data });
    }

    const loadingText = this._getLoadingText();
    const width = loadingText.length;

    return (
      <box top="center"
           left="center"
           width={width}
           height="50">
        {loadingText}
      </box>
    );
  }
}

LoadingScreen.propTypes = {
  promise: PropTypes.object.isRequired,
}

