import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorConstant} from '../utils/constant';

const CommonPlaceholder = () => {
  
  return (
    <SkeletonPlaceholder
      backgroundColor={colorConstant.backgroundBlack}
      highlightColor={colorConstant.bordercolor}
      speed={800}>
      <View style={styles.placeholderContainer}>
        {[1, 2, 3, 4, 5, 6].map(key => (
          <View key={key} style={styles.placeholderImage} />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default CommonPlaceholder;
const styles = StyleSheet.create({
  placeholderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    backgroundColor: 'red',
    width: responsiveScreenWidth(100),
    flexWrap: 'wrap',
  },
  placeholderImage: {
    width: responsiveScreenWidth(47),
    height: responsiveScreenHeight(30),
    borderRadius: 12,
    backgroundColor: '#E1E9EE', // Placeholder background color
    marginRight: 10,
    marginBottom: 10,
  },
  
});
