/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { PhonePreview } from '../utils/types/PhonePreviewType';

export interface PhonesState {
  phones: PhonePreview[];
  status: 'idle' | 'loading' | 'failed';
}
const initialState: PhonesState = {
  phones: [],
  status: 'idle'
};

export const loadPhones = createAsyncThunk(
  'phones/loadPhones',
  (async () => {
    const response = await axios.get('https://phone-catalog-bcknd.onrender.com/data');

    return response.data;
  })
);

export const PhonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPhones.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPhones.fulfilled, (state, action) => {
        state.status = 'idle';
        state.phones = action.payload;
      })
      .addCase(loadPhones.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const setAllPhones = (state: RootState) => state.allPhones;
export default PhonesSlice.reducer;