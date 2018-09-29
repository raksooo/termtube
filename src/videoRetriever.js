import Parser from 'rss-parser';
import { getSubscriptions, getMostRecent } from './configHandler';
import { log } from './log.js';

const parser = new Parser();

export const getVideos = () => {
  return getSubscriptions()
    .then(parseAllSubscriptions)
    .then(rssContentToVideoList)
    .then(sortByDate)
    //.then(videos => videos.slice(0, 50))
    .then(setSelected);
};

const parseAllSubscriptions = subscriptions => {
  const promises = subscriptions.map(subscription => {
    return parser.parseURL(subscription)
      .catch(() => null);
  });

  return Promise.all(promises);
};

const rssContentToVideoList = content => {
  return content
    .filter(feed => feed != null)
    .map(feed => feed.items)
    .reduce((accumulator, current) => accumulator.concat(current), []);
};

const sortByDate = list => {
  return list.sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime());
};

const setSelected = list => {
  return getMostRecent()
    .then(mostRecent => list.map(video => ({ video, moreRecent: moreRecent(mostRecent, video) })));
};

const moreRecent = (mostRecent, video) => {
  return mostRecent == null || new Date(video.isoDate) > mostRecent
}

