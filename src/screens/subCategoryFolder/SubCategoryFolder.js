import React, {useEffect} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {fontConstant, imageConstant} from '../../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import {userProfileDetails} from '../../redux/reducers/authSlice';

const SubCategoryFolder = ({route, navigation}) => {
  const {images, category} = route.params;
  const userProfileData = useSelector(state => state?.auth?.curretUser);
  const dispatch = useDispatch();
  const imageData = userProfileData?.post;
  const filterActivePost = imageData?.filter(e => e.active === 'Y');
  const filterActiveNewPost = filterActivePost?.filter(e => e.type === 'post');
  const filteredByCategory = filterActiveNewPost?.filter(
    post => post.category === category,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserDetails();
    });
    return unsubscribe;
  }, [navigation]);

  const getUserDetails = async () => {
    dispatch(userProfileDetails());
  };

  const groupedImagesBySubCategory = filteredByCategory.reduce(
    (groups, post) => {
      const subCategory = post.subCategory || '';

      if (!groups[subCategory]) {
        groups[subCategory] = [];
      }

      groups[subCategory].push(...post.images);
      return groups;
    },
    {},
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={imageConstant.whitearrow}
              style={styles.imagedimension}
            />
          </TouchableOpacity>
          <Text
            style={styles.categorytext}>
            {category}
          </Text>
          <View
            style={styles.imageselection}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ImageSelect', {
                  images: images,
                  category: category,
                })
              }>
              <Image source={imageConstant.selectionicon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Images */}
        <View
          style={styles.imageContainerSub}>
          {Object.entries(groupedImagesBySubCategory).map(
            ([subCategory, images], index) => (
              <View
                key={index}
                style={styles.imagemappingcontainer}>
                <TouchableOpacity
                  style={styles.imagemappingtouchable}
                  onPress={() => {
                    navigation.navigate('ImageMappingScreen', {
                      images: images.slice(0, 4), // Display only the first 4 images
                      category: subCategory, // Assuming you want to use subCategory as the category
                    });
                  }}>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {images.slice(0, 4).map((imageUrl, imageIndex) => (
                      <Image
                        key={imageIndex}
                        source={{uri: imageUrl}}
                        style={{
                          width:
                            images.length === 1
                              ? '98%'
                              : images.length === 2
                              ? '98%'
                              : '47%',
                          height:
                            images.length === 1
                              ? responsiveScreenHeight(18.5)
                              : images.length === 2
                              ? 70
                              : 70,
                          borderRadius: 8,
                          marginVertical: responsiveScreenHeight(0.3),
                          marginHorizontal: responsiveScreenWidth(0.5),
                        }}
                      />
                    ))}
                  </View>
                  {images.length > 4 && (
                    <View
                      style={styles.imagefour}>
                      <Text style={{color: 'white', fontSize: 16}}>
                        +{images.length - 4}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <Text
                  style={styles.subCategoryText}>
                  {subCategory}
                </Text>
              </View>
            ),
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubCategoryFolder;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: 'black'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenWidth(3),
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenWidth(3),
  },
  footer: {
    backgroundColor: 'black',
    height: responsiveScreenHeight(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagedimension:{
    width: responsiveScreenWidth(12),
    height: responsiveScreenHeight(10),
    marginTop: 10,
  },
  categorytext:{
    color: 'white',
    fontSize: responsiveScreenFontSize(2.3),
    fontFamily: fontConstant.medium,
  },
  imageselection:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  imageContainerSub:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  imagemappingcontainer:{
    width: '49%',
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  imagemappingtouchable:{
    width: '100%',
    backgroundColor: '#212121',
    borderRadius: 12,
    justifyContent: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  imagefour:{
    width: '100%',
    height: 40,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 8,
    right: -70,
  },
  subCategoryText:{
    color: 'white',
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2),
    marginLeft: responsiveScreenWidth(1),
  },
});
