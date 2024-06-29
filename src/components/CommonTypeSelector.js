import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Swiper,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant, fontConstant, imageConstant} from '../utils/constant';

const CommonTypeSelector = ({
  valueType,
  openType,
  setOpenType,
  setValueType,
  
  valueTypeError,
  onHandleValueType,
}) => {
  return (
    <View style={styles.titlecontainer}>
      <Text
        style={{
          color: colorConstant.white,
          fontFamily: fontConstant.semibold,
          fontSize: 16,
        }}>
        Type
      </Text>
     
        <DropDownPicker
          items={[
            {
              label: 'Photography',
              value: 'Photography',
              icon: () => (
                <Image
                  source={imageConstant.neropic}
                  style={{width: 30, height: 20,resizeMode:'contain',}}
                />
              ),
            },
            {
              label: 'Digital Art',
              value: 'Digital Art',
              icon: () => (
                <Image
                  source={imageConstant.neroart}
                  style={{width: 30, height: 20,resizeMode:'contain'}}
                />
              ),
            },
            {
              label: 'Typography',
              value: 'Typography',
              icon: () => (
                <Image
                  source={imageConstant.nerotxt}
                  style={{width: 30, height: 20,resizeMode:'contain'}}
                />
              ),
            },
            {
              label: 'Motion Graphics',
              value: 'Motion Graphics',
              icon: () => (
                <Image
                  source={imageConstant.neromov}
                  style={{width: 30, height: 22,resizeMode:'contain'}}
                />
              ),
            },
            {
              label: '3D Art',
              value: '3D Art',
              icon: () => (
                <Image
                  source={imageConstant.nero3dx}
                  style={{width: 30, height: 22,resizeMode:'contain'}}
                />
              ),
            },
            {
              label: 'Fashion',
              value: 'Fashion',
              icon: () => (
                <Image
                  source={imageConstant.nerovog}
                  style={{width: 30, height: 22,resizeMode:'contain'}}
                />
              ),
            },
            {
              label: 'Architecture',
              value: 'Architecture',
              icon: () => (
                <Image
                  source={imageConstant.neroarc}
                  style={{width: 30, height: 22,resizeMode:'contain'}}
                />
              ),
            },
            {
              label: 'Product Design',
              value: 'Product Design',
              icon: () => (
                <Image
                  source={imageConstant.neroprd}
                  style={{width: 30, height: 22}}
                />
              ),
            },
            {
              label: 'Mobile Photography',
              value: 'Mobile Photography',
              icon: () => (
                <Image
                  source={imageConstant.neromob}
                  style={{width: 30, height: 22}}
                />
              ),
            },
            {
              label: 'Lifestyle',
              value: 'Lifestyle',
              icon: () => (
                <Image
                  source={imageConstant.nerolif}
                  style={{width: 30, height: 22}}
                />
              ),
            },
          ]}
          defaultValue={valueType}
          itemSeparator={() => (
            <View style={{height: 15}} /> // Adjust the height to create the desired gap
          )}
          containerStyle={styles.dropdownContainerType}
          style={styles.dropdown}
          itemStyle={{color: 'white',}}
          // dropDownStyle={styles.dropdownList}
          onChangeItem={(item) => {
            console.log(valueType); // This will log the selected item
            // You can perform other actions based on the selected item
          }}
        
          placeholder="Select Type"
          dropDownContainerStyle={{
            color: 'white',
            backgroundColor: colorConstant.backgroundBlack,
            maxHeight: 'auto',
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
            fontSize:responsiveScreenFontSize(2), // Adjust the font size as needed
            color: colorConstant.gray,
            fontFamily: fontConstant.regular, // Change the color of the placeholder text
          }}
          ArrowDownIconComponent={({style}) => (
            <Image
              source={imageConstant.arrow}
              style={{
                resizeMode: 'contain',
                height: responsiveScreenHeight(2),
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
      
    </View>
  );
};

export default CommonTypeSelector;
const styles = StyleSheet.create({
  titlecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(2),
    gap: responsiveScreenWidth(4),
    marginTop: responsiveScreenHeight(2),
    zIndex: 10,
  },
  errorView: {
    marginTop: '1%',
    marginLeft: '1%',
    marginBottom: '-2%',
  },
  errorText: {
    color: 'red',
    fontSize: responsiveScreenFontSize(1.7),
    fontFamily: fontConstant.regular,
  },
  dropdownContainerType: {
    width: responsiveScreenWidth(80),
    backgroundColor: colorConstant.backgroundBlack,
    marginLeft: -3,

    alignSelf: 'center',
    // marginTop: responsiveScreenHeight(1.5),
    zIndex: 270000,
    placeholderTextColor: colorConstant.placeholdercolor,
    outlineColor: colorConstant.bordercolor,
    activeOutlineColor: colorConstant.bordercolor,

    borderColor: colorConstant.bordercolor,
    borderWidth: 1.5,
    borderRadius: 5,

  },
  row1: {
    flexDirection: 'row',
    marginVertical: responsiveScreenHeight(0.2),
    alignSelf: 'center',
    alignItems: 'center',
    width: '95%',
    justifyContent: 'space-between',
  },

  dropdown: {
    backgroundColor: colorConstant.backgroundBlack,
    
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
