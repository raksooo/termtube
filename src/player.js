import { spawn } from 'child_process';
import { getVideoPlayer } from './configHandler';

let playerProcess;

export const playVideos = videos => {
  const links = videos.map(video => video.link);
  getVideoPlayer()
    .then(player => {
      playerProcess = spawn(player, links);
      playerProcess.stdout.on('data', () => {});
      playerProcess.stderr.on('data', () => {});
      playerProcess.on('close', () => playerProcess = null);
    });
};

