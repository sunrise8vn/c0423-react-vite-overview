import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { customerService } from '../services/customerService';

export const fetchAllCustomers = createAsyncThunk(
  'customer/fetchAllCustomers',
  async () => {
    const response = await customerService.getAll();
    return response.data;
  }
);

export const fetchCustomerById = createAsyncThunk(
  'customer/fetchCustomerById',
  async (customerId) => {
    const response = await customerService.getCustomerById(customerId);
    return response.data;
  }
);

export const fetchAllProvinces = createAsyncThunk(
  'customer/fetchAllProvinces',
  async () => {
    const response = await customerService.getAllProvinces();
    console.log(currentLocationRegion);
    return response.data;
  }
);

export const fetchAllDistricts = createAsyncThunk(
  'customer/fetchAllDistricts',
  async (provinceId) => {
    console.log('provinceId: ', provinceId);
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

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (obj) => {
    const response = await customerService.create(obj);
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
    builder.addCase(fetchCustomerById.fulfilled, (state, action) => {
      state.currentCustomer = action.payload;
      state.currentLocationRegion = action.payload.locationRegion;
    });
    builder.addCase(fetchAllProvinces.fulfilled, (state, action) => {
      state.locationRegion.provinces = action.payload.results;

      state.currentLocationRegion.provinceId =
        action.payload.results[0].province_id;
      state.currentLocationRegion.provinceName =
        action.payload.results[0].province_name;
    });
    builder.addCase(fetchAllDistricts.fulfilled, (state, action) => {
      state.locationRegion.districts = action.payload.results;

      state.currentLocationRegion.districtId =
        action.payload.results[0].district_id;
      state.currentLocationRegion.districtName =
        action.payload.results[0].district_name;
    });
    builder.addCase(fetchAllWards.fulfilled, (state, action) => {
      state.locationRegion.wards = action.payload.results;

      state.currentLocationRegion.wardId = action.payload.results[0].ward_id;
      state.currentLocationRegion.wardName =
        action.payload.results[0].ward_name;
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      // state.locationRegion.wards = action.payload.results;
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
