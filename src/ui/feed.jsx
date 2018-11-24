import React from 'react';
import PropTypes from 'prop-types';
import { InfoDialog } from './infoDialog';
import { SearchDialog } from './searchDialog';
import { getMostRecent } from '../configHandler';
import { onKeyPress } from '../keypressHelper';

export class Feed extends React.Component {

  state = {
    videos: [],
    checked: [],
    current: 0,
    showInfo: false,
    showSearch: false,
  }

  constructor(props, context) {
    super(props, context);

    this._createRow = this._createRow.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
    this._onSelectItem = this._onSelectItem.bind(this);
    this._setSelected = this._setSelected.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onSearchCancel = this._onSearchCancel.bind(this);
    this._fillVideoList = this._fillVideoList.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data
      || this.state.checked !== nextState.checked
      || this.state.checked.every((item, index) => nextState.checked[index] === item)
      || this.state.current !== nextState.current
      || this.state.showInfo !== nextState.showInfo
      || this.state.showSearch !== nextState.showSearch;
  }

  componentDidMount() {
    const videos = this._fillVideoList();
    this._setSelected(videos);
  }

  _getFullVideoList() {
    return this.props.data.map((video, i) => ({ i, video }));
  }

  _fillVideoList() {
    const videos = this._getFullVideoList();
    this.setState({ videos });
    return videos;
  }

  _createRow({ video, i }) {
    const {
      checked,
    } = this.state;

    const {
      author,
      title,
    } = video;

    const check = checked.includes(i) ? '✔' : ' ';
    return ` ${check} ${author} - ${title}`;
  }

  _setSelected(videos) {
    videos = videos || this.state.videos

    getMostRecent()
      .then(mostRecent => {
        const selected = [];
        videos.forEach(({ i, video }) => {
          if (new Date(video.isoDate) > mostRecent) {
            selected.push(i);
          }
        });
        this.setState({ checked: selected });
      });
  }

  _onSelectItem(item) {
    const index = item.index - 2;
    const videoIndex = this.state.videos[index].i;
    this.setState({ current: videoIndex });
  }

  _onKeyPress(key) {
    const {
      data,
      reload,
    } = this.props;

    const {
      videos,
    } = this.state;

    const args = {
      data,
      videos,
      key,
      setSelected: this._setSelected,
      resetSearch: this._fillVideoList,
      reload,
      ...this.state,
    };

    const newState = onKeyPress(args);
    newState != null && this.setState(newState);
  }

  _onSearch(query) {
    const result = this._getFullVideoList()
      .filter(({ video }) => {
        return JSON.stringify(video)
          .toLowerCase()
          .includes(query.toLowerCase());
      });

    this.setState({
      videos: result,
      showSearch: false,
    });
  }

  _onSearchCancel() {
    // Order of these calls is important to prevent infinite recursion.
    this.setState({ showSearch: false });
    this._fillVideoList();
  }

  render() {
    const {
      data,
    } = this.props;

    const {
      checked,
      current,
      showInfo,
      showSearch,
      videos,
    } = this.state;

    const rows = videos
      .map(this._createRow);

    return (
      <element>
        { showInfo === true && (<InfoDialog video={data[current]}  />) }
        <list
          items={rows}
          onKeypress={this._onKeyPress}
          onSelectItem={this._onSelectItem}
          style={{ selected: { fg: 'green' }}}
          keys
          vi
          focused={!showSearch} />
        <SearchDialog open={showSearch}
                      onSearch={this._onSearch}
                      onCancel={this._onSearchCancel} />
      </element>
    );
  }
}

Feed.propTypes = {
  data: PropTypes.array.isRequired,
};

