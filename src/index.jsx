import program from 'commander';
import { run } from './ui/index';
import {
  subscriptionsExist,
  registerSubscriptions,
  saveVideoPlayer
} from './configHandler';
import { log } from './log';

program
  .version('0.0.1');

program
  .command('set')
  .option('-s, --subscriptions <file>', 'XML file with subscriptions')
  .option('-p, --player <player>', 'Player to use when playing videos')
  .action(({ subscriptions, player }) => {
    if (subscriptions != null) {
      registerSubscriptions(subscriptions);
    }
    if (player != null) {
      saveVideoPlayer(player);
    }
  });

program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  subscriptionsExist()
    .then(exist => {
      if (exist === true) {
        run();
      } else {
        program.outputHelp();
      }
    })
    .catch(log);
}

