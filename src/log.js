import { appendFile } from 'fs';
import { promisify } from 'util';

const appendFileAsync = promisify(appendFile);

export const log = message => {
  let messageString = message;
  if (typeof message !== 'string') {
    messageString = JSON.stringify(message);
  }
  appendFileAsync('termtube.log', `\n${messageString}`);
};

