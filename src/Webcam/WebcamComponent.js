import React from 'react'
import Webcam from 'react-webcam';

export const WebcamComponent = ({webcamRef}) => {
  return (
    <Webcam
    height={400}
    width={400}
    ref={webcamRef}
    screenshotFormat="image/jpeg"
    videoConstraints={{
      width: { min: 400, ideal: 400, max: 400 },
      height: { min: 400, ideal: 400, max: 400 },
    }}
    mirrored={false}
    autoPlay={true}
    audio={false}
    />

  )
}
