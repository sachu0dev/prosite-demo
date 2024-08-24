// store/slices/websiteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  components: [],
  backgroundImage: null,
};

const websiteSlice = createSlice({
  name: 'website',
  initialState,
  reducers: {
    setComponents: (state, action) => {
      state.components = action.payload;
    },
    setBackgroundImage: (state, action) => {
      state.backgroundImage = action.payload;
    },
  },
});

export const { setComponents, setBackgroundImage } = websiteSlice.actions;
export default websiteSlice.reducer;