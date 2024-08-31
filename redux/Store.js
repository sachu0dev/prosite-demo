import { configureStore } from '@reduxjs/toolkit';
import websiteReducer from './websiteSlice';

const store = configureStore({
  reducer: {
    website: websiteReducer,
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
