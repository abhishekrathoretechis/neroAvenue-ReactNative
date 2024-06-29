import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {categoryList} from '../utils/arrayList';
import {colorConstant, fontConstant, imageConstant} from '../utils/constant';
import CommonButton from './CommonButton';
import toastShow from '../utils/Toast';

const ProfileSetupSelectCategory = props => {
  const [selectedItems, setSelectedItems] = useState([]);
  const tagTypesArray = selectedItems?.map(item => item?.tagType);

  const handlePressIconNew = icon => {
    const isSelected = selectedItems.some(item => item.key === icon.key);

    if (isSelected) {
      const updatedItems = selectedItems.filter(item => item.key !== icon.key);
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems(prevItems => [...prevItems, icon]);
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [props.navigation]);
 

  const handleNext = () => {
    if (tagTypesArray.length === 0) {
      toastShow('Select Category', 'red');
    } else {
      props.setInterestedCategories(tagTypesArray);
      props.swiperRef.current.scrollBy(1);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: colorConstant.black}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> props.swiperRef.current.scrollBy(-1)}>
          <Image source={imageConstant.whitearrow} style={styles.img1} />
        </TouchableOpacity>
        <Text style={styles.headerText}>What are you interested in?</Text>
      </View>
      <View style={styles.allicon}>
        {categoryList?.map(icon => (
          <View key={icon.key}>
            <TouchableOpacity
              style={styles.singleicon}
              onPress={() => {
                handlePressIconNew(icon);
              }}>
              <Image
                source={icon.image}
                style={[
                  selectedItems.some(item => item.key === icon.key)
                    ? {
                        tintColor: 'white',
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 5,
                      }
                    : {},
                ]}
              />

              <Text style={styles.inactiveText}>
                {`${icon.name}\n${icon.type}`}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View
        style={styles.button}>
        <CommonButton
          width={responsiveScreenWidth(90)}
          height={responsiveScreenHeight(6)}
          buttonTitle={'Next'}
          onButtonPress={handleNext}
        />
      </View>
    </View>
  );
};

export default ProfileSetupSelectCategory;

const styles = StyleSheet.create({
  button:{
    marginTop: responsiveScreenHeight(20.5),
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(6),
    alignSelf: 'center',
    zIndex: 100,
  },
  allicon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(100),
    alignSelf: 'center',
    marginTop: responsiveScreenHeight(2),
  },
  singleicon: {
    margin: 7,
    alignItems: 'center',
    width: responsiveScreenWidth(29),
    marginVertical: responsiveScreenHeight(2),
  },
  inactiveText: {
    color: '#979797',
    textAlign: 'center',
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(1.5),
    marginTop: responsiveScreenHeight(0.5),
    width: '100%',
  },
  activeText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(1.5),
    marginTop: responsiveScreenHeight(0.5),
    width: '100%',
  },
  iconset: {
    flexDirection: 'row',
    width: responsiveScreenWidth(100),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: responsiveScreenHeight(1),
  },
  headerText: {
    color: colorConstant.white,
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.3),
    fontFamily: fontConstant.medium,
  },
  img1: {
    resizeMode: 'contain',
    height: 70,
    width: 80,
    marginLeft: -10,
    marginBottom: -10,
  },
  header: {
    backgroundColor: colorConstant.backgroundBlack,
    alignItems: 'center',
    flexDirection: 'row',
    gap: responsiveScreenWidth(6),
    height: responsiveScreenHeight(7.5),
  },
});
