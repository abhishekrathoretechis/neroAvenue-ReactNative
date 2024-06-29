import React, {useRef, useState, useEffect, useContext} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Swiper from 'react-native-swiper';
import CommonButton from '../components/CommonButton';
import ProfileSetupComplete from '../components/ProfileSetupComplete';
import ProfileSetupFirst from '../components/ProfileSetupFirst';
import ProfileSetupIntersetedInSecond from '../components/ProfileSetupIntersetedInSecond';
import ProfileSetupSecond from '../components/ProfileSetupSecond';
import ProfileSetupSelectCategory from '../components/ProfileSetupSelectCategory';

import {useDispatch} from 'react-redux';
import LoaderScreen from '../utils/Loader';
import client from '../utils/baseUrl';
import {DEFAULT_MESSAGE, VALID_URL} from '../utils/message';
import {BackHandler} from 'react-native';
import {loginUser} from '../redux/reducers/authSlice';
import AuthContext from '../context/authContext';
import apiClient from '../utils/baseUrl';
import authStorage from '../utils/authStorage';
import toastShow from '../utils/Toast';

const SlideScreen = props => {
  const dispatch = useDispatch();
  const {setAuthToken} = useContext(AuthContext);

  const [website, setWebsite] = useState('');
  const [websiteError, setWebsiteError] = useState('');

  const [about, setAbout] = useState('');
  const [aboutError, setAboutError] = useState('');

  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState('');

  const [behanceurl, setBehanceurl] = useState('');
  const [instagramurl, setIntstagramurl] = useState('');
  const [pinteresturl, setPinteresturl] = useState('');
  const [pinteresturlError, setPinteresturlError] = useState('');
  const [behanceurlError, setBehanceurlError] = useState('');
  const [instagramurlError, setIntstagramurlError] = useState('');
  const [interestedCategories, setInterestedCategories] = useState([]);
  console.log('interestedCategories', interestedCategories);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active screen
  const [loading, setLoading] = useState(false);

  var urlRegs =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  useEffect(() => {
    const backAction = () => {
      if (activeIndex === 0) {
        // If on screen 1, prevent going back
        return true;
      } else {
        // If on screen 2 or 3, navigate to the previous screen
        if (swiperRef.current) {
          swiperRef.current.scrollBy(-1);
        }
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [activeIndex]);

  const handleContinue = async () => {
    const imageUrl = image;
    const urlSegments = imageUrl.split('/');
    const filename = urlSegments[urlSegments.length - 1];

    const data = new FormData();
    // data.append('image', {
    //   name: 'image',
    //   type: 'image/jpeg',
    //   uri: Platform.OS === 'ios' ? image.replace('file://', '') : image,
    // });
    data.append('image', {
      uri: Platform.OS === 'ios' ? image?.replace('file://', '') : image,
      name: filename,
      type: 'image/jpeg',
    });
    data.append('about', about);
    data.append('website', website);
    if (behanceurl?.length > 0) data.append('behanceurl', behanceurl);
    if (instagramurl?.length > 0) data.append('instagramurl', instagramurl);
    if (pinteresturl?.length > 0) data.append('pinteresturl', pinteresturl);
    data.append('email', props?.route?.params?.email);
    data.append('mobileNo', props?.route?.params?.mobile);
    data.append('interested', interestedCategories);
    setLoading(true);
    client
      .put('user/profile/setup', data)
      .then(res => {
        setLoading(false);
        if (res?.status === 200) {
          // props.navigation.navigate('Login', {
          //   email: props?.route?.params?.email,
          //   password: props?.route?.params?.password,
          // });
          handlePostRequest();
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const handlePostRequest = async () => {
    setLoading(true);
    const loginData = {
      username: props?.route?.params?.email,
      password: props?.route?.params?.password,
    };

    if (props?.route?.params?.gmail) {
      const data = {
        idToken: props?.route?.params?.idToken,
      };
      const res = await apiClient.post('user/google-login', data);
      if (res.status === 200) {
        setLoading(false);
        setAuthToken(res?.data.accessToken);
        await authStorage.storeToken(res.data.accessToken);
      }
    } else {
      const res = await apiClient.post('user/login', loginData);
      await authStorage.storeToken(res.data.accessToken);
      if (res.status === 200) {
        setLoading(false);
      }
      // const response = await dispatch(loginUser(loginData))

      console.log('responseNew------->', res);

      if (
        res?.data ===
        'Please check and verify your email to complete the profile setup.'
      ) {
        setLoading(false);
        // props.navigation.navigate('Login');
        toastShow(res?.data, 'red');
      }
      setLoading(false);
      setAuthToken(res?.data?.accessToken);
    }
  };

  const NextButton = ({onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.nextButton}>
      <Text style={{color: 'black'}}>Next</Text>
    </TouchableOpacity>
  );

  const onIndexChanged = index => {
    setActiveIndex(index);
  };

  const handleNext1 = () => {
    // let newWebsite = urlRegs.test(website);
    // console.log(newWebsite)

    if (about === '' || image === '') {
      setAboutError(about ? '' : DEFAULT_MESSAGE);
      // setWebsiteError(newWebsite ? '' : VALID_URL);
      setImageError(image ? '' : DEFAULT_MESSAGE);
    } else {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(1);
      }
    }
  };

  const handleNext2 = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleBackScroll = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1);
    }
  };

  return (
    <>
      <LoaderScreen data={loading} />
      <View style={styles.container}>
        <ScrollView>
          <Swiper
            style={styles.wrapper}
            loop={false}
            scrollEnabled={false}
            showsPagination={false}
            // dot={<View style={styles.paginationLine} />}
            // activeDot={<View style={styles.activePaginationLine} />}
            onIndexChanged={onIndexChanged} // Track the active index
            activeDotIndex={activeIndex}
            ref={swiperRef}>
            <View
              style={{
                height: responsiveScreenHeight(100),
                backgroundColor: 'black',
              }}>
              <ProfileSetupFirst
                navigation={props.navigation}
                swiperRef={swiperRef}
                email={props?.route?.params?.email}
              />
            </View>

            <View
              style={{
                height: responsiveScreenHeight(100),
                backgroundColor: 'black',
              }}>
              <ProfileSetupSelectCategory
                navigation={props.navigation}
                swiperRef={swiperRef}
                setInterestedCategories={setInterestedCategories}
              />
            </View>

            <View
              style={{
                height: responsiveScreenHeight(100),
                backgroundColor: 'black',
              }}>
              <ProfileSetupSecond
                about={about}
                setAbout={setAbout}
                aboutError={aboutError}
                setAboutError={setAboutError}
                image={image}
                setImage={setImage}
                imageError={imageError}
                setImageError={setImageError}
                website={website}
                setWebsite={setWebsite}
                websiteError={websiteError}
                setWebsiteError={setWebsiteError}
                handleBackScroll={handleBackScroll}
              />

              <View
                style={{
                  position: 'absolute',
                  bottom: responsiveScreenHeight(10),
                  marginBottom: responsiveScreenHeight(1),

                  width: responsiveScreenWidth(90),
                  height: responsiveScreenHeight(6),
                  alignSelf: 'center',
                }}>
                <CommonButton
                  width={responsiveScreenWidth(90)}
                  height={responsiveScreenHeight(6)}
                  buttonTitle={'Next'}
                  marginTop={responsiveScreenWidth(1)}
                  onButtonPress={handleNext1}
                />
              </View>
            </View>

            <View
              style={{
                height: responsiveScreenHeight(100),
                backgroundColor: 'black',
              }}>
              <ProfileSetupIntersetedInSecond
                behanceurl={behanceurl}
                setBehanceurl={setBehanceurl}
                behanceurlError={behanceurlError}
                setBehanceurlError={setBehanceurlError}
                instagramurl={instagramurl}
                setIntstagramurl={setIntstagramurl}
                instagramurlError={instagramurlError}
                setIntstagramurlError={setIntstagramurlError}
                pinteresturl={pinteresturl}
                setPinteresturl={setPinteresturl}
                pinteresturlError={pinteresturlError}
                setPinteresturlError={setPinteresturlError}
                handleBackScroll={handleBackScroll}
              />

              <View
                style={{
                  position: 'absolute',
                  bottom: responsiveScreenHeight(10),
                  marginBottom: responsiveScreenHeight(1),
                  width: responsiveScreenWidth(90),
                  height: responsiveScreenHeight(6),
                  alignSelf: 'center',
                }}>
                <CommonButton
                  width={responsiveScreenWidth(90)}
                  height={responsiveScreenHeight(6)}
                  buttonTitle={'Next'}
                  marginTop={responsiveScreenWidth(1)}
                  onButtonPress={handleNext2}
                />
              </View>
            </View>

            <View style={{flex: 1, backgroundColor: 'black'}}>
              <ProfileSetupComplete handleBackScroll={handleBackScroll} />
              <View
                style={{
                  position: 'absolute',
                  bottom: responsiveScreenHeight(7),
                  width: responsiveScreenWidth(90),
                  height: responsiveScreenHeight(6),
                  alignSelf: 'center',
                  marginBottom: responsiveScreenHeight(1),
                }}>
                <CommonButton
                  width={responsiveScreenWidth(90)}
                  height={responsiveScreenHeight(6)}
                  buttonTitle={'Continue'}
                  marginTop={responsiveScreenWidth(4)}
                  onButtonPress={handleContinue}
                />
              </View>
            </View>
          </Swiper>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#333',
    fontSize: 30,
    fontWeight: 'bold',
  },
  paginationLine: {
    width: 20,
    height: 2,
    backgroundColor: 'gray',
    marginHorizontal: 5,
    marginBottom: responsiveScreenHeight(8),
  },
  activePaginationLine: {
    width: 30, // Make the active line slightly larger
    height: 2,
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginBottom: responsiveScreenHeight(8),
  },
});
export default SlideScreen;
