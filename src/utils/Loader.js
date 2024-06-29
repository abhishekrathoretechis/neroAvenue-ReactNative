import React, {useState, useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {colorConstant} from './constant';

const LoaderScreen = props => {
  

  return (
    <Spinner
      visible={props.data}
      color={ colorConstant.white}
      textStyle={{
        color:  colorConstant.white,
      }}
    />
  );
};
export default LoaderScreen;
