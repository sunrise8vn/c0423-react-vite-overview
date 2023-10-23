import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeSong, createNewSong } from '../../redux/musicSlice';

const AddMusic = () => {
  const dispatch = useDispatch();

  const song = useSelector((state) => state.music.song);

  const handleChange = (e) => {
    const obj = {
      [e.target.name]: e.target.value,
    };
    const action = changeSong(obj);
    dispatch(action);
  };

  const handleClickAddSong = () => {
    const obj = {
      ...song,
      singer: {
        fullName: song.singerFullName,
      },
    };

    const action = createNewSong(obj);
    dispatch(action);
  };

  return (
    <div className="container">
      <header>
        <Link to="/">List of music</Link>
      </header>
      <div className="row mb-3">
        <div className="col-lg-6">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={song.title}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6">
          <label htmlFor="">Youtube ID</label>
          <input
            type="text"
            className="form-control"
            name="youtubeId"
            value={song.youtubeId}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-6">
          <label htmlFor="">Singer Full Name</label>
          <input
            type="text"
            className="form-control"
            name="singerFullName"
            value={song.singerFullName}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6">
          <label htmlFor="">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={song.author}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3 d-flex" style={{ justifyContent: 'center' }}>
        <div className="col-lg-3">
          <button
            className="btn btn-outline-primary"
            onClick={handleClickAddSong}
          >
            Add new
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMusic;
