import React from 'react'
import Webcam from 'react-webcam';
import { createContext, useContext } from "react";

const WebcamContext = createContext();

const WebcamContainer = ({webcamRef}) => {

  return (
    <WebcamContext.Provider value={{ ref: webcamRef }}>
      <Webcam
      height={400}
      width={400}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={{
        width: { min: 400, ideal: 400, max: 400 },
        height: { min: 400, ideal: 400, max: 400 },
      }}
      mirrored={true}
      autoPlay={true}
      audio={false}
      />
    </WebcamContext.Provider>
  )
}
export const useWebcamContext = () => {
  return useContext(WebcamContext);
};

export default WebcamContainer;