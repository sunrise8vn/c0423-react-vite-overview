import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import {
  changeCurrentCustomer,
  changeLocationRegion,
  changeLocationRegionAddress,
  fetchAllDistricts,
  fetchAllProvinces,
  fetchAllWards,
  fetchCustomerById,
} from '../../redux/customerSlice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCustomer = () => {
  const dispatch = useDispatch();

  const { customerId } = useParams();

  const currentCustomer = useSelector(
    (state) => state.customer.currentCustomer
  );
  const currentLocationRegion = useSelector(
    (state) => state.customer.currentLocationRegion
  );

  const locationRegion = useSelector((state) => state.customer.locationRegion);
  const provinces = locationRegion.provinces;
  const districts = locationRegion.districts;
  const wards = locationRegion.wards;

  const handleChangeCurrentCustomer = (e) => {
    const { name, value } = e.target;

    const action = changeCurrentCustomer({ name, value });
    dispatch(action);
  };

  const handleChangeLocationRegion = (e) => {
    const { name, value } = e.target;
    const text = e.target.options[e.target.selectedIndex].text;

    dispatch(changeLocationRegion({ name, value, text }));
  };

  const handleChangeLocationRegionAddress = (e) => {
    const { value } = e.target;

    const action = changeLocationRegionAddress(value);
    dispatch(action);
  };

  const handleChangeProvince = (e) => {
    const provinceId = e.target.value;

    const action = fetchAllDistricts(provinceId);
    dispatch(action)
      .unwrap()
      .then((data) => {
        const districtId = data.results[0].district_id;
        const action = fetchAllWards(districtId);
        dispatch(action);
      });
  };

  const handleChangeDistrict = (e) => {
    const districtId = e.target.value;

    const action = fetchAllWards(districtId);
    dispatch(action);
  };

  const handleClickUpdate = () => {};

  useEffect(() => {
    const action = fetchCustomerById(customerId);
    dispatch(action);

    dispatch(fetchAllProvinces())
      .unwrap()
      .then(() => {
        console.log(currentLocationRegion.provinceId);
        const action = fetchAllDistricts(currentLocationRegion.provinceId);
        dispatch(action);
      });

    //   .unwrap()
    //   .then((data) => {
    //     const provinceId = data.results[0].province_id;
    //     const action = fetchAllDistricts(provinceId);
    //     dispatch(action)
    //       .unwrap()
    //       .then((data) => {
    //         const districtId = data.results[0].district_id;
    //         const action = fetchAllWards(districtId);
    //         dispatch(action);
    //       });
    //   });
  }, [customerId]);

  return (
    <div className="container">
      <header>
        <h2>Create customer</h2>
        <Link to="/customers">
          <button className="btn btn-light">List of customers</button>
        </Link>
      </header>

      <div className="content">
        <div className="row mt-3 mb-3">
          <div className="col-lg-4">
            <label className="fw-bold" htmlFor="">
              FullName
            </label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={currentCustomer.fullName}
              onChange={handleChangeCurrentCustomer}
            />
          </div>
          <div className="col-lg-4">
            <label className="fw-bold" htmlFor="">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={currentCustomer.email}
              onChange={handleChangeCurrentCustomer}
            />
          </div>
          <div className="col-lg-4">
            <label className="fw-bold" htmlFor="">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={currentCustomer.phone}
              onChange={handleChangeCurrentCustomer}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-4">
            <label className="fw-bold" htmlFor="">
              Province
            </label>
            <select
              className="form-control"
              name="province"
              value={currentLocationRegion.provinceId}
              onChange={(e) => {
                handleChangeProvince(e);
                handleChangeLocationRegion(e);
              }}
            >
              {provinces &&
                provinces.length &&
                provinces.map((item) => (
                  <option key={item.province_id} value={item.province_id}>
                    {item.province_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-lg-4">
            <label className="fw-bold" htmlFor="">
              District
            </label>
            <select
              className="form-control"
              name="district"
              onChange={(e) => {
                handleChangeDistrict(e);
                handleChangeLocationRegion(e);
              }}
            >
              {districts &&
                districts.length &&
                districts.map((item) => (
                  <option key={item.district_id} value={item.district_id}>
                    {item.district_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-lg-4">
            <label className="fw-bold" htmlFor="">
              Ward
            </label>
            <select
              className="form-control"
              name="ward"
              onChange={handleChangeLocationRegion}
            >
              {wards &&
                wards.length &&
                wards.map((item) => (
                  <option key={item.ward_id} value={item.ward_id}>
                    {item.ward_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-12">
            <label className="fw-bold" htmlFor="">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              onChange={handleChangeLocationRegionAddress}
            />
          </div>
        </div>
        <div className="row mb-3 d-flex" style={{ justifyContent: 'center' }}>
          <div className="col-lg-3">
            <button
              className="btn btn-outline-primary"
              onClick={handleClickUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
