import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchAllMusic,
  changeQuantity,
  increment,
  decrement,
} from '../../redux/musicSlice';
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const musicData = useSelector((state) => state.music.data);

  // const handleChangeQuantity = (e) => {
  //   const action = changeQuantity(e.target.value);
  //   dispatch(action);
  // };

  // const handleIncrement = () => {
  //   const action = increment();
  //   dispatch(action);
  // };

  // const handleDecrement = () => {
  //   const action = decrement();
  //   dispatch(action);
  // };

  // const quantity = useSelector((state) => state.music.quantity);

  const handleClickAddMusic = () => {
    navigate('/music/add');
  };

  useEffect(() => {
    const action = fetchAllMusic();
    dispatch(action);
  }, []);

  return (
    <div className="container">
      <header>
        <h2>List of music</h2>
        <div>
          <Link to="/music/add">
            <button className="btn btn-light me-3">Add new music</button>
          </Link>
          <Link to="/customers">
            <button className="btn btn-light">List of customers</button>
          </Link>
        </div>
      </header>
      {/* <div>
        <button onClick={handleDecrement}>Decrement</button>
        <input type="text" value={quantity} onChange={handleChangeQuantity} />
        <button onClick={handleIncrement}>Increment</button>
      </div> */}

      <div className="content d-flex" style={{ justifyContent: 'center' }}>
        <table
          className="table table-hover"
          style={{
            width: '100%',
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Title</th>
              <th>Singer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {musicData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img src={item.avatar} alt="" width="80px" height="50px" />
                </td>
                <td>{item.title}</td>
                <td>{item.singer.fullName}</td>
                <td>
                  <Link to={`/music/edit/${item.id}`}>
                    <button className="btn btn-outline-secondary me-2">
                      Edit
                    </button>
                  </Link>
                  <Link to={`/music/watch?v=${item.youtubeId}`}>
                    <button className="btn btn-outline-success ms-2">
                      Play
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
