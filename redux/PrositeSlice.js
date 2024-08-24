import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bgImg: "",
};

const PrositeSlice = createSlice({
  name: 'prosite',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.bgImg = action.payload;
    }
  }
});

export const { setImage } = PrositeSlice.actions; 
export default PrositeSlice.reducer;
