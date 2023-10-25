import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';

const PlayMusic = () => {
  const location = useLocation();
  const youtubeid = location.search.replace('?v=', '');

  const opts = {
    height: '560',
    width: '960',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="container">
      <header>
        <h2>Play music</h2>
        <Link to="/music">
          <button className="btn btn-light">List of music</button>
        </Link>
      </header>

      <div className="content d-flex pt-5" style={{ justifyContent: 'center' }}>
        <YouTube
          videoId={youtubeid} // defaults -> ''
          opts={opts} // defaults -> {}
          // onReady={func} // defaults -> noop
        />
      </div>
    </div>
  );
};

export default PlayMusic;
