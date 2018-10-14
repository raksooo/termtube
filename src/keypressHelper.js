import { playVideos } from './player';
import { trySetMostRecent } from './configHandler';
import { log } from './log';

const keyMappings = {
  ' ': selectVideo,
  'p': play,
  'o': playOnly,
  'r': reset,
  'a': toggleAllNone,
};

export const onKeyPress = ({ key, ...args }) => {
  const fn = keyMappings[key];
  if (fn != null) {
    return fn(args);
  }
};

function selectVideo({ checked, current }) {
  const checkedIndex = checked.indexOf(current);
  if (checkedIndex > -1) {
    checked.splice(checkedIndex, 1);
  } else {
    checked.push(current);
  }
  return { checked };
}

function play({ videos, checked, setSelected }) {
  const selectedVideos = checked
    .sort((a, b) => a - b)
    .reverse()
    .map(index => videos[index]);
  playVideos(selectedVideos);

  const maxDate = selectedVideos
    .map(video => new Date(video.isoDate))
    .reduce((acc, current) => acc > current ? acc : current);
  trySetMostRecent(maxDate)
    .then(setSelected);
}

function playOnly({ videos, current }) {
  const video = videos[current];
  playVideos([video]);
}

function reset({ setSelected }) {
  trySetMostRecent(new Date())
    .then(setSelected);
}

function toggleAllNone({ videos, checked }) {
  if (checked.length > 0) {
    return { checked: [] };
  } else {
    const checked = videos.map((_, index) => index);
    return { checked };
  }
}

