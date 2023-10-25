import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { customerService } from '../services/customerService';

export const fetchAllCustomers = createAsyncThunk(
  'customer/fetchAllCustomers',
  async () => {
    const response = await customerService.getAll();
    return response.data;
  }
);

export const fetchAllProvinces = createAsyncThunk(
  'customer/fetchAllProvinces',
  async () => {
    const response = await customerService.getAllProvinces();
    return response.data;
  }
);

export const fetchAllDistricts = createAsyncThunk(
  'customer/fetchAllDistricts',
  async (provinceId) => {
    const response = await customerService.getAllDistricts(provinceId);
    return response.data;
  }
);

export const fetchAllWards = createAsyncThunk(
  'customer/fetchAllWards',
  async (districtId) => {
    const response = await customerService.getAllWards(districtId);
    return response.data;
  }
);

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    data: [],
    currentCustomer: {},
    currentLocationRegion: {},
    locationRegion: {
      provinces: [],
      districts: [],
      wards: [],
    },
  },
  reducers: {
    changeCurrentCustomer: (state, action) => {
      const { name, value } = action.payload;

      state.currentCustomer[name] = value;
    },
    changeLocationRegion: (state, action) => {
      const { name, value, text } = action.payload;
      const keyId = name + 'Id';
      const keyName = name + 'Name';

      state.currentLocationRegion[keyId] = value;
      state.currentLocationRegion[keyName] = text;
    },
    changeLocationRegionAddress: (state, action) => {
      state.currentLocationRegion.address = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCustomers.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchAllProvinces.fulfilled, (state, action) => {
      state.locationRegion.provinces = action.payload.results;
    });
    builder.addCase(fetchAllDistricts.fulfilled, (state, action) => {
      state.locationRegion.districts = action.payload.results;
    });
    builder.addCase(fetchAllWards.fulfilled, (state, action) => {
      state.locationRegion.wards = action.payload.results;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  changeCurrentCustomer,
  changeLocationRegion,
  changeLocationRegionAddress,
} = customerSlice.actions;

export default customerSlice.reducer;
