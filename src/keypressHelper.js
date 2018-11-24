import { playVideos } from './player';
import { trySetMostRecent } from './configHandler';
import { log } from './log';

const keyMappings = {
  ' ': selectVideo,
  'p': play,
  'o': playOnly,
  'n': setToNow,
  'r': reload,
  'a': toggleAllNone,
  'i': toggleInfo,
  'f': toggleSearch,
};

export const onKeyPress = ({ key, ...args }) => {
  const fn = keyMappings[key];
  if (fn != null) {
    return fn(args);
  } else if (key.charCodeAt(0) === 27) {
    return esc(args);
  }
};

export const esc = ({ resetSearch }) => {
  resetSearch();
  return {
    showInfo: false,
    showSearch: false,
  }
}

function selectVideo({ checked, current }) {
  let newChecked;
  if (checked.indexOf(current) > -1) {
    newChecked = checked.filter(i => i !== current);
  } else {
    newChecked = [ ...checked, current ];
  }
  return { checked: newChecked };
}

function play({ data, checked, setSelected }) {
  const selectedVideos = checked
    .sort((a, b) => a - b)
    .reverse()
    .map(index => data[index]);
  playVideos(selectedVideos);

  const maxDate = selectedVideos
    .map(video => new Date(video.isoDate))
    .reduce((acc, current) => acc > current ? acc : current);
  trySetMostRecent(maxDate)
    .then(setSelected);
}

function playOnly({ data, current }) {
  const video = data[current];
  playVideos([video]);
}

function setToNow({ setSelected }) {
  trySetMostRecent(new Date())
    .then(setSelected);
}

function reload({ reload }) {
  reload();
}

function toggleAllNone({ videos, checked }) {
  const checkedVisible = videos
    .filter(({ i }) => checked.includes(i))
    .length;
  if (checkedVisible) {
    return { checked: [] };
  } else {
    const newChecked = videos.map(({ i }) => i).concat(checked);
    return { checked: newChecked };
  }
}

function toggleInfo({ showInfo }) {
  return { showInfo: !showInfo };
}

function toggleSearch({ showSearch }) {
  return { showSearch: !showSearch };
}

