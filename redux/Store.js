import { configureStore } from '@reduxjs/toolkit';
import websiteReducer from './websiteSlice';
import PrositeSliceReducer from './PrositeSlice'; // Correctly importing the reducer

const store = configureStore({
  reducer: {
    website: websiteReducer,
    prosite: PrositeSliceReducer, // Consistent naming convention
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['yourAction/withNonSerializablePayload'],
        ignoredActionPaths: ['meta.arg', 'payload.file'],
        ignoredPaths: ['items.dates'],
      },
    }),
});

export default store;
