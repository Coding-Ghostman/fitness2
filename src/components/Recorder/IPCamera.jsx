import React, { useState } from 'react';
import { log } from 'util';

const IPCamera = () => {
  const [stream, setStream] = useState(null);

  const startStreaming = async () => {
    console.log("rendered");
    const video = new window.HTMLVideoElement();
    video.src = "http://192.168.1.89:8080";
    video.crossOrigin = '';

    video.addEventListener('loadedmetadata', () => {
      setStream(video);
    });
  };

  const stopStreaming = () => {
    stream && stream.pause();
    setStream(null);
  };

  return (
    <div>
      <button onClick={startStreaming}>Start Streaming</button>
      <button onClick={stopStreaming}>Stop Streaming</button>
      {stream && (
        <canvas width={stream.videoWidth} height={stream.videoHeight} />
      )}
    </div>
  );
};

export default IPCamera;
