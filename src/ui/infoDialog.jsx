import React from 'react';
import PropTypes from 'prop-types';
import youtubeInfo from 'youtube-info';

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
      .then(info => this.setState({ info }));
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

  render() {
    const rows = [
      ['title'],
      ['owner', 'uploader'],
      ['datePublished', 'date'],
      ['duration', null, this._formatDuration],
      ['views'],
      ['likeCount', 'likes'],
      ['dislikeCount', 'dislikes'],
      ['url'],
    ];

    return (
      <box top="center"
           left="center"
           width="700"
           height="450"
           border={{type: 'line'}}
           style={{border: {fg: 'blue'}}}>
        <list items={rows.map(this._createInfoRow.bind(this))} />
      </box>
    );
  }
}

InfoDialog.propTypes = {
  video: PropTypes.object.isRequired,
};

