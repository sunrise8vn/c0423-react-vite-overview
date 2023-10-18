import React, { useRef } from 'react';

import { MUSIC } from '../../constants/music';

const Index = () => {
  const audioRef = useRef(null);

  const handleClickPlay = () => {
    audioRef.current.play();
  };

  const handleClickPause = () => {
    audioRef.current.pause();
  };

  const handleClickVolDown = () => {
    if (audioRef.current.volume >= MUSIC.RANGE_VOL_UP_DOWN) {
      const currentVol =
        (audioRef.current.volume * 10 - MUSIC.RANGE_VOL_UP_DOWN * 10) / 10;
      audioRef.current.volume = currentVol;
    } else {
      audioRef.current.volume = 0;
    }
  };

  const handleClickVolUp = () => {
    if (audioRef.current.volume <= 1 - MUSIC.RANGE_VOL_UP_DOWN) {
      const currentVol =
        (audioRef.current.volume * 10 + MUSIC.RANGE_VOL_UP_DOWN * 10) / 10;
      audioRef.current.volume = currentVol;
    } else {
      audioRef.current.volume = 1;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <audio controls ref={audioRef}>
          <source src={MUSIC.AUDIO_DEFAULT} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <div className="row">
        <div className="col-lg-3">
          <button className="btn btn-outline-success" onClick={handleClickPlay}>
            Play
          </button>
        </div>
        <div className="col-lg-3">
          <button
            className="btn btn-outline-secondary"
            onClick={handleClickPause}
          >
            Pause
          </button>
        </div>
        <div className="col-lg-3">
          <button
            className="btn btn-outline-secondary"
            onClick={handleClickVolDown}
          >
            Vol down
          </button>
        </div>
        <div className="col-lg-3">
          <button
            className="btn btn-outline-secondary"
            onClick={handleClickVolUp}
          >
            Vol up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
