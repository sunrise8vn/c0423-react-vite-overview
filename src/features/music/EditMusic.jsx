import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongById, changeSong, updateSong } from '../../redux/musicSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditMusic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { songId } = useParams();

  const song = useSelector((state) => state.music.song);

  const handleChange = (e) => {
    const obj = {
      [e.target.name]: e.target.value,
    };
    const action = changeSong(obj);
    dispatch(action);
  };

  const handleClickUpdateSong = () => {
    const obj = {
      ...song,
      singer: {
        fullName: song.singerFullName,
      },
    };

    const action = updateSong(obj);
    dispatch(action)
      .unwrap()
      .then(() => {
        navigate('/');
      });
  };

  useEffect(() => {
    const action = fetchSongById(songId);
    dispatch(action);
  }, []);

  return (
    <div className="container">
      <header>
        <h2>Update music</h2>
        <Link to="/music">
          <button className="btn btn-light">List of music</button>
        </Link>
      </header>
      <div className="row mt-3 mb-3">
        <div className="col-lg-6">
          <label className="fw-bold" htmlFor="">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={song.title}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6">
          <label className="fw-bold" htmlFor="">
            Youtube ID
          </label>
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
          <label className="fw-bold" htmlFor="">
            Singer Full Name
          </label>
          <input
            type="text"
            className="form-control"
            name="singerFullName"
            value={song.singerFullName}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6">
          <label className="fw-bold" htmlFor="">
            Author
          </label>
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
            onClick={handleClickUpdateSong}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMusic;
