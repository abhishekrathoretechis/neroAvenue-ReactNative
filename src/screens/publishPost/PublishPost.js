import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Swiper from 'react-native-swiper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import CommonButton from '../../components/CommonButton';
import CommonTextInput from '../../components/CommonTextInput';
import NewHeader from '../../components/NewHeader';
import {
  createAllPost,
  createTagsPost,
  getAllTags,
  getUsernameFollowers,
} from '../../redux/reducers/authSlice';

import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {DEFAULT_MESSAGE, VALID_IMAGE} from '../../utils/message';
import {defaultSelectedCategory} from '../../utils/objects';
import CommonTitleInput from '../../components/CommonTitleInput';
import CommonTypeSelector from '../../components/CommonTypeSelector';
import CommonTagsSelect from '../../components/CommonTagsSelect';
import Icon from 'react-native-vector-icons/AntDesign';
import {giveCredit} from '../../redux/reducers/authSlice';

const PublishPost = (props, {route}) => {
  const dispatch = useDispatch();
  const usernameData = useSelector(state => state?.auth?.usernameFollowers);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagsError, setTagsError] = useState('');
  const [followerError, setFollowerError] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [tagsModalVisible, setTagsModalVisible] = useState(false);
  const [followerModalVisible, setFollowerModalVisible] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false);
  const [showNotApproveModal, setShowNotApproveModal] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState('');
  const [selected, setSelected] = useState('neroPic');
  const [tagType, setTagType] = useState('PIC');
  const swiperRef = useRef(null);
  const [imageInfo, setImageInfo] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchFollowerText, setSearchFollowerText] = useState('');

  const [filteredTags, setFilteredTags] = useState([]);
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const [imagePath, setImagePath] = useState();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFollowers, setSelectedFollowers] = useState([]);
  const [openType, setOpenType] = useState(false);
  const [valueType, setValueType] = useState('');

  const [valueTypeError, setValueTypeError] = useState('');
  const [tagNames, setTagNames] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      handlePressIcon(defaultSelectedCategory);
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    handleGetTags();
    getUserNameData();
  }, [tagType]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      handleGetTags();
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchText, valueType]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      getUserNameData();
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchFollowerText]);

  const getUserNameData = () => {
    dispatch(getUsernameFollowers()).then(response => {
      if (response.meta.requestStatus === 'fulfilled') {
        const FollowerList = response?.payload;

        // Separate selected and unselected tags
        const selectedFollowersList = FollowerList?.filter(follower =>
          selectedFollowers?.some(
            selectedFollower =>
              selectedFollower?.username === follower?.username,
          ),
        );

        const unselectedFollowersList = FollowerList?.filter(
          follower =>
            !selectedFollowers?.some(
              selectedFollower =>
                selectedFollower?.username === follower?.username,
            ),
        );

        // Filter unselected tags based on search text
        const filteredUnselectedFollowersList = unselectedFollowersList?.filter(
          follower =>
            follower?.username
              ?.toLowerCase()
              ?.includes(searchFollowerText?.toLowerCase()),
        );

        // Combine selected and filtered unselected tags for rendering
        const combinedFollowerList = selectedFollowersList?.concat(
          filteredUnselectedFollowersList,
        );

        setFilteredFollowers(combinedFollowerList);
      }
    });
  };

  const handleModel = () => {
    if (selected !== 'neroMov') {
      setModalVisible(!modalVisible);
    } else {
      videoCall();
    }
  };

  const getCodeForTag = tag => {
    switch (tag) {
      case 'Photography':
        return 'PIC';
      case 'Digital Art':
        return 'ART';
      case 'Typography':
        return 'TXT';
      case 'Motion Graphics':
        return 'MOV';
      case '3D Art':
        return '3DX';
      case 'Fashion':
        return 'VOG';
      case 'Architecture':
        return 'ARC';
      case 'Product Design':
        return 'PRD';
      case 'Mobile Photography':
        return 'MOB';
      case 'Lifestyle':
        return 'LIF';
      default:
        return '';
    }
  };

  const toggleTagSelection = tag => {
    const isSelected = selectedTags.some(
      selectedTag => selectedTag.tagNames === tag.tagNames,
    );

    if (isSelected) {
      // If the tag is already selected, remove it from selectedTags
      setSelectedTags(
        selectedTags.filter(
          selectedTag => selectedTag.tagNames !== tag.tagNames,
        ),
      );
    } else {
      // If the tag is not selected, add it to selectedTags
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleFollowerSelection = follower => {
    const isSelected = selectedFollowers.some(
      selectedFollower => selectedFollower.username === follower.username,
    );

    if (isSelected) {
      // If the tag is already selected, remove it from selectedTags
      setSelectedFollowers(
        selectedFollowers.filter(
          selectedFollower => selectedFollower.username !== follower.username,
        ),
      );
    } else {
      // If the tag is not selected, add it to selectedTags
      setSelectedFollowers([...selectedFollowers, follower]);
    }
  };

  const finalFollowers = filteredFollowers?.map(follower => ({
    ...follower,
    isSelected: selectedFollowers?.some(
      selectedFollower => selectedFollower.username === follower.username,
    ),
  }));

  const finalTags = filteredTags?.map(tag => ({
    ...tag,
    isSelected: selectedTags?.some(
      selectedTag => selectedTag.tagNames === tag.tagNames,
    ),
  }));

  const selectedFollowersList = finalFollowers?.filter(
    follower => follower.isSelected,
  );

  const filteredData = finalFollowers.filter(item => item.isSelected);
  const modifiedData = filteredData.map(({isSelected, ...rest}) => rest);

  const unselectedFollowersList = finalFollowers?.filter(
    follower => !follower.isSelected,
  );

  // Separate selected and unselected tags
  const selectedTagsList = finalTags?.filter(tag => tag.isSelected);
  const unselectedTagsList = finalTags?.filter(tag => !tag.isSelected);

  // Assuming you want to update the state on some event (e.g., button click)
  const handleUpdateTagNames = () => {
    const extractedTagNames = selectedTags?.map(tag => tag.tagNames);
    setTagNames(extractedTagNames);
  };

  const handleUpdateFollowerNames = () => {
    const extractedTagNames = selectedFollowers?.map(
      follower => follower.username,
    );
    setFollowers(extractedTagNames);
  };

  const handleGetTags = () => {
    dispatch(getAllTags(getCodeForTag(valueType))).then(response => {
      if (response.meta.requestStatus === 'fulfilled') {
        const tagList = response?.payload;

        // Separate selected and unselected tags
        const selectedTagsList = tagList?.filter(tag =>
          selectedTags?.some(
            selectedTag => selectedTag?.tagNames === tag?.tagNames,
          ),
        );

        const unselectedTagsList = tagList?.filter(
          tag =>
            !selectedTags?.some(
              selectedTag => selectedTag?.tagNames === tag?.tagNames,
            ),
        );

        // Filter unselected tags based on search text
        const filteredUnselectedTagsList = unselectedTagsList?.filter(tag =>
          tag?.tagNames?.toLowerCase()?.includes(searchText?.toLowerCase()),
        );

        // Combine selected and filtered unselected tags for rendering
        const combinedTagsList = selectedTagsList?.concat(
          filteredUnselectedTagsList,
        );

        setFilteredTags(combinedTagsList);
      }
    });
  };

  const galleryCall = () => {
    try {
      ImagePicker.openPicker({
        multiple: true,
        cropping: true,
      }).then(selectedImages => {
        if (selectedImages && selectedImages.length > 0) {
          const firstImage = selectedImages[0];
          const imageFormat = firstImage.mime;
          const imageDimensions = {
            width: firstImage.width,
            height: firstImage.height,
          };
          const resolution = imageDimensions.width * imageDimensions.height;

          setImages(selectedImages.map(image => image.path));
          setImageInfo([firstImage]);
          setImagesError('');
          handleModel();
        } else {
          console.log('No images selected');
          setImagesError(DEFAULT_MESSAGE);
          setImages('');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cameraCall = () => {
    try {
      ImagePicker.openCamera({
        width: responsiveScreenWidth(47),
        height: responsiveScreenHeight(30),
        cropping: true,
      }).then(image => {
        // Extract image format (mime type)
        const imageFormat = image.mime;

        // Extract image dimensions
        const imageDimensions = {
          width: image.width,
          height: image.height,
        };

        // Calculate resolution
        const resolution = imageDimensions.width * imageDimensions.height;

        // Update the state with the selected image path
        if (image.path !== '') {
          setImages([image.path]);
          setImagesError('');
        } else {
          setImages('');
          setImagesError(DEFAULT_MESSAGE);
        }

        // Update the imageInfo state
        setImageInfo([image]);
        // Handle modal visibility
        handleModel();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const videoCall = () => {
    try {
      ImagePicker.openPicker({
        mediaType: 'video',
      }).then(video => {
        if (video.path !== '') {
          setImages([video.path]);
          setImagesError('');
        } else {
          setImages('');
          setImagesError(DEFAULT_MESSAGE);
        }

        // Update the imageInfo state
        setImageInfo([video]);
      });
    } catch (error) {}
  };

  const handleGiveCredit = id => {
    const creditData = {
      credit: modifiedData,
    };
    const data = {id, creditData};

    dispatch(giveCredit(data));
  };

  const onHandlePublish = () => {
    const createTagData = {tagType, tagNames: tags};
    dispatch(createTagsPost(createTagData)).then(tagResponse => {
      if (tagResponse.meta.requestStatus === 'fulfilled') {
        if (images && title && tags && valueType) {
          const imageArray = images;
          const data = new FormData();

          // Loop through the imageArray and append each image to FormData
          imageArray.forEach((imageUrl, index) => {
            const lastDotIndex = imageUrl.lastIndexOf('.');

            // Get the filename without extension
            const filenameWithoutExtension = imageUrl.substring(
              imageUrl.lastIndexOf('/') + 1,
              lastDotIndex,
            );
            // Get the file extension
            const fileExtension = imageUrl.substring(lastDotIndex + 1);
            data.append(`images`, {
              uri:
                Platform.OS === 'ios'
                  ? imageUrl?.replace('file://', '')
                  : imageUrl,
              name: filenameWithoutExtension,
              type: 'image/' + fileExtension,
            });
          });

          data.append('title', title);
          data.append('location', 'india');
          data.append('category', valueType);
          data.append('tags', tagNames);
          // data.append('credit', selectedUsernames.map(username => `@${username}`));

          dispatch(createAllPost(data)).then(response => {
            if (
              response.meta.requestStatus === 'fulfilled' &&
              response.payload.status === 201
            ) {
              handleGiveCredit(response.payload.data.id);

              if (response.payload.data.status === 'Y') {
                props.navigation.replace('DrawerTabNavigation');
              } else if (response.payload.data.status === 'N') {
                setShowNotApproveModal(true);
              }
            }
          });
        } else {
          setImagesError(images.length > 0 ? '' : VALID_IMAGE);
          setTitleError(title ? '' : DEFAULT_MESSAGE);
          // setDescriptionError(description ? '' : DEFAULT_MESSAGE);
          setTagsError(tagNames.length > 0 ? '' : DEFAULT_MESSAGE);
          setFollowerError(followers.length > 0 ? '' : DEFAULT_MESSAGE);

          setValueTypeError(valueType.length > 0 ? '' : DEFAULT_MESSAGE);
        }
      }
    });
  };

  const handleTagsModal = () => {
    handleUpdateTagNames();
    setTagsModalVisible(false);
  };

  const handleFollowerModal = () => {
    handleUpdateFollowerNames();
    setFollowerModalVisible(false);
  };

  const maxCharacters = 20;

  let currentCharacterCount = 0;

  const renderedItems = tagNames?.map((tagName, index) => {
    if (currentCharacterCount + tagName.length <= maxCharacters) {
      currentCharacterCount += tagName.length;
      return (
        <View
          style={{
            padding: responsiveScreenWidth(1),
            backgroundColor: colorConstant.black,
            borderRadius: 8,
            paddingHorizontal: responsiveScreenWidth(3),
          }}>
          <Text key={index} style={{color: 'white'}}>
            {tagName}
          </Text>
        </View>
      );
    }

    return null; // Exclude items that exceed the character limit
  });

  // Calculate the number of remaining items
  const remainingItemsCount =
    tagNames.length - renderedItems?.filter(item => item !== null).length;

  // If there are remaining items, add a "+ (number of remaining items) more" message
  if (remainingItemsCount > 0) {
    renderedItems?.push(
      <Text key={renderedItems.length} style={{color: 'white'}}>
        +{remainingItemsCount} more
      </Text>,
    );
  }
  const findUserIdByUsername = (data, usernameToFind) => {
    const user = data.find(user => user.username === usernameToFind);
    return user ? user.userId : null;
  };

  const maxFollowerCharacters = 40;

  const renderedFollowerItems = followers?.map((follower, index) => {
    const userId = findUserIdByUsername(usernameData, follower);
    if (currentCharacterCount + follower.length <= maxFollowerCharacters) {
      currentCharacterCount += follower.length;
      return (
        <View
          style={{
            padding: responsiveScreenWidth(1),
            backgroundColor: colorConstant.black,
            borderRadius: 8,
            paddingHorizontal: responsiveScreenWidth(3),
          }}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('OtherProfileView', {
                IdDetails: userId,
              })
            }>
            <Text key={index} style={{color: 'white'}}>
              {follower}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null; // Exclude items that exceed the character limit
  });

  // Calculate the number of remaining items
  const remainingFollowerItemsCount =
    followers?.length -
    renderedFollowerItems?.filter(item => item !== null).length;

  // If there are remaining items, add a "+ (number of remaining items) more" message
  if (remainingFollowerItemsCount > 0) {
    renderedFollowerItems?.push(
      <Text key={renderedItems?.length} style={{color: 'white'}}>
        +{remainingFollowerItemsCount} more
      </Text>,
    );
  }

  const addMoreImages = () => {
    try {
      ImagePicker.openPicker({
        multiple: true,
        cropping: true,
      }).then(selectedImages => {
        if (selectedImages && selectedImages.length > 0) {
          // Update the state with the new images

          setImages(prevImages => [
            ...prevImages,
            ...selectedImages.map(image => image.path),
          ]);

          // You can also update other image information if needed
          setImageInfo(prevImageInfo => [...prevImageInfo, ...selectedImages]);

          // Optionally, you can perform any other actions needed after adding images
          setModalVisible(false);
        } else {
          console.log('No images selected');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeImage = index => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setModalVisible(false); // Optionally, perform any other actions needed after removing the image  };
  };

  const onHandleTitle = text => {
    if (text.length !== 0) {
      setTitle(text);
      setTitleError('');
    } else {
      setTitle('');
      setTitleError(DEFAULT_MESSAGE);
    }
  };

  const onHandleValueType = item => {
    if (item.length != 0) {
      setValueType(item);
      setValueTypeError('');
    } else {
      setValueType('');
      setValueTypeError(DEFAULT_MESSAGE);
    }
  };

  const handlePressIcon = icon => {
    setSelected(icon.key);
    setTagType(icon.tagType);
    setSelectedIcon(icon);
  };
  return (
    <ScrollView style={styles.maincontainer}>
      <NewHeader
        navigation={props.navigation}
        title={'Publish'}
        rightImage={false}
      />

      <View style={styles.centerContainer}>
        {images.length === 0 ? (
          <View>
            <Image source={imageConstant.publish} style={styles.publishImg} />
            <View style={styles.rowTextContainer}>
              <TouchableOpacity onPress={handleModel}>
                <Text style={styles.clickText}>Click here</Text>
              </TouchableOpacity>
              <Text style={styles.centerText}> to select from the folder</Text>
            </View>
          </View>
        ) : images.length === 1 ? (
          <View style={styles.imageselect}>
            <TouchableOpacity
              style={styles.imageselecttouchable}
              onPress={() => setShowImageModal(true)}>
              <Image source={{uri: images[0]}} style={styles.publishImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imagetouchabledimension}
              onPress={() => removeImage(0)}>
              <Image
                source={imageConstant.Close}
                style={styles.imagedimension}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={addMoreImages}
              style={styles.addMoreImagesTouchable}>
              <Image
                source={imageConstant.plus}
                style={{width: 35, height: 35}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.addMoreContainer}>
            <Swiper
              loop={false}
              showsButtons={true}
              showsPagination={false}
              ref={swiperRef}>
              {images?.map((imagePath, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setShowImageModal(true);
                    setImagePath(imagePath);
                  }}
                  style={styles.imageswipertouchable}>
                  <Image
                    key={index}
                    source={{uri: imagePath}}
                    style={styles.publishImg}
                  />
                  <TouchableOpacity
                    style={styles.imagetouchabledimension}
                    onPress={() => removeImage(index)}>
                    <Image
                      source={imageConstant.Close}
                      style={styles.imagetouchabledimensionnew}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </Swiper>
            <TouchableOpacity
              onPress={addMoreImages}
              style={styles.addMoreImagesTouchable}>
              <Image
                source={imageConstant.plus}
                style={{width: 35, height: 35}}
              />
            </TouchableOpacity>
          </View>
        )}

        {imagesError ? (
          <View style={[styles.errorView, {alignSelf: 'center'}]}>
            <Text style={styles.errorText}>{imagesError}</Text>
          </View>
        ) : null}
      </View>

      <CommonTitleInput
        onHandleTitle={onHandleTitle}
        title={title}
        titleError={titleError}
      />

      <CommonTypeSelector
        valueType={valueType}
        openType={openType}
        setOpenType={setOpenType}
        setValueType={setValueType}
        onHandleValueType={onHandleValueType}
        valueTypeError={valueTypeError}
      />

      <CommonTagsSelect
        selected={selected}
        setTagsModalVisible={setTagsModalVisible}
        renderedItems={renderedItems}
        tagsError={tagsError}
        tagNames={tagNames}
      />
      <View style={styles.sharemore}>
        <Text style={styles.headText}>Share a note about your work</Text>
        <View>
          <CommonTextInput
            multiline={true}
            placeholder="Maximum Limit: 30 words  "
            width={responsiveScreenWidth(95)}
            height={responsiveScreenHeight(16)}
            textAlignVertical={'top'}
            numberOfLines={4}
            marginTop={responsiveScreenHeight(0.5)}
            maxLength={30}
            borderColor={colorConstant.bordercolor}
            onChangeText={text => setDescription(text)}
            value={description}
          />
        </View>
      </View>
      <View style={styles.sharemore}>
        <Text style={styles.headText}>Give credits to your team</Text>

        <TouchableOpacity
          style={styles.textinputnew}
          activeOpacity={0.8}
          onPress={() => {
            setFollowerModalVisible(true);
          }}>
          <View style={styles.giveCreditMainContainer}>
            <View style={styles.giveCreditContainer}>
              {renderedFollowerItems.length > 0 ? (
                renderedFollowerItems
              ) : (
                // Placeholder text when there are no items
                <Text
                  style={{
                    color: colorConstant.placeholdercolor,
                    fontSize: responsiveScreenFontSize(2),
                  }}>
                  Search and tag the contributors
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setFollowerModalVisible(true);
            }}>
            <Icon name={'right'} size={19} style={{color: 'white'}} />
          </TouchableOpacity>
        </TouchableOpacity>

        {followerError ? (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>{followerError}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.publishbuttoncontainer}>
        <CommonButton
          height={responsiveScreenHeight(5)}
          width={responsiveScreenWidth(40)}
          buttonTitle={'Publish'}
          fontSize={responsiveScreenFontSize(2.3)}
          onButtonPress={onHandlePublish}
        />
      </View>

      {/* select image modal */}
      <Modal
        animationIn="slideInDown"
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
          <View style={styles.modalrowContainer}>
            <TouchableOpacity
              style={{width: responsiveScreenWidth(20), alignItems: 'center'}}
              onPress={cameraCall}>
              <EvilIcons
                name={'camera'}
                size={40}
                color={colorConstant.white}></EvilIcons>
              <Text variant="bodyMedium" style={{color: colorConstant.white}}>
                Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: responsiveScreenWidth(20), alignItems: 'center'}}
              onPress={galleryCall}>
              <FontAwesome
                name={'photo'}
                size={28}
                color={colorConstant.white}></FontAwesome>
              <Text variant="bodyMedium" style={{color: colorConstant.white}}>
                Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* preview image modal */}
      <Modal
        transparent={true}
        onBackdropPress={() => setShowImageModal(false)}
        onBackButtonPress={() => setShowImageModal(false)}
        swipeDirection="down"
        visible={showImageModal} // Show modal based on selectedIndex
      >
        <View style={styles.imagemodalcontainer}>
          <TouchableOpacity onPress={() => setShowImageModal(false)}>
            <Image
              source={imageConstant.cross}
              style={styles.imagemodaldimension}
            />
          </TouchableOpacity>

          {images.length === 1 ? (
            <Image source={{uri: images[0]}} style={styles.imagedimensionnew} />
          ) : images.length > 1 ? (
            <Swiper
              loop={false}
              showsButtons={true}
              showsPagination={false}
              ref={swiperRef}>
              {images?.map((imagePath, index) => (
                <TouchableOpacity>
                  <Image
                    key={index}
                    source={{uri: imagePath}}
                    style={styles.imageswiperstyle}
                  />
                </TouchableOpacity>
              ))}
            </Swiper>
          ) : null}
        </View>
      </Modal>

      {/* not approve modal */}

      <Modal
        transparent={true}
        onBackdropPress={() => setShowNotApproveModal(false)}
        onBackButtonPress={() => setShowNotApproveModal(false)}
        swipeDirection="down"
        visible={showNotApproveModal} // Show modal based on selectedIndex
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.crosstouch}
            onPress={() => setShowNotApproveModal(false)}>
            <Image source={imageConstant.cross} />
          </TouchableOpacity>
          <Text style={styles.notApproveText}>
            Sorry. the uploaded image does not comply with our platform's
            guidelines. Please review the policy and try again.
          </Text>
        </View>
      </Modal>

      {/* type selected modal */}
      <Modal
        isVisible={tagsModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={1000}
        animationOutTiming={1000}
        onBackdropPress={handleTagsModal}
        onBackButtonPress={handleTagsModal}
        backdropOpacity={0}
        swipeDirection="down"
        onSwipeComplete={handleTagsModal}>
        <View style={styles.modalContainer1}>
          <View style={{backgroundColor: colorConstant.backgroundBlack}}>
            <Image source={imageConstant.whiteline} style={styles.whiteline} />
            <View style={styles.modalinputcontainer}>
              <View style={styles.modaltextinput}>
                <Image
                  source={imageConstant.searchblack}
                  style={{
                    width: responsiveScreenHeight(2),
                    height: responsiveScreenHeight(2),
                  }}
                />
                <TextInput
                  onChangeText={text => {
                    setSearchText(text);
                  }}
                  value={searchText}
                  placeholder="Search"
                  placeholderTextColor={colorConstant.placeholdercolor}
                  style={styles.modaltextinputstyle}
                />
              </View>
              <CommonButton
                height={responsiveScreenHeight(4.5)}
                width={responsiveScreenWidth(23)}
                buttonTitle={'Done'}
                fontSize={responsiveScreenFontSize(2.3)}
                marginBottom={responsiveScreenHeight(8)}
                marginTop={responsiveScreenHeight(4)}
                onButtonPress={() => {
                  handleUpdateTagNames();
                  setTagsModalVisible(false);
                }}
              />
            </View>

            <ScrollView>
              {valueType == '' ? (
                <View style={styles.modaltagscontainer}>
                  <Text style={styles.modaltagstext}>
                    Select a "Type" before selecting the "Tags"
                  </Text>
                </View>
              ) : (
                <View>
                  {selectedTagsList?.map((tag, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.modalsingletags}
                      onPress={() => toggleTagSelection(tag)}>
                      <Text style={{color: 'white', fontSize: 18}}>
                        {tag?.tagNames}
                      </Text>
                      <Image
                        source={imageConstant.ticknew}
                        style={styles.selected}
                      />
                    </TouchableOpacity>
                  ))}

                  {/* Render unselected tags below */}
                  {unselectedTagsList?.map((tag, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.modalsingletags}
                      onPress={() => toggleTagSelection(tag)}>
                      <Text style={{color: 'white', fontSize: 18}}>
                        {tag?.tagNames}
                      </Text>
                      <Image
                        source={
                          tag.isSelected
                            ? imageConstant.ticknew
                            : imageConstant.tagsunselected
                        }
                        style={
                          tag.isSelected ? styles.selected : styles.unselected
                        }
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* tag pepole  modal */}

      <Modal
        isVisible={followerModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={1000}
        animationOutTiming={1000}
        onBackdropPress={handleFollowerModal}
        onBackButtonPress={handleFollowerModal}
        backdropOpacity={0}
        swipeDirection="down"
        onSwipeComplete={handleFollowerModal}>
        <View style={styles.modalContainer1}>
          <View style={{backgroundColor: colorConstant.backgroundBlack}}>
            <Image source={imageConstant.whiteline} style={styles.whiteline} />
            <View style={styles.modalinputcontainer}>
              <View style={styles.modaltextinput}>
                <Image
                  source={imageConstant.searchblack}
                  style={{
                    width: responsiveScreenHeight(2),
                    height: responsiveScreenHeight(2),
                  }}
                />
                <TextInput
                  onChangeText={text => {
                    setSearchFollowerText(text);
                  }}
                  value={searchFollowerText}
                  placeholder="Search"
                  placeholderTextColor={colorConstant.placeholdercolor}
                  style={styles.modaltextinputstyle}
                />
              </View>
              <CommonButton
                height={responsiveScreenHeight(4.5)}
                width={responsiveScreenWidth(23)}
                buttonTitle={'Done'}
                fontSize={responsiveScreenFontSize(2.3)}
                marginBottom={responsiveScreenHeight(8)}
                marginTop={responsiveScreenHeight(4)}
                onButtonPress={() => {
                  handleUpdateFollowerNames();
                  setFollowerModalVisible(false);
                }}
              />
            </View>

            <ScrollView>
              <View>
                {selectedFollowersList?.map((follower, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalsingletags}
                    onPress={() => toggleFollowerSelection(follower)}>
                    <Text style={{color: 'white', fontSize: 18}}>
                      {follower?.username}
                    </Text>
                    <Image
                      source={imageConstant.ticknew}
                      style={styles.selected}
                    />
                  </TouchableOpacity>
                ))}

                {/* Render unselected tags below */}
                <View>
                  {unselectedFollowersList.length === 0 &&
                  selectedFollowersList.length == 0 ? (
                    <View style={styles.modaltagscontainer}>
                      <Text style={styles.modaltagstext}>
                        You do not follow anyone. Please follow the person you
                        want to tag
                      </Text>
                    </View>
                  ) : (
                    unselectedFollowersList.map((follower, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.modalsingletags}
                        onPress={() => toggleFollowerSelection(follower)}>
                        <Text style={{color: 'white', fontSize: 18}}>
                          {follower?.username}{' '}
                        </Text>
                        <Image
                          source={
                            follower.isSelected
                              ? imageConstant.ticknew
                              : imageConstant.tagsunselected
                          }
                          style={
                            follower.isSelected
                              ? styles.selected
                              : styles.unselected
                          }
                        />
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PublishPost;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: colorConstant.black,
    flex: 1,
  },
  usernameTouch: {width: responsiveScreenWidth(90), padding: 8},
  usernameFlatlist: {
    borderWidth: 1,
    borderColor: colorConstant.bordercolor,
    width: responsiveScreenWidth(95),
    borderRadius: 8,
  },
  usernameText: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2),
  },
  unselected: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  selected: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  crosstouch: {
    justifyContent: 'center',
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
    marginBottom: responsiveScreenHeight(2),
  },

  notApproveText: {
    color: colorConstant.white,
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
    textAlign: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: colorConstant.backgroundBlack,
    alignSelf: 'center',
    padding: responsiveScreenHeight(2.5),
    height: responsiveScreenHeight(20),
    width: responsiveScreenWidth(95),
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  imageselect: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: responsiveScreenWidth(95),
    justifyContent: 'center',
    marginVertical: responsiveScreenHeight(2),
  },
  imageselecttouchable: {
    width: responsiveScreenWidth(40),
    height: responsiveScreenHeight(10),
  },
  imagetouchabledimension: {
    width: 28,
    height: 28,
    marginBottom: responsiveScreenHeight(15),
  },
  imagetouchabledimensionnew: {
    width: 28,
    height: 28,
    marginBottom: responsiveScreenHeight(15),
    marginLeft: responsiveScreenWidth(-5),
  },
  imagedimension: {
    width: 28,
    height: 28,

    marginLeft: responsiveScreenWidth(-1),
    marginTop: responsiveScreenHeight(-1.5),
  },
  addMoreImagesTouchable: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colorConstant.white,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  addMoreContainer: {
    width: responsiveScreenWidth(75),
    height: responsiveScreenHeight(20),

    alignSelf: 'center',

    flexDirection: 'row',
  },
  imageswipertouchable: {
    flexDirection: 'row',
    width: responsiveScreenWidth(50),
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: responsiveScreenWidth(5),
    // justifyContent: 'center',
    height: responsiveScreenHeight(20),
    // backgroundColor:'pink'
  },

  giveCreditMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(90),
  },
  giveCreditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  publishbuttoncontainer: {
    height: responsiveScreenHeight(10),
    width: responsiveScreenWidth(100),
    justifyContent: 'center',
    marginTop: responsiveScreenHeight(7),
  },
  imagemodalcontainer: {
    backgroundColor: colorConstant.backgroundBlack,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(80),
  },
  imagemodaldimension: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
    marginVertical: 10,
    marginRight: 5,
  },
  imagedimensionnew: {
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(70),
    alignSelf: 'center',
    borderRadius: 4,
  },
  imageswiperstyle: {
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(70),
    alignSelf: 'center',
    borderRadius: 4,
  },
  selectedTagText: {
    color: colorConstant.black,
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
  selectedTagContainer: {
    flexDirection: 'row',
    backgroundColor: '#dfdfdf',
    justifyContent: 'center',
    alignItems: 'çenter',
    borderRadius: 5,
    padding: 5,
  },
  profileText: {
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(3),
    width: '80%',
    marginVertical: responsiveScreenHeight(2),
  },
  headingtext: {
    color: '#B5B5B5',
    fontFamily: fontConstant.regular,
    fontSize: 15,
  },

  heading: {
    // backgroundColor:'red',
    width: responsiveScreenWidth(60),
    // backgroundColor:'red'
  },

  iconset: {
    flexDirection: 'row',
    width: responsiveScreenWidth(100),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: responsiveScreenHeight(1),
  },
  allicon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(100),
    alignSelf: 'center',
    // paddingHorizontal:5,
    // You can adjust this based on your layout requirements
  },
  singleicon: {
    margin: 7,
    alignItems: 'center',
    // backgroundColor:'red',
    width: responsiveScreenWidth(29),
    marginVertical: responsiveScreenHeight(2),
  },

  textcontainer: {marginTop: responsiveScreenHeight(3)},
  textcontainertext: {
    color: colorConstant.white,
    textAlign: 'center',
    fontFamily: fontConstant.light,
    fontSize: 16,
  },
  textinput: {
    backgroundColor: colorConstant.backgroundBlack,
    width: responsiveScreenWidth(80),
    height: responsiveScreenHeight(5.5),
    borderRadius: 5,
    color: colorConstant.white,
    // paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: colorConstant.bordercolor,
    marginLeft: responsiveScreenWidth(-0.5),

    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinputnew: {
    backgroundColor: colorConstant.backgroundBlack,
    marginTop: responsiveScreenHeight(1),
    width: responsiveScreenWidth(95),
    height: responsiveScreenHeight(5.5),
    borderRadius: 5,
    color: colorConstant.white,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: colorConstant.bordercolor,
    marginLeft: responsiveScreenWidth(-0.5),

    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(5),
  },
  titlecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(2),
    gap: responsiveScreenWidth(4),
    marginTop: responsiveScreenHeight(2),
    zIndex: 10,
  },
  sharetextinput: {
    backgroundColor: colorConstant.backgroundBlack,
    height: responsiveScreenHeight(15),
    width: responsiveScreenWidth(92),
    color: colorConstant.white,
  },
  sharemore: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenHeight(3),
    gap: 5,
  },
  givecreditinput: {
    backgroundColor: colorConstant.backgroundBlack,
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(90),
    color: colorConstant.white,
  },
  publishbutton: {
    alignItems: 'center',
    marginTop: responsiveScreenHeight(3),
    marginBottom: responsiveScreenHeight(4),
  },
  publish: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: responsiveScreenWidth(45),
    height: responsiveScreenHeight(5),
  },
  centerContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: responsiveScreenWidth(80),
    marginBottom: responsiveScreenHeight(3),
  },
  publishImg: {
    resizeMode: 'cover',
    width: responsiveScreenWidth(45),
    height: responsiveScreenHeight(17),
    // marginVertical: responsiveScreenHeight(3),
    alignSelf: 'center',
  },

  centerText: {
    color: colorConstant.lightText,
    textAlign: 'center',
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2),
  },
  clickText: {
    color: colorConstant.white,
    textAlign: 'center',
    fontFamily: fontConstant.medium,
    fontSize: responsiveScreenFontSize(2),
  },
  rowTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rowConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: responsiveScreenWidth(95),
    marginVertical: responsiveScreenHeight(1),
  },
  leftText: {
    color: colorConstant.white,
    fontSize: responsiveScreenFontSize(2),
    fontFamily: fontConstant.bold,
  },

  suggestText: {
    color: colorConstant.white,
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: fontConstant.medium,
  },
  itemText: {
    color: colorConstant.white,
    marginLeft: 5,
    borderWidth: 1,
    borderBottomColor: colorConstant.white,
    marginRight: 5,
  },
  modalContainer1: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(74),
    alignSelf: 'center',
    bottom: responsiveScreenHeight(0),
    backgroundColor: colorConstant.backgroundBlack,
    borderRadius: 5,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 1,
    elevation: 11,
    marginTop: responsiveScreenHeight(20),
  },
  mainModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '90%',
  },
  modalrowContainer: {
    flexDirection: 'row',
    // alignItems:'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(70),
    marginTop: responsiveScreenHeight(2),
  },
  paginationLine: {
    width: 15,
    height: 2,
    backgroundColor: 'gray',
    marginHorizontal: 3,
    marginBottom: responsiveScreenHeight(-8),
    // marginLeft: 15,
    justifyContent: 'flex-end',
  },
  activePaginationLine: {
    width: 25, // Make the active line slightly larger
    height: 2,
    backgroundColor: 'white',
    marginHorizontal: 3,
    marginBottom: responsiveScreenHeight(-8),
    // marginLeft: 15,
    justifyContent: 'flex-end',
  },
  paginationLineModal: {
    width: 15,
    height: 2,
    backgroundColor: 'gray',
    marginHorizontal: 3,
    marginBottom: responsiveScreenHeight(-3),
  },
  activePaginationLineModal: {
    width: 25, // Make the active line slightly larger
    height: 2,
    backgroundColor: 'white',
    marginHorizontal: 3,
    marginBottom: responsiveScreenHeight(-3),
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
  modalContainer: {
    backgroundColor: '#403735',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    bottom: 0,
    position: 'absolute',
    height: responsiveScreenHeight(20),
    width: responsiveScreenWidth(100),
    borderRadius: 8,
    alignSelf: 'center',
  },
  modaltextinput: {
    backgroundColor: colorConstant.backgroundBlack,
    width: responsiveScreenWidth(60),
    height: responsiveScreenHeight(5.5),
    borderRadius: 15,
    color: colorConstant.white,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: colorConstant.bordercolor,
    marginLeft: responsiveScreenWidth(-0.5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveScreenWidth(2),
    marginRight: responsiveScreenWidth(10),
  },
  dropdownList: {
    backgroundColor: 'red',
  },
  whiteline: {
    alignSelf: 'center',
    marginBottom: responsiveScreenHeight(2),
    marginTop: responsiveScreenHeight(2),
  },
  modalinputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: responsiveScreenWidth(15),
    gap: responsiveScreenWidth(15),
    marginRight: responsiveScreenWidth(10),
  },
  modaltextinputstyle: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(1.8),
    width: responsiveScreenWidth(45),
  },
  modaltagscontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveScreenHeight(35),
  },
  modaltagstext: {
    color: colorConstant.white,
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2),
    alignSelf: 'center',
    textAlign: 'center',
  },
  modalsingletags: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveScreenHeight(3),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  headText: {
    color: colorConstant.white,
    fontSize: responsiveScreenFontSize(2.3),
    fontFamily: fontConstant.regular,
    alignSelf: 'center',
  },
});
