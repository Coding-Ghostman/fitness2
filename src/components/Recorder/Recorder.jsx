import React, { useEffect, useRef } from 'react';
import IPCamera from 'ip-camera';

const IPCameraComponent = ({ url }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const camera = new IPCamera(url);

    camera.onFrame((ctx) => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(ctx.canvas, 0, 0, canvas.width, canvas.height);
    });

    camera.start();

    return () => {
      camera.stop();
    };
  }, [url]);

  return <canvas ref={canvasRef} />;
};

export default IPCameraComponent;
