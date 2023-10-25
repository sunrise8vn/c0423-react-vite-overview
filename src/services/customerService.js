import axios from 'axios';

import { CUSTOMER_API, LOCATION_REGION_API } from '../constants/global';

export const customerService = {
  getAll: () => {
    return axios.get(CUSTOMER_API + '?_sort=id&_order=desc');
  },
  getCustomerById: (id) => {
    return axios.get(CUSTOMER_API + '/' + id);
  },
  create: (data) => {
    return axios.post(CUSTOMER_API, data);
  },
  update: (data) => {
    return axios.patch(CUSTOMER_API + '/' + data.id, data);
  },
  getAllProvinces: () => {
    return axios.get(LOCATION_REGION_API + '/province/');
  },
  getAllDistricts: (provinceId) => {
    return axios.get(LOCATION_REGION_API + '/province/district/' + provinceId);
  },
  getAllWards: (districtId) => {
    return axios.get(LOCATION_REGION_API + '/province/ward/' + districtId);
  },
};
