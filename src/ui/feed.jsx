import React from 'react';
import PropTypes from 'prop-types';
import dateDifference from 'date-difference';
import { InfoDialog } from './infoDialog';
import { getMostRecent } from '../configHandler';
import { onKeyPress } from '../keypressHelper';

export class Feed extends React.Component {

  state = {
    checked: [],
    current: 0,
    showInfo: false,
  }

  constructor(props, context) {
    super(props, context);

    this._createRow = this._createRow.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
    this._onSelectItem = this._onSelectItem.bind(this);
    this._setSelected = this._setSelected.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data
      || this.state.checked !== nextState.checked
      || this.state.checked.every((item, index) => nextState.checked[index] === item)
      || this.state.current !== nextState.current;
  }

  componentDidMount() {
    this._setSelected();
  }

  _createRow(video, index) {
    const {
      checked,
    } = this.state;

    const {
      author,
      title,
      pubDate,
    } = video;

    const check = checked.includes(index) ? '✔' : ' ';
    const date = dateDifference(new Date(pubDate), new Date(), { compact: true });
    const datePadding = date.length < 4 ? ' ' : '';

    return ` ${check} ${datePadding}${date} - ${author} - ${title}`;
  }

  _setSelected() {
    const {
      data: videos,
    } = this.props;

    getMostRecent()
      .then(mostRecent => {
        const selected = [];
        videos.forEach((video, index) => {
          if (new Date(video.isoDate) > mostRecent) {
            selected.push(index);
          }
        });
        this.setState({ checked: selected });
      });
  }

  _onSelectItem(item) {
    const index = item.index - 3;
    this.setState({ current: index });
  }

  _onKeyPress(key) {
    const {
      data: videos,
      reload,
    } = this.props;

    const args = {
      videos,
      key,
      setSelected: this._setSelected,
      reload,
      ...this.state,
    };

    const newState = onKeyPress(args);
    newState != null && this.setState(newState);
  }

  render() {
    const {
      data: videos,
    } = this.props;

    const {
      checked,
      current,
      showInfo,
    } = this.state;

    const rows = videos
      .map(this._createRow);

    return (
      <element>
        { showInfo === true && (<InfoDialog video={videos[current]}  />) }
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
      </element>
    );
  }
}

Feed.propTypes = {
  data: PropTypes.array.isRequired,
};

