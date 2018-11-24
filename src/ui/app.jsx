import React from 'react';
import { LoadingScreen } from './loadingScreen';
import { Feed } from './feed';
import { getVideos } from '../videoRetriever';

export const App = () => (
  <LoadingScreen loader={getVideos}>
    <Feed />
  </LoadingScreen>
);

