import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Play() {
  const { id } = new useParams();

  const audioRef = useRef();
  const [audioSrc, setAudioSrc] = useState();
  useEffect(() => {
    axios.get('/song/url', { params: { id } }).then((res) => {
      setAudioSrc(res.data[0].url);
      audioRef.current.play();
    });
  }, [id]);

  return (
    <div>
      <audio src={audioSrc} controls ref={audioRef}></audio>
    </div>
  );
}
