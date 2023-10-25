import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCustomers } from '../../redux/customerSlice';

const Index = () => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.data);

  useEffect(() => {
    const action = fetchAllCustomers();
    dispatch(action);
  }, []);

  return (
    <div className="container">
      <header>
        <h2>List of customers</h2>
        <div>
          <Link to="/customers/add">
            <button className="btn btn-light me-3">Add new customer</button>
          </Link>
          <Link to="/music">
            <button className="btn btn-light">List of music</button>
          </Link>
        </div>
      </header>

      <div className="content">
        <table
          className="table table-hover"
          style={{
            width: '100%',
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>FullName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Province</th>
              <th>District</th>
              <th>Ward</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.locationRegion.provinceName}</td>
                <td>{item.locationRegion.districtName}</td>
                <td>{item.locationRegion.wardName}</td>
                <td>{item.locationRegion.address}</td>
                <td>
                  <Link to={`/customers/edit/${item.id}`}>
                    <button className="btn btn-outline-secondary me-2">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
