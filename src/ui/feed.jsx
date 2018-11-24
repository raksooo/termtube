import React from 'react';
import PropTypes from 'prop-types';
import { InfoDialog } from './infoDialog';
import { SearchDialog } from './searchDialog';
import { getMostRecent } from '../configHandler';
import { onKeyPress } from '../keypressHelper';

export class Feed extends React.PureComponent {

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
    this._resetVideos = this._resetVideos.bind(this);
  }

  componentDidMount() {
    this._resetVideos();
    this._setSelected();
  }

  _getAllVideos() {
    return this.props.data.map((video, i) => ({ i, video }));
  }

  _resetVideos() {
    this.setState({ videos: this._getAllVideos() });
  }

  _setSelected() {
    getMostRecent()
      .then(mostRecent => {
        this.setState(state => {
          const checked = state.videos
            .filter(({ video }) => new Date(video.isoDate) > mostRecent)
            .map(({ i }) => i);
          return { checked };
        });
      });
  }

  _onSelectItem(item) {
    const index = item.index - 2;
    const current = this.state.videos[index].i;
    this.setState({ current });
  }

  _onKeyPress(key) {
    const args = {
      key,
      setSelected: this._setSelected,
      resetSearch: this._resetVideos,
      ...this.props,
      ...this.state,
    };

    const newState = onKeyPress(args);
    newState != null && this.setState(newState);
  }

  _onSearch(query) {
    const videos = this._getAllVideos()
      .filter(({ video }) => this._searchMatch(query, video));

    this.setState({ videos, showSearch: false, });
  }

  _searchMatch(query, video) {
    return JSON.stringify(video)
      .toLowerCase()
      .includes(query.toLowerCase());
  }

  _onSearchCancel() {
    // Order of these calls is important to prevent infinite recursion.
    this.setState({ showSearch: false });
    this._resetVideos();
  }

  _createRow({ video, i }) {
    const {
      author,
      title,
    } = video;

    const check = this.state.checked.includes(i) ? '✔' : ' ';
    return ` ${check} ${author} - ${title}`;
  }

  render() {
    const {
      data,
    } = this.props;

    const {
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

        <list items={rows}
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

