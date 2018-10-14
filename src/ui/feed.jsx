import React from 'react';
import PropTypes from 'prop-types';
import { trySetMostRecent } from '../configHandler';
import { playVideos } from '../player';

export class Feed extends React.Component {

  state = {
    checked: [],
    current: 0,
  }

  constructor(props, context) {
    super(props, context);

    this._createRow = this._createRow.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
    this._onSelectItem = this._onSelectItem.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data
      || this.state.checked !== nextState.checked
      || this.state.current !== nextState.current;
  }

  componentDidMount() {
    this._setAutoSelected();
  }

  _setAutoSelected() {
    const {
      data: videos,
    } = this.props;

    const autoSelected = videos
      .map(({ video, moreRecent }, index) => ({ video, index, moreRecent }))
      .filter(({ moreRecent }) => moreRecent)
      .map(o => o.index);

    this.setState({ checked: autoSelected });
  }

  _resetAutoSelected() {
    this.setState({ checked: [] });
  }

  _createRow({ video: { author, title }}, index) {
    const {
      checked,
    } = this.state;

    return ` ${checked.includes(index) ? '✔' : ' '} ${author} - ${title}`;
  }

  _onKeyPress(key) {
    const {
      data: videos,
    } = this.props;

    const {
      current,
      checked,
    } = this.state;

    if (key === ' ') {
      const checkedIndex = checked.indexOf(current);
      if (checkedIndex > -1) {
        checked.splice(checkedIndex, 1);
        this.setState({ checked });
      } else {
        checked.push(current);
        this.setState({ checked });
      }
    } else if (key === 'p') {
      const selectedVideos = checked.map(index => videos[index].video);
      playVideos(selectedVideos);

      var maxDate = selectedVideos
        .map(video => new Date(video.isoDate))
        .reduce((acc, current) => acc > current ? acc : current);
      trySetMostRecent(maxDate);
      this._resetAutoSelected();
    } else if (key === 'o') {
      const video = videos[current].video;
      playVideos([video]);
    }
  }

  _onSelectItem(item) {
    const index = item.index - 2;
    this.setState({ current: index });
  }

  render() {
    const {
      data: videos,
    } = this.props;

    const rows = videos
      .map(this._createRow);

    return (
      <list
        items={rows}
        onKeypress={this._onKeyPress}
        onSelectItem={this._onSelectItem}
        style={{ selected: { fg: 'green' }}}
        data={"foo"}
        keys
        vi
        focused
      />
    );
  }
}

Feed.propTypes = {
  data: PropTypes.array.isRequired,
}

