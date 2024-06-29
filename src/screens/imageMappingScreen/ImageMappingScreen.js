import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {imageConstant} from '../../utils/constant';
import client from '../../utils/baseUrl';
import AutoHeightImage from 'react-native-auto-height-image';
import styles from './Styles';
const ImageMappingScreen = ({route, navigation}) => {
  const {images, category} = route.params;
  const [selectedTabData, setSelectedTabData] = useState([]);
  const filterActiveNewPost = selectedTabData?.filter(e => e.type === 'post');
  const [selectedImages, setSelectedImages] = useState([]);
  const [type, setType] = useState('post');
  useEffect(() => {
    getSelectedTabData();
  }, []);
  const getSelectedTabData = () => {
    client
      .get(`user/post/all?type=post&page=1&itemSize=10`)
      .then(res => {
        if (res?.status === 200) {
          setSelectedTabData(res?.data?.data);
        }
      })
      .catch(function (error) {});
  };

  const toggleImageSelection = index => {
    const matchedIds = [];
    const selectedImage = images[index];

    const selectedPost = filterActiveNewPost?.find(post =>
      post?.images?.includes(selectedImage),
    );

    if (selectedImages?.includes(index)) {
      setSelectedImages(prevSelected =>
        prevSelected?.filter(item => item !== index),
      );
    } else {
      setSelectedImages(prevSelected => [...prevSelected, index]);
    }

    // Logic to handle matchedIds and navigation
    filterActiveNewPost?.forEach(post => {
      post?.images?.forEach(image => {
        if (images?.includes(image)) {
          matchedIds?.push(post.id);
        }
      });
    });

    navigation.navigate('ProfileDetails', {
      postDetails: selectedPost?.postId,
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={imageConstant.whitearrow} style={styles.headerImg} />
        </TouchableOpacity>
        <Text style={styles.categoryText}>
          {category === 'Add subcategory' ? '' : category}
        </Text>
        <View style={styles.rightImg}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ImageSelect', {
                images: images,
                type: type,
              })
            }>
            <Image source={imageConstant.selectionicon} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {/* Images */}
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleImageSelection(index)}
              style={{
                marginBottom: 10,
              }}>
              {/* Image */}
              <AutoHeightImage
                source={{uri: image}}
                width={responsiveScreenWidth(95)}
                borderRadius={18}></AutoHeightImage>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImageMappingScreen;
