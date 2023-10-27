import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { musicService } from '../services/musicService';

export const fetchAllMusic = createAsyncThunk(
  'music/fetchAllMusic',
  async () => {
    const response = await musicService.getAll();
    return response.data;
  }
);

export const fetchSongById = createAsyncThunk(
  'music/fetchSongById',
  async (id) => {
    const response = await musicService.getSongById(id);
    return response.data;
  }
);

export const createNewSong = createAsyncThunk(
  'music/createNewSong',
  async (data) => {
    const response = await musicService.create(data);
    return response.data;
  }
);

export const updateSong = createAsyncThunk('music/updateSong', async (data) => {
  const response = await musicService.update(data);
  return response.data;
});

export const musicSlice = createSlice({
  name: 'music',
  initialState: {
    data: [],
    song: {
      title: '',
      singerFullName: '',
      youtubeId: '',
      author: '',
      avatar: null,
    },
    quantity: 1000,
    score: ['Thư Lê'],
  },
  reducers: {
    changeSong: (state, action) => {
      const obj = action.payload;
      const key = Object.keys(obj);
      const value = obj[key];

      state.song[key] = value;
    },
    changeAvatar: (state, { payload }) => {
      const { key, value } = payload;
      state.song[key] = value;
    },
    changeQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    increment: (state) => {
      state.quantity += 1;
    },
    decrement: (state) => {
      state.quantity -= 1;
    },
    incrementByAmount: (state, action) => {
      state.quantity += action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllMusic.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchSongById.fulfilled, (state, action) => {
      const obj = action.payload;
      obj.singerFullName = obj.singer.fullName;
      state.song = obj;
    });

    builder.addCase(createNewSong.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
    });

    builder.addCase(updateSong.fulfilled, (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  changeSong,
  changeAvatar,
  changeQuantity,
  increment,
  decrement,
  incrementByAmount,
} = musicSlice.actions;

export default musicSlice.reducer;
