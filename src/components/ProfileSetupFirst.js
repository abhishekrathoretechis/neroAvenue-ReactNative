import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  getAllCountryName,
  putUserProfileSetupUsername,
} from '../redux/reducers/authSlice';
import {categoryList} from '../utils/arrayList';
import {colorConstant, fontConstant, imageConstant} from '../utils/constant';
import {DEFAULT_MESSAGE} from '../utils/message';
import CommonHeader from './CommonHeader';
import CommonTextInput from './CommonTextInput';
import toastShow from '../utils/Toast';
import CommonButton from './CommonButton';

export default function ProfileSetupFirst(props) {
  const dispatch = useDispatch();
  const getCountryData = useSelector(state => state?.auth?.getCountry);
  const [open, setOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [whatBest, setWhatBest] = useState('');

  const [openWhatBest, setOpenWhatBest] = useState(false);

  const [openInterest, setOpenInterest] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isCountryListVisible, setCountryListVisibility] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [genderValueError, setGenderValueError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateError, setSelectedDateError] = useState('');
  const [countryName, setCountryName] = useState('');
  const [countryNameError, setCountryNameError] = useState('');
  const [valueType, setValueType] = useState('');
  const [valueTypeError, setValueTypeError] = useState('');
  const [whatBestError, setWhatBestError] = useState('');

  const [valueInterest, setValueInterest] = useState([]);
  
  const [valueInterestError, setValueInterestError] = useState('');

  // const [withCountryNameButton, setWithCountryNameButton] = useState(true);
  const newArray = [];

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      handleCountries();
    });
    return unsubscribe;
  }, [props.navigation]);

  const handleCountries = () => {
    dispatch(getAllCountryName());
  };

  const handleCountrySelection = () => {
    setCountryListVisibility(!isCountryListVisible); // Toggles the visibility of the country list
  };
  for (var i = 0; i < getCountryData?.length; i++) {
    let obj = {
      label: getCountryData[i].name,
      value: getCountryData[i].name,
    };
    newArray.push(obj);
  }

  const handleCountrySelect = country => {
    setCountryName(country);
  };

  const handleGenderChange = itemValue => {
    if (itemValue.length !== 0) {
      setGenderValue(itemValue);
      setGenderValueError('');
    } else {
      setGenderValue('');
      setGenderValueError(DEFAULT_MESSAGE);
    }
  };

  const handleTypeChange = itemValue => {
    if (itemValue.length !== 0) {
      setValueType(itemValue);
      setValueTypeError('');
    } else {
      setValueType('');
      setValueTypeError(DEFAULT_MESSAGE);
    }
  };

  const handleBestChange = itemValue => {
    if (itemValue.length !== 0) {
      setWhatBest(itemValue);
      setWhatBestError('');
    } else {
      setWhatBest('');
      setWhatBestError(DEFAULT_MESSAGE);
    }
  };

  const onChnageCountryName = country => {
    if (country.length !== 0) {
      setCountryName(country.name);
      setCountryNameError('');
    } else {
      countryName('');
      countryNameError(DEFAULT_MESSAGE);
    }
    setCountryListVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const inputDate = new Date(date);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - inputDate.getFullYear();

    if (!isNaN(inputDate.getTime())) {
      const day = String(inputDate.getDate()).padStart(2, '0');
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const year = inputDate.getFullYear();

      const formattedDate = `${day}-${month}-${year}`;
      hideDatePicker();

      if (age < 13) {
        setSelectedDate(formattedDate);
        setSelectedDateError(
          'Sorry,  your age does not meet our compliance standards.',
        );
      } else {
        setSelectedDate(formattedDate);
        setSelectedDateError('');
      }
    } else {
      // Handle invalid date (date is empty or not a valid date)
      setSelectedDateError(DEFAULT_MESSAGE);
    }
  };

  const onChangeName = text => {
    if (text.length !== 0) {
      setName(text);
      setNameError('');
    } else {
      setName('');
      setNameError(DEFAULT_MESSAGE);
    }
  };
  const onChnageUserName = text => {
    if (text.length !== 0) {
      setUsername(text);
      setUsernameError('');
    } else {
      setUsername('');
      setUsernameError(DEFAULT_MESSAGE);
    }
  };

  // const onHandleValueInterest = item => {
  //   if (item.length === 0) {
  //     setValueInterest(item.value);
  //     setValueInterestError('');
  //   } else {
  //     setValueInterest('');
  //     setValueInterestError(DEFAULT_MESSAGE);
  //   }
  // };

  const handleNext = () => {
    if (
      name === '' ||
      username === '' ||
      valueType === '' ||
      genderValue === '' ||
      countryName === '' ||
      selectedDate === '' ||
      whatBest === ''
    ) {
      setNameError(name ? '' : DEFAULT_MESSAGE);
      setUsernameError(username ? '' : DEFAULT_MESSAGE);
      setValueTypeError(valueType ? '' : DEFAULT_MESSAGE);
      setWhatBestError(whatBest ? '' : DEFAULT_MESSAGE);

      setGenderValueError(genderValue ? '' : DEFAULT_MESSAGE);
      setCountryNameError(countryName ? '' : DEFAULT_MESSAGE);
      setSelectedDateError(selectedDate ? '' : DEFAULT_MESSAGE);
      // setValueInterestError(valueInterest.length > 0 ? '' : DEFAULT_MESSAGE);
    } else {
      const data = new FormData();
      data.append('username', username);
      data.append('name', name);
      data.append('email', props?.email);
      data.append('type', valueType);
      data.append('dob', selectedDate);
      data.append('gender', genderValue);
      data.append('country', countryName);
      data.append('best', whatBest);

      // props.setInterestedCategories(valueInterest);
      

      dispatch(putUserProfileSetupUsername(data)).then(async response => {
        console.log('response------->', response.payload);
        if (
          response.payload &&
          response.payload.status === 200 &&
          response.payload.message === 'User username updated successfully '
        ) {
          toastShow('Username updated successfully', 'lightgreen');
          props.swiperRef.current.scrollBy(1);
        } else if (
          response.payload &&
          response.payload.status === 406 &&
          response.payload.message ===
            `User with (${username}) is already exits!`
        ) {
          toastShow(
            'This username has been taken. Please try a different one.',
            'red',
          );
        }
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <CommonHeader headerTitle={'Profile set up'} />

      <Text variant="headlineMedium" style={styles.titleText}>
        Enter your details
      </Text>

      <CommonTextInput
        placeholder={'Enter your full name'}
        width={responsiveScreenWidth(90)}
        onChangeText={text => onChangeName(text)}
        value={name}
        borderColor={colorConstant.bordercolor}
      />
      {nameError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{nameError}</Text>
        </View>
      ) : null}

      <CommonTextInput
        placeholder={'User name'}
        width={responsiveScreenWidth(90)}
        onChangeText={text => {
          onChnageUserName(text);
        }}
        value={username}
        borderColor={colorConstant.bordercolor}
      />
      {usernameError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{usernameError}</Text>
        </View>
      ) : null}

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
        onChangeItem={item => handleBestChange(item.value)}
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
          maxHeight: 200, // Set the maximum height for the dropdown
        }}
        placeholderStyle={{
          // Style for the placeholder
          fontSize: 16, // Adjust the font size as needed
          color: colorConstant.gray,
          fontFamily: fontConstant.regular, // Change the color of the placeholder text
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

      {whatBestError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{whatBestError}</Text>
        </View>
      ) : null}

     

      <DropDownPicker
        items={[
          {label: 'Individual', value: 'Individual'},
          {label: 'Business', value: 'Business'},
        ]}
        defaultValue={valueType}
        containerStyle={styles.dropdownContainerType}
        style={styles.dropdown}
        itemStyle={{color: 'white'}}
        dropDownStyle={styles.dropdownList}
        onChangeItem={item => handleTypeChange(item.value)}
        placeholder="Type"
        dropDownContainerStyle={{
          color: 'white',
          backgroundColor: colorConstant.backgroundBlack,
        }}
        listItemLabelStyle={{color: colorConstant.gray}}
        selectedItemLabelStyle={{color: 'white'}}
        customItemLabelStyle={{color: 'white'}}
        labelStyle={{color: 'white'}}
        open={openType}
        setOpen={setOpenType}
        value={valueType}
        setValue={setValueType}
        placeholderStyle={{
          // Style for the placeholder
          fontSize: 16, // Adjust the font size as needed
          color: colorConstant.gray,
          fontFamily: fontConstant.regular, // Change the color of the placeholder text
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

      {valueTypeError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{valueTypeError}</Text>
        </View>
      ) : null}

      <DropDownPicker
        items={[
          {label: 'Male', value: 'Male'},
          {label: 'Female', value: 'Female'},
          {label: 'Other', value: 'Other'},
        ]}
        defaultValue={genderValue}
        containerStyle={styles.dropdownContainerGender}
        style={styles.dropdown}
        itemStyle={{color: 'white'}}
        dropDownStyle={styles.dropdownList}
        onChangeItem={item => handleGenderChange(item.value)}
        placeholder="Select Gender"
        dropDownContainerStyle={{
          color: 'white',
          backgroundColor: colorConstant.backgroundBlack,
        }}
        listItemLabelStyle={{color: colorConstant.gray}}
        selectedItemLabelStyle={{color: 'white'}}
        customItemLabelStyle={{color: 'white'}}
        labelStyle={{color: 'white'}}
        open={open}
        setOpen={setOpen}
        value={genderValue}
        setValue={setGenderValue}
        placeholderStyle={{
          // Style for the placeholder
          fontSize: 16, // Adjust the font size as needed
          color: colorConstant.gray,
          fontFamily: fontConstant.regular, // Change the color of the placeholder text
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

      {genderValueError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{genderValueError}</Text>
        </View>
      ) : null}

      <View style={styles.calenderContainer}>
        <TextInput
          placeholder="Date of birth"
          placeholderTextColor={colorConstant.placeholdercolor}
          style={styles.dobText}
          value={selectedDate}
          onChangeText={text => setSelectedDate(text)}
        />

        <TouchableOpacity onPress={showDatePicker}>
          <Image source={imageConstant.calender} style={styles.calenderImg} />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
      {selectedDateError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{selectedDateError}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        onPress={handleCountrySelection}
        activeOpacity={0.9}
        style={styles.countrycontainer}>
        {countryName === '' ? ( // Render when country is not selected
          <Text style={styles.selectCountryButton}>Select Country</Text>
        ) : (
          // Render when country is selected
          <Text
            style={styles.selectedCountryText}
            onPress={handleCountrySelection}>
            {countryName}
          </Text>
        )}
        <Image
          source={imageConstant.arrow}
          style={{
            resizeMode: 'contain',
            marginRight: 10,
            height: responsiveScreenHeight(3),
            width: responsiveScreenWidth(5),
          }}
        />

        {isCountryListVisible && (
          <CountryPicker
            onSelect={country => {
              onChnageCountryName(country);
            }}
            onClose={() => {
              setCountryListVisibility(false);
            }}
            visible={isCountryListVisible}
            translation="eng"
            theme={DARK_THEME}
            withFilter={true}
            filterPlaceholder="Search Country" // Placeholder for the search input
            filterPlaceholderTextColor={colorConstant.gray} // Placeholder text color
          />
        )}
      </TouchableOpacity>

      {countryNameError ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{countryNameError}</Text>
        </View>
      ) : null}

      <View
        style={{
          // position: 'absolute',
          marginTop: responsiveScreenHeight(10),
          width: responsiveScreenWidth(90),
          height: responsiveScreenHeight(6),
          alignSelf: 'center',
          zIndex: 100,
          // marginBottom: responsiveScreenHeight(1),
        }}>
        <CommonButton
          width={responsiveScreenWidth(90)}
          height={responsiveScreenHeight(6)}
          buttonTitle={'Next'}
          onButtonPress={handleNext}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    zIndex: 1,
  },
  errorView: {
    marginTop: '1%',
    marginLeft: '5%',
    marginBottom: '-2%',
  },
  errorText: {
    color: 'red',
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: fontConstant.regular,
  },
  titleText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontSize: responsiveFontSize(3),
    marginTop: responsiveScreenHeight(1.5),
    marginBottom: responsiveScreenHeight(1),
    fontFamily: fontConstant.medium,
  },
  calenderContainer: {
    backgroundColor: colorConstant.backgroundBlack,
    alignSelf: 'center',
    // backgroundColor: colorConstant.backgroundBlack,
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(6.5),
    borderColor: colorConstant.bordercolor,
    borderWidth: 1,
    marginTop: responsiveScreenHeight(1.5),
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  dobText: {
    marginLeft: responsiveScreenWidth(2),
    width: responsiveScreenWidth(70),
    alignSelf: 'center',
    fontSize: responsiveScreenWidth(4),
    color: colorConstant.white,
  },
  calenderImg: {
    resizeMode: 'contain',
    width: responsiveScreenWidth(7.5),
    height: responsiveScreenHeight(4),
    marginRight: responsiveScreenWidth(2),
  },
  dropdownContainer: {
    width: responsiveScreenWidth(90),
    alignSelf: 'center',
    marginTop: responsiveScreenHeight(1.5),
    zIndex: 300000,
    placeholderTextColor: colorConstant.placeholdercolor,
    outlineColor: colorConstant.bordercolor,
    activeOutlineColor: colorConstant.bordercolor,
    textColor: colorConstant.white,
    borderColor: colorConstant.bordercolor,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  dropdownContainerGender: {
    width: responsiveScreenWidth(90),
    alignSelf: 'center',
    marginTop: responsiveScreenHeight(1.5),
    zIndex: 250000,
    placeholderTextColor: colorConstant.placeholdercolor,
    outlineColor: colorConstant.bordercolor,
    activeOutlineColor: colorConstant.bordercolor,
    textColor: colorConstant.white,
    borderColor: colorConstant.bordercolor,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  dropDownCountry: {
    width: responsiveScreenWidth(90),
    alignSelf: 'center',
    marginTop: responsiveScreenHeight(1.5),
    zIndex: 500,
    placeholderTextColor: colorConstant.placeholdercolor,
    outlineColor: colorConstant.bordercolor,
    activeOutlineColor: colorConstant.bordercolor,
    textColor: colorConstant.white,
    borderColor: colorConstant.bordercolor,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  dropdown: {
    backgroundColor: colorConstant.backgroundBlack,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
    backgroundColor: 'red',
    color: 'red',
  },
  dropdownList: {
    maxHeight: responsiveScreenHeight(20),
  },
  selectCountryButton: {
    color: colorConstant.placeholdercolor,
    width: responsiveScreenWidth(70),
    fontSize: responsiveFontSize(2),
    fontFamily: fontConstant.regular,
  },
  selectedCountryText: {
    color: colorConstant.white,

    width: responsiveScreenWidth(70),
    fontSize: responsiveFontSize(2),
    fontFamily: fontConstant.regular,
  },
  countrycontainer: {
    backgroundColor: colorConstant.black,
    alignSelf: 'center',
    backgroundColor: colorConstant.backgroundBlack,
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(6.5),
    borderColor: colorConstant.bordercolor,
    borderWidth: 1,
    marginTop: responsiveScreenHeight(1.5),
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    paddingLeft: responsiveScreenWidth(2.5),
  },
  dropdownContainerType: {
    width: responsiveScreenWidth(90),
    alignSelf: 'center',
    marginTop: responsiveScreenHeight(1.5),
    zIndex: 260000,
    placeholderTextColor: colorConstant.placeholdercolor,
    outlineColor: colorConstant.bordercolor,
    activeOutlineColor: colorConstant.bordercolor,
    textColor: colorConstant.white,
    borderColor: colorConstant.bordercolor,
    borderWidth: 1.5,
    borderRadius: 5,
    row1: {
      flexDirection: 'row',
      marginVertical: responsiveScreenHeight(0.2),
      alignSelf: 'center',
      alignItems: 'center',
      width: '95%',
      justifyContent: 'space-between',
    },
  },
  dropdownContainerWhatBest: {
    width: responsiveScreenWidth(90),
    alignSelf: 'center',
    marginTop: responsiveScreenHeight(1.5),
    zIndex: 310000,
    placeholderTextColor: colorConstant.placeholdercolor,
    outlineColor: colorConstant.bordercolor,
    activeOutlineColor: colorConstant.bordercolor,
    textColor: colorConstant.white,
    borderColor: colorConstant.bordercolor,
    borderWidth: 1.5,
    borderRadius: 5,
    row1: {
      flexDirection: 'row',
      marginVertical: responsiveScreenHeight(0.2),
      alignSelf: 'center',
      alignItems: 'center',
      width: '95%',
      justifyContent: 'space-between',
    },
  },
});
