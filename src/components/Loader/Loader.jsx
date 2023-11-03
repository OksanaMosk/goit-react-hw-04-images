import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <ThreeCircles
      height="100"
      width="100"
      color="#5a6679"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor="#7a8ca7"
      innerCircleColor="#fff"
      middleCircleColor="#5a6679"
    />
  );
};
export default Loader;
