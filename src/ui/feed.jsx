import { exec } from 'child_process';
import React from 'react';
import PropTypes from 'prop-types';
import { getVideoPlayer, trySetMostRecent } from '../configHandler';
import { log } from '../log';

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
      this._playVideos(selectedVideos);

      var maxDate = selectedVideos
        .map(video => new Date(video.isoDate))
        .reduce((acc, current) => acc > current ? acc : current);
      trySetMostRecent(maxDate);
      this._resetAutoSelected();
    } else if (key === 'o') {
      const video = videos[current].video;
      this._playVideos([video]);
    }
  }

  _onSelectItem(item) {
    const index = item.index - 2;
    this.setState({ current: index });
  }

  _playVideos(videos) {
    const links = videos.map(video => video.link);
    getVideoPlayer()
      .then(player => {
        const command = `${player} ${links.join(' ')}`;
        exec(command);
      });
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

