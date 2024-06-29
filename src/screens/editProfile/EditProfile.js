import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Text} from 'react-native-paper';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import CommonTextInput from '../../components/CommonTextInput';
import {
  getAllCountryName,
  userProfileDetails,
  userProfileUpdate,
} from '../../redux/reducers/authSlice';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {DEFAULT_MESSAGE, VALID_URL} from '../../utils/message';
import styles from './Styles';
export default function EditProfile(props, {navigation}) {
  const userProfileData = useSelector(state => state?.auth?.curretUser);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [website, setWebsite] = useState('');
  const [websiteError, setWebsiteError] = useState('');
  const [about, setAbout] = useState('');
  const [aboutError, setAboutError] = useState('');
  const [whatBest, setWhatBest] = useState('');
  const [openWhatBest, setOpenWhatBest] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState('');
  const [valueType, setValueType] = useState('');
  const [valueInterest, setValueInterest] = useState(
    userProfileData?.interested
      ? userProfileData?.interested?.map(int => {
          return int?.interested;
        })
      : [],
  );
  const [valueInterestError, setValueInterestError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [countryNameError, setCountryNameError] = useState('');
  const getCountryData = useSelector(state => state?.auth?.getCountry);
  const newArray = [];
  const [isCountryListVisible, setCountryListVisibility] = useState(false);
  const [countryCode, setCountryCode] = useState(countryCode);
  const [behanceurl, setBehanceurl] = useState('');
  const [instagramurl, setIntstagramurl] = useState('');
  const [pinteresturl, setPinteresturl] = useState('');
  const [pinteresturlError, setPinteresturlError] = useState('');
  const [behanceurlError, setBehanceurlError] = useState('');
  const [instagramurlError, setIntstagramurlError] = useState('');
  var urlRegs =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  const handleCountrySelection = () => {
    setCountryListVisibility(!isCountryListVisible);
  };

  for (var i = 0; i < getCountryData?.length; i++) {
    let obj = {
      label: getCountryData[i]?.name,
      value: getCountryData[i]?.name,
    };
    newArray.push(obj);
  }

  const getFullForm = abbreviation => {
    switch (abbreviation) {
      case 'PIC':
        return 'Photography';
      case 'Art':
        return 'Digital Art';
      case 'TXT':
        return 'Typography';
      case 'MOV':
        return 'Motion Graphics';
      case '3DX':
        return '3D Art';
      case 'VOG':
        return 'Fashion';
      case 'ARC':
        return 'Architecture';
      case 'PRD':
        return 'Product Design';
      case 'MOB':
        return 'Mobile Photography';
      case 'LIF':
        return 'Lifestyle';
      default:
        return 'Unknown';
    }
  };

  const formatInterests = interests => {
    if (!interests || interests.length === 0) {
      return 'No interests';
    } else if (interests.length === 1) {
      return getFullForm(interests[0]);
    } else {
      const moreCount = interests.length - 1;
      return `${getFullForm(interests[0])} +${moreCount} more`;
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      handleCountries();
      getUserDetails();
    });
    return unsubscribe;
  }, [props.navigation]);

  const handleCountries = () => {
    dispatch(getAllCountryName());
  };

  // handle date confirm
  const handleConfirm = date => {
    const inputDate = new Date(date);

    const day = String(inputDate.getDate()).padStart(2, '0');
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const year = inputDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    setSelectedDate(formattedDate);

    hideDatePicker();
  };

  // hide date
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // set userdetails
  const getUserDetails = async () => {
    dispatch(userProfileDetails());
    const inputDate = new Date(userProfileData?.dob);

    const day = String(inputDate?.getDate())?.padStart(2, '0');
    const month = String(inputDate?.getMonth() + 1)?.padStart(2, '0');
    const year = inputDate?.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    setName(userProfileData?.name ? userProfileData?.name : '');
    setUsername(userProfileData?.username ? userProfileData?.username : '');
    setWebsite(userProfileData?.website ? userProfileData?.website : '');
    setAbout(userProfileData?.about ? userProfileData?.about : '');
    setEmail(userProfileData?.email ? userProfileData?.email : '');
    setPhone(
      userProfileData?.mobileNumber ? userProfileData?.mobileNumber : '',
    );
    setGender(userProfileData?.gender ? userProfileData?.gender : '');
    setImage(userProfileData?.userImage ? userProfileData?.userImage : '');
    setSelectedDate(formattedDate ? formattedDate : '');
    setCountryName(userProfileData?.country ? userProfileData?.country : '');
    setCountryCode(
      userProfileData?.countryCode ? userProfileData?.countryCode : '',
    );
    setValueInterest(
      userProfileData?.interested
        ? userProfileData?.interested?.map(int => {
            return int?.interested;
          })
        : '',
    );
    setValueType(userProfileData?.type ? userProfileData?.type : '');
    setPinteresturl(
      userProfileData?.pinteresturl ? userProfileData?.pinteresturl : '',
    );
    setBehanceurl(
      userProfileData?.behanceurl ? userProfileData?.behanceurl : '',
    );
    setIntstagramurl(
      userProfileData?.instagramurl ? userProfileData?.instagramurl : '',
    );
    setWhatBest(userProfileData?.best ? userProfileData?.best : '');
  };
  // gallery call
  const galleryCall = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        if (image.path !== '') {
          setImage(image.path);
          setImageError('');
          setModalVisible(false);
        } else {
          setImage('');
          setImageError(DEFAULT_MESSAGE);
          setModalVisible(false);
        }
      });
    } catch (error) {}
  };

  // camera call
  const cameraCall = async () => {
    try {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        if (image.path !== '') {
          setImage(image.path);
          setImageError('');
          setModalVisible(false);
        } else {
          setImage('');
          setImageError(DEFAULT_MESSAGE);
          setModalVisible(false);
        }
      });
    } catch (error) {}
  };

  // handle api call
  const onUserUpdateProfile = async () => {
    const imageUrl = image;
    const urlSegments = imageUrl.split('/');
    const filename = urlSegments[urlSegments.length - 1];

    if (username && about && image && countryName && valueInterest) {
      const data = new FormData();
   

      data.append('image', {
        uri:
          Platform.OS === 'ios' ? imageUrl?.replace('file://', '') : imageUrl,
        name: filename,
        type: 'image/jpeg',
      });
      data.append('name', userProfileData?.name);
      data.append('username', username);
      data.append('mobileNo', phone);
      data.append('about', about);
      data.append('website', website);
      data.append('interested', [props?.route?.params?.selectTag]);
      data.append('dob', selectedDate);
      data.append('email', email);
      data.append('gender', userProfileData?.gender);
      data.append('country', countryName);
      data.append('type', valueType);
      data.append('countryCode', countryCode);
      data.append('behanceurl', behanceurl);
      data.append('instagramurl', instagramurl);
      data.append('pinteresturl', pinteresturl);
      data.append('best', whatBest);

      // dispatch(userProfileUpdate(data), () => {
      //   getUserDetails();
      // }).then(response => {
      //   if (response?.payload && response?.payload?.status === 200) {
      //     props.navigation.navigate('NewMyProfile');
      //   }
      // });
    } else {
      setUsernameError(username ? '' : DEFAULT_MESSAGE);
      setAboutError(about ? '' : DEFAULT_MESSAGE);
      // setWebsiteError(newWebsite ? '' : VALID_URL);
      setImageError(image ? '' : DEFAULT_MESSAGE);
      setCountryNameError(countryName ? '' : DEFAULT_MESSAGE);
      setValueInterestError(valueInterest ? '' : DEFAULT_MESSAGE);
    }
  };

  // username
  const onHandleUserName = text => {
    if (text.length !== 0) {
      setUsername(text);
      setUsernameError('');
    } else {
      setUsername('');
      setUsernameError(DEFAULT_MESSAGE);
    }
  };

  // about
  const onHandleAbout = text => {
    if (text.length !== 0) {
      setAbout(text);
      setAboutError('');
    } else {
      setAbout('');
      setAboutError(DEFAULT_MESSAGE);
    }
  };

  // website
  const onHandleWebsite = text => {
    if (text.length !== 0) {
      if (urlRegs.test(text)) {
        setWebsite(text);
        setWebsiteError('');
      } else {
        setWebsite(text);
        setWebsiteError(VALID_URL);
      }
    } else {
      setWebsite('');
      setWebsiteError('');
    }
  };

  // instagram
  const onHandleInstagram = text => {
    if (text.length !== 0) {
      if (urlRegs.test(text)) {
        setIntstagramurl(text);
        setIntstagramurlError('');
      } else {
        setIntstagramurl(text);
        setIntstagramurlError(VALID_URL);
      }
    } else {
      setIntstagramurl('');
    }
  };

  // website
  const onHandleBehance = text => {
    if (text.length !== 0) {
      if (urlRegs.test(text)) {
        setBehanceurl(text);
        setBehanceurlError('');
      } else {
        setBehanceurl(text);
        setBehanceurlError(VALID_URL);
      }
    } else {
      setBehanceurl('');
    }
  };

  // website
  const onHandlePinterset = text => {
    if (text.length !== 0) {
      if (urlRegs.test(text)) {
        setPinteresturl(text);
        setPinteresturlError('');
      } else {
        setPinteresturl(text);
        setPinteresturlError(VALID_URL);
      }
    } else {
      setPinteresturl('');
    }
  };

  // country
  const onHandleCountryName = country => {
    setCountryListVisibility(false);
    if (country.length !== 0) {
      setCountryNameError('');
      setCountryName(country?.name);
      setCountryCode(country?.cca2);
    } else {
      setCountryName('');
      setCountryNameError(DEFAULT_MESSAGE);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header */}

      <View style={styles.backgroundView}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('NewMyProfile')}>
          <Text variant="bodyLarge" style={styles.cancelText}>
            Cancel
          </Text>
        </TouchableOpacity>

        <Text variant="titleMedium" style={styles.cancelText}>
          Edit Profile
        </Text>

        <TouchableOpacity onPress={onUserUpdateProfile}>
          <Text variant="titleMedium" style={styles.cancelText}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Profile Image */}
        <View style={styles.mainRowConatiner}>
          <View style={styles.imageBackgroundWidth}>
            <TouchableOpacity
              style={styles.imgTouch}
              onPress={() => setModalVisible(true)}>
              {image ? (
                <Image source={{uri: image}} style={styles.profileImg} />
              ) : (
                <Image
                  source={imageConstant.placeholder}
                  style={styles.profileImg}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text variant="titleMedium" style={styles.text}>
                Edit/Update
              </Text>
            </TouchableOpacity>

            {imageError ? (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{imageError}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.rightView}>
            <Text variant="titleMedium" style={styles.text}>
              Membership Type
            </Text>
            <View style={styles.underMainRowContainet}>
              <Image
                source={
                  userProfileData?.userType === 'collectors'
                    ? imageConstant.nerocollector
                    : valueType === 'alliance'
                    ? imageConstant.neroalliance
                    : valueType === 'inner circle'
                    ? imageConstant.nerocircle
                    : imageConstant.nerocollector
                }
                style={styles.memberImg}
              />
              <Text style={styles.rightUnderText}>
                NERO{' '}
                {userProfileData?.userType
                  ? userProfileData?.userType
                  : 'Collectors'}
              </Text>
            </View>
          </View>
        </View>
        {/* User Information */}

        <View style={styles.rowView}>
          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Type</Text>
            </View>

            <View style={styles.TypeContainer}>
              <Text style={styles.rightIndivialText}>
                {valueType ? valueType : 'Individual'}
              </Text>
              <Image source={imageConstant.arrow} style={styles.arrowImg} />
            </View>
          </View>

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Username</Text>
            </View>
            <View>
              <CommonTextInput
                width={responsiveScreenWidth(60)}
                height={responsiveScreenHeight(6)}
                value={username}
                onChangeText={username => onHandleUserName(username)}
                placeholder="Enter the username"
                borderColor={colorConstant.bordercolor}
              />
              {usernameError ? (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{usernameError}</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Email</Text>
            </View>

            <CommonTextInput
              width={responsiveScreenWidth(60)}
              height={responsiveScreenHeight(6)}
              value={email}
              editable={false}
              borderColor={colorConstant.bordercolor}
            />
          </View>

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Phone</Text>
            </View>

            <CommonTextInput
              width={responsiveScreenWidth(60)}
              height={responsiveScreenHeight(6)}
              value={phone}
              editable={false}
              borderColor={colorConstant.bordercolor}
            />
          </View>

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Country</Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={handleCountrySelection}
                activeOpacity={0.9}
                style={styles.dropdownContainernew}>
                {!countryName ? (
                  <Text style={styles.selectCountryButton}>Select Country</Text>
                ) : (
                  <Text
                    style={styles.selectedCountryText}
                    onPress={handleCountrySelection}>
                    {countryName}
                  </Text>
                )}
                <Image
                  source={imageConstant.arrow}
                  style={styles.countryArrowImg}
                />

                {isCountryListVisible && (
                  <CountryPicker
                    onSelect={country => {
                      onHandleCountryName(country);
                    }}
                    onClose={() => {
                      setCountryListVisibility(false);
                    }}
                    visible={isCountryListVisible}
                    translation="eng"
                    theme={DARK_THEME}
                    withFilter={true}
                    withFlag={true}
                    withEmoji
                    filterPlaceholder="Search Country"
                    filterPlaceholderTextColor={colorConstant.gray}
                  />
                )}
              </TouchableOpacity>

              {countryNameError ? (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{countryNameError}</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Area of interest</Text>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => props.navigation.navigate('Intereseted')}
                style={styles.interestTouch}>
                <Text style={styles.interestText}>
                  {formatInterests(valueInterest)}
                </Text>
              </TouchableOpacity>

              {valueInterestError ? (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{valueInterestError}</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Date of Birth</Text>
            </View>
            <View style={styles.calenderContainer}>
              <TextInput
                placeholder="Date of birth"
                placeholderTextColor={colorConstant.placeholdercolor}
                style={styles.dobText}
                value={selectedDate}
                editable={false}
              />
            </View>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Few lines about you</Text>
            </View>
            <View>
              <CommonTextInput
                width={responsiveScreenWidth(60)}
                height={responsiveScreenHeight(12)}
                value={about}
                onChangeText={about => onHandleAbout(about)}
                multiline={true}
                placeholder="Min 30 words"
                textAlignVertical={'top'}
                numberOfLines={3}
                borderColor={colorConstant.bordercolor}
              />
              {aboutError ? (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{aboutError}</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>What best describes you</Text>
            </View>
            <View>
              <DropDownPicker
                items={[
                  {label: 'Designer', value: 'Designer'},
                  {label: 'Artist', value: 'Artist'},
                  {label: 'Developer', value: 'Developer'},
                  {label: 'Musician', value: 'Musician'},
                  {label: 'Athelete', value: 'Athelete'},
                ]}
                defaultValue={whatBest}
                containerStyle={styles.dropdownContainerWhatBest}
                style={styles.dropdown}
                itemStyle={{color: 'white'}}
                dropDownStyle={styles.dropdownList}
                onChangeItem={item => setWhatBest(item.value)}
                placeholder="What best describes you?"
                dropDownContainerStyle={{
                  color: 'white',
                  backgroundColor: colorConstant.backgroundBlack,
                }}
                listItemLabelStyle={{color: colorConstant.gray}}
                selectedItemLabelStyle={{color: 'white'}}
                customItemLabelStyle={{color: 'white'}}
                labelStyle={{color: 'white'}}
                open={openWhatBest}
                setOpen={setOpenWhatBest}
                value={whatBest}
                setValue={setWhatBest}
                scrollViewProps={{
                  maxHeight: 200,
                }}
                placeholderStyle={{
                  fontSize: 16,
                  color: colorConstant.gray,
                  fontFamily: fontConstant.regular,
                }}
                ArrowDownIconComponent={({style}) => (
                  <Image
                    source={imageConstant.arrow}
                    style={{
                      resizeMode: 'contain',
                      height: responsiveScreenHeight(3),
                      width: responsiveScreenWidth(5),
                    }}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Your portfolio link</Text>
            </View>
            <View>
              <CommonTextInput
                width={responsiveScreenWidth(60)}
                height={responsiveScreenHeight(6)}
                onChangeText={website => onHandleWebsite(website)}
                value={website}
                placeholder="Enter the Website"
                borderColor={colorConstant.bordercolor}
              />

              {websiteError ? (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{websiteError}</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Instagram Id</Text>
            </View>
            <View>
              <CommonTextInput
                width={responsiveScreenWidth(60)}
                height={responsiveScreenHeight(6)}
                onChangeText={text => onHandleInstagram(text)}
                value={instagramurl}
                placeholder="Instagram Id"
                borderColor={colorConstant.bordercolor}
              />

              {instagramurlError ? (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{instagramurlError}</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Behance Id</Text>
            </View>
            <View>
              <CommonTextInput
                width={responsiveScreenWidth(60)}
                height={responsiveScreenHeight(6)}
                onChangeText={text => onHandleBehance(text)}
                value={behanceurl}
                placeholder="Behance Id"
                borderColor={colorConstant.bordercolor}
              />

              {behanceurlError ? (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{behanceurlError}</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.row1}>
            <View style={styles.leftView}>
              <Text style={styles.leftText}>Pinterest Id</Text>
            </View>
            <View>
              <CommonTextInput
                width={responsiveScreenWidth(60)}
                height={responsiveScreenHeight(6)}
                onChangeText={text => onHandlePinterset(text)}
                value={pinteresturl}
                placeholder="Pinterest Id"
                borderColor={colorConstant.bordercolor}
              />

              {pinteresturlError ? (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{pinteresturlError}</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        <Modal
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={1000}
          animationOutTiming={1000}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          swipeDirection="down"
          visible={modalVisible}>
          <View style={styles.modalContainer}>
            <Text variant="titleMedium" style={styles.profileText}>
              Profile Photo
            </Text>

            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.cameraModalTouch}
                onPress={cameraCall}>
                <EvilIcons
                  name={'camera'}
                  size={40}
                  color={colorConstant.white}></EvilIcons>
                <Text variant="bodyMedium" style={styles.colorWhite}>
                  Camera
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cameraModalTouch}
                onPress={galleryCall}>
                <FontAwesome
                  name={'photo'}
                  size={28}
                  color={colorConstant.white}></FontAwesome>
                <Text variant="bodyMedium" style={styles.colorWhite}>
                  Gallery
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
