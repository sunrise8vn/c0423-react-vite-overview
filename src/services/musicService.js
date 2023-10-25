import axios from 'axios';

import { SONG_API } from '../constants/global';

export const musicService = {
  getAll: () => {
    return axios.get(SONG_API + '?_sort=id&_order=desc');
  },
  getSongById: (id) => {
    return axios.get(SONG_API + '/' + id);
  },
  create: (data) => {
    return axios.post(SONG_API, data);
  },
  update: (data) => {
    return axios.patch(SONG_API + '/' + data.id, data);
  },
};
