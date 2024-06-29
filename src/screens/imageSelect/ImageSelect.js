import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet
} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {imageConstant} from '../../utils/constant';
import CommonButton from '../../components/CommonButton';
import {useDispatch} from 'react-redux';
import {getDashboardPostAll} from '../../redux/reducers/authSlice';
import client from '../../utils/baseUrl';
import AutoHeightImage from 'react-native-auto-height-image';
import toastShow from '../../utils/Toast';
import styles from './Styles';
const ImageSelect = props => {
  const {images, type} = props.route?.params;
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [postIds, setPostIds] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false); 
  const [selectedTabData, setSelectedTabData] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getUserDetails();
    });
    return unsubscribe;
  }, [props.navigation]);

  const getUserDetails = () => {
    dispatch(getDashboardPostAll());
  };

  useEffect(() => {
    getUserDetails();
    getSelectedTabData();
    setRefreshFlag(false); 
  }, [postIds, refreshFlag]);

  useEffect(() => {
    getSelectedTabData();
  }, []);
  const getSelectedTabData = () => {
    client
      .get(`user/post/all?type=${type}&page=1&itemSize=10`)
      .then(res => {
        if (res?.status === 200) {
          setSelectedTabData(res?.data?.data);
        }
      })
      .catch(function (error) {});
  };
  const toggleImageSelection = index => {
    const selectedImage = images[index];
    const post = selectedTabData?.find(post =>
      post.images.includes(selectedImage),
    );

    if (selectedImages?.includes(index)) {
      setSelectedImages(prevSelected =>
        prevSelected?.filter(item => item !== index),
      );
      setPostIds(prevPostIds => prevPostIds?.filter(id => id !== post?.postId));
      setSelectAll(false);
    } else {
      setSelectedImages(prevSelected => [...prevSelected, index]);
      setPostIds(prevPostIds => [...prevPostIds, post?.postId]);
    }
  };

  const selectAllImages = () => {
    const allImageIndices = Array?.from({length: images?.length}, (_, i) => i);
    setSelectedImages(selectAll ? [] : allImageIndices);
    setSelectAll(!selectAll);
  };

  const selectedCount = selectedImages?.length;

  const handleDeletePost = () => {
    client
      .delete(`post/delete?postIds=${postIds}`)
      .then(res => {
        if (res?.status === 200) {
          setRefreshFlag(true);
          setDeleteModalVisible(false);
          toastShow(res.data.message,'green')
          props.navigation.replace('DrawerTabNavigation');
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack(null, {images: images})}>
            <Image source={imageConstant.crossnew} />
          </TouchableOpacity>
          <Text style={styles.text}>{`${selectedCount}/${images.length}`}</Text>
        </View>
        <TouchableOpacity style={styles.imgTouch} onPress={selectAllImages}>
          <Image source={imageConstant.selectallicon} />
          <Text style={styles.text}>
            {selectAll ? 'Unselect All' : 'Select All'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Images */}
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleImageSelection(index)}
              style={styles.mb10}>
              {/* Image */}
              <AutoHeightImage
                source={{uri: image}}
                width={responsiveScreenWidth(95)}
                borderRadius={18}></AutoHeightImage>

              {/* Selection Icon (tick) */}
              {selectedImages.includes(index) && (
                <View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image source={imageConstant.tick} style={styles.tickImg} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerView}>
          <TouchableOpacity
            style={styles.imgTouch}
            onPress={() => {
              props.navigation.navigate('Folders', {
                selectedImages: selectedImages,
                postIds: postIds,
              });
            }}>
            <Image source={imageConstant.moveicon} />
            <Text style={styles.text}>Move</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteTouch}
            onPress={() => setDeleteModalVisible(true)}>
            <Image source={imageConstant.deleteicon} />
            <Text style={styles.text}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setDeleteModalVisible(false)}
              style={styles.crossTouch}>
              <Image source={imageConstant.cross} />
            </TouchableOpacity>
            <Text style={styles.deleteText}>Delete</Text>
            <Text style={styles.text1}>
              Are you sure you want to delete this post?
            </Text>
            <CommonButton
              height={responsiveScreenHeight(5)}
              width={responsiveScreenWidth(35)}
              buttonTitle={'Delete'}
              fontSize={responsiveScreenFontSize(2.3)}
              onButtonPress={handleDeletePost}
              marginBottom={responsiveScreenHeight(8)}
              marginTop={responsiveScreenHeight(4)}
            />

            <View style={styles.lastView}></View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageSelect;

