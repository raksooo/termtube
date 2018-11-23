import React from 'react';
import PropTypes from 'prop-types';
import youtubeInfo from 'youtube-info';
import dateDifference from 'date-difference';

export class InfoDialog extends React.Component {

  state = {
    info: {},
  }

  static getDerivedStateFromProps(props, state) {
    if (state.info.videoId !== props.video.id.split(':')[2]) {
      return { info: {} };
    }

    return null;
  }

  componentDidMount() {
    this._fetchInfo();
  }

  componentDidUpdate() {
    this._fetchInfo();
  }

  _fetchInfo() {
    const {
      video,
    } = this.props;

    const {
      info,
    } = this.state;

    const id = video.id.split(':')[2];

    if (info.videoId === id) {
      return;
    }

    return youtubeInfo(id)
      .then(info => this.setState({ info: { ...info, ...video } }));
  }

  _createInfoRow([property, betterName, fn = o => o]) {
    const {
      info,
    } = this.state;

    let label = betterName || property;
    label = label.charAt(0).toUpperCase() + label.slice(1);

    while (label.length < 9) {
      label = ' ' + label;
    }

    const data = info[property] == null ? 'Loading...' : fn(info[property]);
    return `${label}: ${data}`;
  }

  _formatDuration(seconds) {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  _formatDate(pubDate) {
    const date = new Date(pubDate);
    const diff = dateDifference(date, new Date(), { compact: true });
    const dateString = date
      .toISOString()
      .substr(0, 19)
      .replace('T', ' ');

    return `${diff} (${dateString})`;
  }

  render() {
    const rows = [
      ['title'],
      ['owner', 'uploader'],
      ['pubDate', 'date', this._formatDate],
      ['duration', null, this._formatDuration],
      ['views'],
      ['likeCount', 'likes'],
      ['dislikeCount', 'dislikes'],
      ['url'],
    ];

    return (
      <box top="center"
           left="center"
           width="50%"
           height="50%"
           border={{type: 'line'}}
           style={{border: {fg: 'yellow'}}}>
        <list items={rows.map(this._createInfoRow.bind(this))} />
      </box>
    );
  }
}

InfoDialog.propTypes = {
  video: PropTypes.object.isRequired,
};

