import os from 'os';
import path from 'path';
import { readFile, writeFile } from 'fs';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const parseXml = promisify(parseString);

const CONFIG_NAME = 'termtube';
const CONFIG_PATH = path.join(os.homedir(), '.config', CONFIG_NAME);

const CONFIG_KEY_PLAYER = "player";
const CONFIG_KEY_SUBSCRIPTIONS = "subscriptions";

export const getSubscriptions = () => {
  return readConfig()
    .then(config => config[CONFIG_KEY_SUBSCRIPTIONS]);
};

export const registerSubscriptions = filePath => {
  return readFileAsync(filePath)
    .then(parseSubscriptions)
    .then(saveSubscriptions);
};

const parseSubscriptions = xml => {
  return parseXml(xml)
    .then(o => {
      return o.opml.body[0].outline[0].outline;
    })
    .then(list => list.map(item => item.$.xmlUrl));
};

const saveSubscriptions = subscriptions => {
  return editConfig({ subscriptions });
};

export const subscriptionsExist = () => {
  return readConfig()
    .then(config => config[CONFIG_KEY_SUBSCRIPTIONS] != null
      && config[CONFIG_KEY_SUBSCRIPTIONS].length > 0);
};

export const saveVideoPlayer = player => {
  return editConfig({ player });
};

export const getVideoPlayer = () => {
  return readConfig()
    .then(config => config[CONFIG_KEY_PLAYER] || 'mpv');
};

const editConfig = patch => {
  return readConfig()
    .then(config => Object.assign(config, patch))
    .then(newConfig => writeConfig(newConfig));
};

const writeConfig = newConfig => {
  const json = JSON.stringify(newConfig);
  return writeFileAsync(CONFIG_PATH, json);
};

const readConfig = () => {
  return readFileAsync(CONFIG_PATH)
    .then(config => JSON.parse(config.toString()))
    .catch(() => ({}));
};

