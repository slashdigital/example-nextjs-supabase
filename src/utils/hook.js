import React from "react";

export const useDisplayImage = () => {
  const [result, setResult] = React.useState("");

  function uploader(imageFile) {
    const objectUrl = URL.createObjectURL(imageFile);
    setResult(objectUrl);
  }

  return { result, uploader, setResult };
};

// ====

export const useTimeout = () => {
  const [timer, setTimer] = React.useState(null);

  function wait(milliseconds, callback) {
    setTimer(
      setTimeout(() => {
        callback && callback();
        setTimer(null);
      }, milliseconds)
    );
  }
  function clear() {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  }
  return { wait, clear };
};
