import Toast from 'react-native-root-toast';
import {colorConstant} from './constant';

const toastShow = (message,backgroundColor = colorConstant.backgroundBlack) => {
  // if(Platform.OS === 'ios'){
  //   Toast.show(message, {
  //     duration: 4000,
  //     position: Toast.positions.TOP,
  //     shadow: true,
  //     animation: true,
  //     hideOnPress: true,
  //     delay: 0,
  //     backgroundColor:backgroundColor,
  //     textColor:  colorConstant.white,
  //     onShow: () => {
  //       // calls on toast\`s appear animation start
  //     },
  //     onShown: () => {
  //       // calls on toast\`s appear animation end.
  //     },
  //     onHide: () => {
  //       // calls on toast\`s hide animation start.
  //     },
  //     onHidden: () => {
  //       // calls on toast\`s hide animation end.
  //     },
  //   });
  // }else{
  //   ToastAndroid.showWithGravityAndOffset(
  //     message,
  //     ToastAndroid.SHORT,
  //     ToastAndroid.BOTTOM,
  //     25,
  //     50,
  // );
  // }

  Toast.show(message, {
    duration: 4000,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor:backgroundColor,
    textColor:  colorConstant.white,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  });
  
};

export default toastShow;
