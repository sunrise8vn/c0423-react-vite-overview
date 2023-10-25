import { configureStore } from '@reduxjs/toolkit';

import musicReducer from './musicSlice';
import customerReducer from './customerSlice';

export default configureStore({
  reducer: {
    music: musicReducer,
    customer: customerReducer,
  },
});
