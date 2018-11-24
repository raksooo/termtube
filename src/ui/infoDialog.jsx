import React from 'react';
import PropTypes from 'prop-types';
import youtubeInfo from 'youtube-info';
import dateDifference from 'date-difference';
import { LoadingScreen } from './loadingScreen';

export class InfoDialog extends React.Component {

  constructor(props, context) {
    super(props, context);

    this._fetchInfo = this._fetchInfo.bind(this);
  }

  _fetchInfo() {
    const id = this.props.video.id.split(':')[2];
    return youtubeInfo(id);
  }

  render() {
    return (
      <box top="center"
           left="center"
           width="50%"
           height="50%"
           border={{type: 'line'}}
           style={{border: {fg: 'yellow'}}}>
        <LoadingScreen loader={this._fetchInfo} showSeconds={false}>
          <_InfoDialog video={this.props.video} data={{}} />
        </LoadingScreen>
      </box>
    );
  }
}

InfoDialog.propTypes = {
  video: PropTypes.object.isRequired,
};

class _InfoDialog extends React.Component {

  constructor(props, context) {
    super(props, context);

    this._createInfoRow = this._createInfoRow.bind(this);
  }

  _createInfoRow([property, betterName, fn = o => o]) {
    const {
      video,
      data,
    } = this.props;

    const info = {
      ...video,
      ...data,
    };

    let label = betterName || property;
    label = label.charAt(0).toUpperCase() + label.slice(1);
    while (label.length < 9) {
      label = ' ' + label;
    }

    const content = fn(info[property]);
    return `${label}: ${content}`;
  }

  static _formatDuration(seconds) {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  static _formatDate(pubDate) {
    const date = new Date(pubDate);
    const diff = dateDifference(date, new Date(), { compact: true });
    const dateString = date
      .toISOString()
      .substr(0, 19)
      .replace('T', ' ');

    return `${diff} (${dateString})`;
  }

  componentDidUpdate() {
    const {
      video,
      data,
      reload,
    } = this.props;

    if (!video.id.includes(data.videoId)) {
      reload();
    }
  }

  render() {
    const props = [
      ['title'],
      ['owner', 'uploader'],
      ['pubDate', 'date', _InfoDialog._formatDate],
      ['duration', null, _InfoDialog._formatDuration],
      ['views'],
      ['likeCount', 'likes'],
      ['dislikeCount', 'dislikes'],
      ['url'],
    ];

    const items = props.map(this._createInfoRow);

    return (
      <list items={items} />
    );
  }
}

_InfoDialog.propTypes = {
  video: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

