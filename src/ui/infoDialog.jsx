import React from 'react';
import PropTypes from 'prop-types';
import youtubeInfo from 'youtube-info';

export class InfoDialog extends React.Component {

  state = {
    info: {},
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

    const capitalized = property.charAt(0).toUpperCase() + property.slice(1);
    const data = fn(info[property]);
    return `${capitalized}: ${data}`;
  }

  render() {
    const {
      video,
    } = this.props;

    const {
      info,
    } = this.state;

    const rows = [
      ['title'],
      ['owner', 'uploader'],
      ['datePublished', 'date'],
      ['duration'],
      ['views'],
      ['likeCount', 'likes'],
      ['dislikeCount', 'dislikes'],
    ];

    return (
      <box top="center"
           left="center"
           width="700"
           height="800"
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

