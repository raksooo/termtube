import React from 'react';
import PropTypes from 'prop-types';
import { log } from '../log';

const initialState = {
  elapsedSeconds: 0,
  finished: false,
  data: null,
};

export class LoadingScreen extends React.Component {
  state = initialState;

  interval = null;

  componentDidMount() {
    this._startLoading();
  }

  _startLoading() {
    this.props.loader()
      .then(this._finishedLoading.bind(this))
      .catch(error => log('LoadingScreen catch: ' + JSON.stringify(error)));

    this.interval = setInterval(() => {
      this.setState(LoadingScreen._incrementElapsedSeconds);
    }, 1000);
  }

  _finishedLoading(data) {
    this.setState({ finished: true, data })
    clearInterval(this.interval);
  }

  _reload() {
    this.setState(initialState);

    this._startLoading();
  }

  static _incrementElapsedSeconds(prevState) {
    return { elapsedSeconds: prevState.elapsedSeconds + 1 };
  }

  _getLoadingText() {
    const {
      showSeconds = true,
    } = this.props;

    const {
      elapsedSeconds,
    } = this.state;

    const maxDots = 3;
    const numberOfDots = elapsedSeconds % (maxDots + 1);
    const numberOfSpaces = maxDots - numberOfDots;
    const dots = '.'.repeat(numberOfDots);
    const spaces = ' '.repeat(numberOfSpaces);
    const seconds = showSeconds ? ` (${elapsedSeconds}s)` : '';
    return `Loading${dots}${spaces}${seconds}`;
  }

  _showChildren() {
    const {
      children,
    } = this.props;

    const {
      data,
    } = this.state;

    const childrenProps = {
      data,
      reload: this._reload.bind(this),
    };

    return React.cloneElement(children, childrenProps);
  }

  render() {
    if (this.state.finished === true) {
      return this._showChildren();
    }

    const loadingText = this._getLoadingText();
    const width = loadingText.length;

    return (
      <box top="50%-2"
           left="center"
           width={width}
           height={1}>
        {loadingText}
      </box>
    );
  }
}

LoadingScreen.propTypes = {
  loader: PropTypes.func.isRequired,
}

