import React from 'react'
import Webcam from 'react-webcam';


export const WebcamComponent = ({webcamRef}) => {

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user"
 }

  return (
    <Webcam
    height={'100%'}
    width={'100%'}
    ref={webcamRef}
    screenshotFormat="image/jpeg"
    videoConstraints={videoConstraints}
    mirrored={true}
    autoPlay={true}
    audio={false}
    />

  )
}
