import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  changeAvatar,
  changeSong,
  createNewSong,
} from '../../redux/musicSlice';
import axios from 'axios';

const AddMusic = () => {
  const cloudName = 'dvv61dvht';
  const unsignedUploadPrefix = 'qnwjqsbm';
  const API_URL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const dispatch = useDispatch();

  const song = useSelector((state) => state.music.song);

  const [avatar, setAvatar] = useState('');

  const handleChange = (e) => {
    const obj = {
      [e.target.name]: e.target.value,
    };
    const action = changeSong(obj);
    dispatch(action);
  };

  const handleChangeAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleUploadAvatar = async () => {
    const formData = new FormData();
    formData.append('file', avatar);
    formData.append('upload_preset', unsignedUploadPrefix);

    return await axios
      .post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // handle the response
        setAvatar(response.data.url);

        return response.data.url;
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  const handleClickAddSong = async () => {
    const avatar = await handleUploadAvatar();

    const avatarBbj = {
      key: 'avatar',
      value: avatar,
    };

    dispatch(changeAvatar(avatarBbj));

    const obj = {
      ...song,
      avatar: avatar,
      singer: {
        fullName: song.singerFullName,
      },
    };

    const action = createNewSong(obj);
    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success('Created successfully!');
      });
  };

  return (
    <div className="container">
      <header>
        <h2>Create music</h2>
        <Link to="/music">
          <button className="btn btn-light">List of music</button>
        </Link>
      </header>
      <div className="row mt-3 mb-3">
        <div className="col-lg-6">
          <div className="col-lg-12 mb-3">
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
          <div className="col-lg-12 mb-3">
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
          <div className="col-lg-12 mb-3">
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
          <div className="col-lg-12 mb-3">
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
        <div className="col-lg-6">
          <div className="col-lg-12 mb-3">
            <label className="fw-bold" htmlFor="">
              Avatar
            </label>
            <input
              type="file"
              className="form-control"
              name="avatar"
              onChange={handleChangeAvatar}
            />
          </div>
          <div className="col-lg-12">
            <label className="fw-bold" htmlFor="">
              Preview
            </label>
            <img src={avatar} alt="" width="100%" height="200px" />
          </div>
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
