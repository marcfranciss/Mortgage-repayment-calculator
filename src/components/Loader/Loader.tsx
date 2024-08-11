import React, { useEffect, useState } from "react";
import "./loader.scss";

interface LoaderProps {
  textProps: string;
  loaderState: boolean;
  timer: number;
  setLoaderState: (state: boolean) => void;
}

const Loading: React.FC<LoaderProps> = ({
  textProps,
  loaderState,
  timer,
  setLoaderState,
}) => {
  const [showLoader, setShowLoader] = useState(false);
  const delay = (time: number) => {
    return new Promise((res) => {
      setTimeout(res, time);
    });
  };
  useEffect(() => {
    if (loaderState) {
      const loderTime = async () => {
        setShowLoader(true);
        await delay(timer);
        setShowLoader(false);
        setLoaderState(false);
      };
      loderTime();
    } else {
      setLoaderState(false);
    }
  }, [loaderState, setLoaderState]);

  return showLoader ? <div className='loader'></div> : textProps;
};

export default Loading;
