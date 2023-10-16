import React, { useState } from 'react';
import ModalUpdate from './ModalUpdate';

const customers = [
  {
    id: 1,
    fullName: 'NVA',
    email: 'nva@co.cc',
    phone: '2345',
    address: '28 nguyễn Tri Phương',
  },
  {
    id: 2,
    fullName: 'NVB',
    email: 'nvb@co.cc',
    phone: '3456',
    address: '29 nguyễn Tri Phương',
  },
];

const Index = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [customer, setCustomer] = useState({});

  const changeData = (obj) => {
    let index = -1;

    customers.forEach((item, i) => {
      if (item.id === obj.id) {
        index = i;
      }
    });

    customers[index] = obj;
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleClickEditButton = (id) => {
    const existCustomer = customers.find((item) => item.id === id);

    if (existCustomer) {
      setCustomer(existCustomer);
      setIsOpen(true);
    } else {
      alert('Customer not found');
    }
  };

  return (
    <>
      <div className="container">
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
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleClickEditButton(item.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ModalUpdate
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        data={customer}
        changeData={changeData}
      />
    </>
  );
};

export default Index;
