import {
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {categoryList} from '../../utils/arrayList';
import {imageConstant} from '../../utils/constant';
import CommonButton from '../../components/CommonButton';
import toastShow from '../../utils/Toast';
import {useSelector} from 'react-redux';
import styles from './Styles';
const Intereseted = props => {
  const [selectedItems, setSelectedItems] = useState([]);
  const tagTypesArray = selectedItems?.map(item => item?.tagType);
  const [selectTag, setSelectTag] = useState();
  const userProfileData = useSelector(state => state?.auth?.curretUser);
 
  useEffect(() => {
    if (userProfileData?.interested && userProfileData?.interested.length > 0) {
      const defaultSelectedInterests = userProfileData?.interested.map(
        item => item.interested,
      );

      const defaultSelectedItems = categoryList.filter(item =>
        defaultSelectedInterests.includes(item.tagType),
      );
      setSelectedItems(defaultSelectedItems);
    }

    const unsubscribe = props.navigation.addListener('focus', () => {});
    return unsubscribe;
  }, [props.navigation, userProfileData]);

  const handlePressIconNew = icon => {
    const isDefaultSelected = selectedItems.some(
      item => item.type === icon.type,
    );

    if (isDefaultSelected) {
      const updatedItems = selectedItems.filter(
        item => item.type !== icon.type,
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems(prevItems => [...prevItems, icon]);
    }
  };

  const handleNext = () => {
    if (tagTypesArray.length === 0) {
      toastShow('Select Intereset', 'red');
    } else {
      setSelectTag(tagTypesArray);
      props.navigation.navigate('EditProfile', {
        selectTag: tagTypesArray,
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
                    ? styles.imgIcon
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

      <View style={styles.button}>
        <CommonButton
          width={responsiveScreenWidth(90)}
          height={responsiveScreenHeight(6)}
          buttonTitle={'Submit'}
          onButtonPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default Intereseted;

