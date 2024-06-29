import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import CommonButton from '../../components/CommonButton';
import CommonTextInput from '../../components/CommonTextInput';
import NewHeader from '../../components/NewHeader';
import {
  createAllMagz,
  getAllTags,
  getUsernameFollowers,
  giveCredit,
} from '../../redux/reducers/authSlice';
import {colorConstant, imageConstant} from '../../utils/constant';
import {DEFAULT_MESSAGE, VALID_IMAGE, VALID_URL} from '../../utils/message';
import {defaultSelectedCategory} from '../../utils/objects';
import CommonTitleInput from '../../components/CommonTitleInput';
import CommonTypeSelector from '../../components/CommonTypeSelector';
import CommonTagsSelect from '../../components/CommonTagsSelect';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './Styles';
export default function MagzPublish(props) {
  const dispatch = useDispatch();
  const usernameData = useSelector(state => state?.auth?.usernameFollowers);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [discription, setDiscription] = useState('');
  const [discriptionError, setDiscriptionError] = useState('');
  const [showNotApproveModal, setShowNotApproveModal] = useState(false);

  const [link, setLink] = useState('');
  const [linkError, setLinkError] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [postLiveModal, setPostLiveModal] = useState(false);
  const [images, setImages] = useState('');
  const [imagesError, setImagesError] = useState('');

  const [searchText, setSearchText] = useState('');
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  var urlRegs =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [tagType, setTagType] = useState('PIC');
  const [tagsError, setTagsError] = useState('');
  const [valueType, setValueType] = useState('');
  const [valueTypeError, setValueTypeError] = useState('');
  const [openType, setOpenType] = useState(false);
  const [tagsModalVisible, setTagsModalVisible] = useState(false);
  const [selected, setSelected] = useState('neroPic');
  const [tagNames, setTagNames] = useState([]);
  const [selectedUsernames, setSelectedUsernames] = useState([]);

  const [followerError, setFollowerError] = useState('');
  const [followerModalVisible, setFollowerModalVisible] = useState(false);
  const [selectedFollowers, setSelectedFollowers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [searchFollowerText, setSearchFollowerText] = useState('');
  const [filteredFollowers, setFilteredFollowers] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      handlePressIcon(defaultSelectedCategory);
      getUserNameData();
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      handleGetTags();
    }, 300); 

    return () => clearTimeout(delayedSearch);
  }, [searchText, valueType]);

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

  const maxCharacters = 20;

  let currentCharacterCount = 0;

  const renderedItems = tagNames?.map((tagName, index) => {
    if (currentCharacterCount + tagName.length <= maxCharacters) {
      currentCharacterCount += tagName.length;
      return (
        <View
          style={styles.renderItemView}>
          <Text key={index} style={styles.tagnameText}>
            {tagName}
          </Text>
        </View>
      );
    }

    return null;
  });

  const remainingItemsCount =
    tagNames?.length - renderedItems?.filter(item => item !== null).length;

  if (remainingItemsCount > 0) {
    renderedItems.push(
      <Text key={renderedItems.length} style={styles.tagnameText}>
        +{remainingItemsCount} more
      </Text>,
    );
  }

  const finalTags = filteredTags?.map(tag => ({
    ...tag,
    isSelected: selectedTags?.some(
      selectedTag => selectedTag?.tagNames === tag?.tagNames,
    ),
  }));

  const selectedTagsList = finalTags?.filter(tag => tag?.isSelected);
  const unselectedTagsList = finalTags?.filter(tag => !tag?.isSelected);

  const finalFollowers = filteredFollowers?.map(follower => ({
    ...follower,
    isSelected: selectedFollowers?.some(
      selectedFollower => selectedFollower.username === follower.username,
    ),
  }));

  const filteredData = finalFollowers.filter(item => item.isSelected);
  const modifiedData = filteredData.map(({isSelected, ...rest}) => rest);
  const selectedFollowersList = finalFollowers?.filter(
    follower => follower.isSelected,
  );
  const unselectedFollowersList = finalFollowers?.filter(
    follower => !follower.isSelected,
  );

  const maxFollowerCharacters = 40;
  const findUserIdByUsername = (data, usernameToFind) => {
    const user = data.find(user => user.username === usernameToFind);
    return user ? user.userId : null;
  };

  const renderedFollowerItems = followers?.map((follower, index) => {
    const userId = findUserIdByUsername(usernameData, follower);
    if (currentCharacterCount + follower.length <= maxFollowerCharacters) {
      currentCharacterCount += follower.length;
      return (
        <View
          style={styles.renderItemView}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('OtherProfileView', {
                IdDetails: userId,
              })
            }>
            <Text key={index} style={styles.tagnameText}>
              {follower}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null; 
  });

  const remainingFollowerItemsCount =
    followers?.length -
    renderedFollowerItems?.filter(item => item !== null).length;

  if (remainingFollowerItemsCount > 0) {
    renderedFollowerItems?.push(
      <Text key={renderedItems?.length} style={styles.tagnameText}>
        +{remainingFollowerItemsCount} more
      </Text>,
    );
  }

  const handleFollowerModal = () => {
    handleUpdateFollowerNames();
    setFollowerModalVisible(false);
  };

  const handleGiveCredit = id => {
    const creditData = {
      credit: modifiedData,
    };
    const data = {id, creditData};

    dispatch(giveCredit(data));
  };

  const handleGetTags = () => {
    dispatch(getAllTags(getCodeForTag(valueType))).then(response => {
      if (response.meta.requestStatus === 'fulfilled') {
        const tagList = response?.payload;

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

        const filteredUnselectedTagsList = unselectedTagsList?.filter(tag =>
          tag?.tagNames?.toLowerCase()?.includes(searchText?.toLowerCase()),
        );

        const combinedTagsList = selectedTagsList?.concat(
          filteredUnselectedTagsList,
        );

        setFilteredTags(combinedTagsList);
      }
    });
  };

  const handleTypeChange = itemValue => {
    if (itemValue.length !== 0) {
      setValueType(itemValue);
      setValueTypeError('');
    } else {
      setValueType('');
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

  const handleTagsModal = () => {
    handleUpdateTagNames();
    setTagsModalVisible(false);
  };

  const handleModel = () => {
    if (selected !== 'neroMov') {
      setModalVisible(!modalVisible);
    } else {
      videoCall();
    }
  };

  const handleCreateMagz = () => {
    const newDescription = discription?.length >= 160;
    const newLink = urlRegs?.test(link);
    const imageUrl = images;

    if (title && newDescription && newLink && imageUrl && selectedTags) {
      const urlSegments = imageUrl?.split('/');
      const filename = urlSegments?.[urlSegments.length - 1];

      const data = new FormData();

      if (imageUrl) {
        data.append('images', {
          uri:
          Platform.OS === 'ios'
            ? imageUrl?.replace('file://', '')
            : imageUrl,
          name: filename || 'image.jpg', 
          type: 'image/jpeg',
        });
      }

      data.append('title', title);
      data.append('location', 'India');
      data.append('type', 'mags');
      data.append('tags', tagNames);
      data.append('description', discription);
      data.append(
        'credit',
        selectedUsernames.map(username => `@${username}`),
      );
      data.append('link', link);
      data.append('category', valueType);

      dispatch(createAllMagz(data)).then(response => {
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
      setTitleError(title ? '' : DEFAULT_MESSAGE);
      setDiscriptionError(
        newDescription ? '' : `Minimum ${160} characters are required.`,
      );
      setLinkError(newLink ? '' : VALID_URL);
      setImagesError(imageUrl ? '' : VALID_IMAGE);
      setTagsError(selectedTags.length > 0 ? '' : DEFAULT_MESSAGE);
    }
  };

  const galleryCall = () => {
    try {
      ImagePicker.openPicker({
        multiple: false,
        cropping: true,
      }).then(image => {
        if (image.path !== '') {
          setImages(image.path);
          setImagesError('');
          setModalVisible(false);
        } else {
          setImages('');
          setImagesError(DEFAULT_MESSAGE);
          setModalVisible(false);
        }
        console.log(image.path);
      });
    } catch (error) {}
  };

  const cameraCall = () => {
    try {
      ImagePicker.openCamera({
        cropping: true,
      }).then(image => {
        if (image.path !== '') {
          setImages(image.path);
          setImagesError('');
          setModalVisible(false);
        } else {
          setImages('');
          setImagesError(DEFAULT_MESSAGE);
          setModalVisible(false);
        }
        console.log(image.path);
      });
    } catch (error) {}
  };

  const removeImage = index => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setModalVisible(false); 
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

  const onHandleDiscription = text => {
    if (text.length !== 0) {
      if (text.length > 160) {
        setDiscription(text);
        setDiscriptionError('');
      } else {
        setDiscription(text);
        setDiscriptionError(`Minimum ${160} characters are required.`);
      }
    } else {
      setDiscription('');
      setDiscriptionError(DEFAULT_MESSAGE);
    }
  };

  const onHandleLink = text => {
    if (text.length !== 0) {
      if (urlRegs.test(text)) {
        setLink(text);
        setLinkError('');
      } else {
        setLink(text);
        setLinkError(VALID_URL);
      }
    } else {
      setLink('');
      setLinkError(DEFAULT_MESSAGE);
    }
  };

  const handlePressIcon = icon => {
    setTagType(icon.tagType);
    setSelectedIcon(icon);
  };

  const toggleTagSelection = tag => {
    const isSelected = selectedTags.some(
      selectedTag => selectedTag.tagNames === tag.tagNames,
    );

    if (isSelected) {
      setSelectedTags(
        selectedTags.filter(
          selectedTag => selectedTag.tagNames !== tag.tagNames,
        ),
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleUpdateTagNames = () => {
    const extractedTagNames = selectedTags?.map(tag => tag.tagNames);
    setTagNames(extractedTagNames);
  };

  const getUserNameData = () => {
    dispatch(getUsernameFollowers()).then(response => {
      if (response.meta.requestStatus === 'fulfilled') {
        const FollowerList = response?.payload;

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

        const filteredUnselectedFollowersList = unselectedFollowersList?.filter(
          follower =>
            follower?.username
              ?.toLowerCase()
              ?.includes(searchFollowerText?.toLowerCase()),
        );

        const combinedFollowerList = selectedFollowersList?.concat(
          filteredUnselectedFollowersList,
        );

        setFilteredFollowers(combinedFollowerList);
      }
    });
  };

  const toggleFollowerSelection = follower => {
    const isSelected = selectedFollowers.some(
      selectedFollower => selectedFollower.username === follower.username,
    );

    if (isSelected) {
      setSelectedFollowers(
        selectedFollowers.filter(
          selectedFollower => selectedFollower.username !== follower.username,
        ),
      );
    } else {
      setSelectedFollowers([...selectedFollowers, follower]);
    }
  };

  const handleUpdateFollowerNames = () => {
    const extractedTagNames = selectedFollowers?.map(
      follower => follower.username,
    );
    setFollowers(extractedTagNames);
  };



  return (
    <SafeAreaView style={styles.mainContainer}>
      <NewHeader
        navigation={props.navigation}
        title={'Publish'}
        rightImage={false}
      />
      <ScrollView>
        <View style={styles.centerContainer}>
          {!images ? (
            <View>
              <Image source={imageConstant.publish} style={styles.publishImg} />
              <View style={styles.rowTextContainer}>
                <TouchableOpacity onPress={handleModel}>
                  <Text style={styles.clickText}>Click here</Text>
                </TouchableOpacity>
                <Text style={styles.centerText}>
                  {' '}
                  to select from the folder
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.imageView}>
              <TouchableOpacity
                style={styles.touch}
                onPress={() => setShowImageModal(true)}>
                <Image source={{uri: images}} style={styles.publishImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeTouch}
                onPress={removeImage}>
                <Image source={imageConstant.Close} style={styles.removeImg} />
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
          handleTypeChange={handleTypeChange}
          valueTypeError={valueTypeError}
        />

        <CommonTagsSelect
          selected={selected}
          setTagsModalVisible={setTagsModalVisible}
          renderedItems={renderedItems}
          tagsError={tagsError}
          tagNames={tagNames}
        />

        {/* Mag Description */}

        <Text style={styles.headText}>Showcase a summary of your article</Text>

        <CommonTextInput
          multiline={true}
          placeholder="Minimum requirement: 160 characters"
          value={discription}
          onChangeText={text => onHandleDiscription(text)}
          width={responsiveScreenWidth(90)}
          height={responsiveScreenHeight(15)}
          textAlignVertical={'top'}
          numberOfLines={3}
          marginTop={responsiveScreenHeight(0.5)}
          borderColor={colorConstant.bordercolor}
        />
        {discriptionError ? (
          <View style={[styles.errorView, {marginLeft: '5%'}]}>
            <Text style={styles.errorText}>{discriptionError}</Text>
          </View>
        ) : null}

        <Text style={styles.headText}>Give credits to your team</Text>

        <View style={styles.con}>
          <TouchableOpacity
            style={styles.textinputnew}
            activeOpacity={0.8}
            onPress={() => {
              setFollowerModalVisible(true);
            }}>
            <View
              style={styles.view12}>
              <View
                style={styles.view13}>
                {renderedFollowerItems.length > 0 ? (
                  renderedFollowerItems
                ) : (
                  <Text
                    style={styles.searchtagText}>
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
              <Icon
                name={'right'}
                size={19}
                style={{color: 'white', marginRight: 15}}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          {followerError ? (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{followerError}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.headText}>Add source link</Text>

        <CommonTextInput
          value={link}
          onChangeText={text => onHandleLink(text)}
          width={responsiveScreenWidth(90)}
          height={responsiveScreenHeight(6)}
          marginTop={responsiveScreenHeight(0.5)}
          borderColor={colorConstant.bordercolor}
          placeholder={'Provide the source URL of your magazine'}
        />
        {linkError ? (
          <View style={[styles.errorView, {marginLeft: '5%'}]}>
            <Text style={styles.errorText}>{linkError}</Text>
          </View>
        ) : null}

        <CommonButton
          height={responsiveScreenHeight(5)}
          width={responsiveScreenWidth(40)}
          buttonTitle={'Publish'}
          fontSize={responsiveScreenFontSize(2.3)}
          onButtonPress={handleCreateMagz}
          marginBottom={responsiveScreenHeight(10)}
          marginTop={responsiveScreenHeight(6)}
        />
      </ScrollView>

      {/* postlive modal */}

      <Modal
        animationInTiming={1000}
        animationOutTiming={1000}
        onBackButtonPress={() => setPostLiveModal(false)}
        swipeDirection="down"
        visible={postLiveModal}>
        <View style={styles.postLiveView}>
          <TouchableOpacity
            onPress={() => {
              setPostLiveModal(false);
              props.navigation.replace('DrawerTabNavigation');
            }}
            style={styles.postLiveTouch}>
            <Image source={imageConstant.cross} />
          </TouchableOpacity>
          <Text style={styles.firstText}>
            Well, wasn’t that a piece of cake!
          </Text>

          <Text style={styles.desText}>
            Thanks for submitting your work. We will get back to you in the next
            24hrs. We want to make one thing clear, WE ABSOLUTELY LOVE YOUR
            WORK. We just want to see if it is in accordance with our community
            guidelines.
          </Text>
          <View style={styles.termText}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.replace('TermCondition', {
                  goToHome: true,
                })
              }>
              <Text style={styles.text3}>Terms of Service |</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.replace('PrivacyPolicy', {
                  goToHome: true,
                })
              }>
              <Text style={styles.text3}> Privacy Policy</Text>
            </TouchableOpacity>
          </View>

          <CommonButton
            height={responsiveScreenHeight(5)}
            width={responsiveScreenWidth(40)}
            buttonTitle={'Review'}
            fontSize={responsiveScreenFontSize(2.3)}
            onButtonPress={() =>
              props.navigation.replace('NeroClub', {
                goToHome: true,
              })
            }
            marginBottom={responsiveScreenHeight(6)}
            marginTop={responsiveScreenHeight(8)}
          />
        </View>
      </Modal>
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
          <View style={styles.rowCon}>
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
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setShowImageModal(false)}>
            <Image source={imageConstant.cross} style={styles.cross} />
          </TouchableOpacity>

          <Image source={{uri: images[0]}} style={styles.lastImg} />
        </View>
      </Modal>
      {/* not Approve modal */}
      <Modal
        transparent={true}
        onBackdropPress={() => setShowNotApproveModal(false)}
        onBackButtonPress={() => setShowNotApproveModal(false)}
        swipeDirection="down"
        visible={showNotApproveModal} // Show modal based on selectedIndex
      >
        <View style={styles.modalView1}>
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

      {/* Type selected modal */}
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
                  style={styles.hw2}
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
                      <Text style={styles.text123}>
                        {tag?.tagNames}
                      </Text>
                      <Image
                        source={imageConstant.ticknew}
                        style={styles.selected}
                      />
                    </TouchableOpacity>
                  ))}

                  {unselectedTagsList?.map((tag, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.modalsingletags}
                      onPress={() => toggleTagSelection(tag)}>
                      <Text style={styles.text123}>
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
    
    {/* tag pepole modal */}
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
                  style={styles.hw2}
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
                    <Text style={styles.text123}>
                      {follower?.username}
                    </Text>
                    <Image
                      source={imageConstant.ticknew}
                      style={styles.selected}
                    />
                  </TouchableOpacity>
                ))}

                <View>
                  {unselectedFollowersList.length === 0 && selectedFollowersList.length == 0  ? (
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
                        <Text style={styles.text123}>
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
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   mainContainer: {
//     backgroundColor: colorConstant.black,
//     flex: 1,
//   },
//   tagnameText:{color: 'white'},
//   renderItemView:{
//     padding: responsiveScreenWidth(1),
//     backgroundColor: colorConstant.black,
//     borderRadius: 8,
//     paddingHorizontal: responsiveScreenWidth(3),
//   },
//   usernameTouch: {width: responsiveScreenWidth(80), padding: 8},
//   usernameFlatlist: {
//     borderWidth: 1,
//     borderColor: colorConstant.bordercolor,
//     width: responsiveScreenWidth(90),
//     borderRadius: 8,
//     alignSelf: 'center',
//   },
//   usernameText: {
//     color: colorConstant.white,
//     fontFamily: fontConstant.regular,
//     fontSize: responsiveScreenFontSize(2),
//   },
//   unselected: {
//     width: 20,
//     height: 20,
//     marginRight: 8,
//   },
//   selected: {
//     width: 30,
//     height: 30,
//     marginRight: 5,
//   },
//   crosstouch: {
//     justifyContent: 'center',
//     height: 20,
//     width: 20,
//     alignSelf: 'flex-end',
//     marginBottom: responsiveScreenHeight(2),
//   },

//   notApproveText: {
//     color: colorConstant.white,
//     fontFamily: fontConstant.medium,
//     fontSize: responsiveScreenFontSize(2),
//     textAlign: 'center',
//     justifyContent: 'center',
//   },
//   modalView1: {
//     backgroundColor: colorConstant.backgroundBlack,
//     alignSelf: 'center',
//     padding: responsiveScreenHeight(2.5),
//     height: responsiveScreenHeight(20),
//     width: responsiveScreenWidth(95),
//     borderRadius: 8,
//     borderWidth: 0.5,
//     borderColor: 'gray',
//   },
//   postLiveView: {
//     backgroundColor: colorConstant.black,
//     width: responsiveScreenWidth(95),
//     alignSelf: 'center',
//     borderRadius: 12,
//     // justifyContent: 'center',
//     // paddingVertical: responsiveScreenHeight(10),
//     borderWidth: 0.5,
//     borderColor: 'white',
//     flex: 0.7,
//   },
//   lastImg: {
//     width: responsiveScreenWidth(90),
//     height: responsiveScreenHeight(70),
//     alignSelf: 'center',
//     borderRadius: 4,
//   },
//   cross: {
//     width: 20,
//     height: 20,
//     alignSelf: 'flex-end',
//     marginVertical: 10,
//     marginRight: 5,
//   },
//   modalView: {
//     backgroundColor: colorConstant.backgroundBlack,
//     borderRadius: 8,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     width: responsiveScreenWidth(95),
//     height: responsiveScreenHeight(80),
//   },
//   closeImg: {width: 20, height: 20, marginLeft: -5, marginTop: -5},
//   termText: {
//     paddingVertical: responsiveScreenHeight(2),
//     flexDirection: 'row',
//     alignSelf: 'center',
//     width: responsiveScreenWidth(80),
//     justifyContent: 'center',
//   },
//   text3: {
//     color: colorConstant.white,
//     fontFamily: fontConstant.regular,
//     fontSize: responsiveScreenFontSize(1.9),
//     alignSelf: 'center',
//     textAlign: 'center',
//   },
//   desText: {
//     color: colorConstant.gray,
//     fontFamily: fontConstant.regular,
//     fontSize: responsiveScreenFontSize(1.9),
//     width: responsiveScreenWidth(85),
//     textAlign: 'center',
//     alignSelf: 'center',
//     paddingVertical: responsiveScreenHeight(3),
//     marginTop: responsiveScreenHeight(3),
//   },
//   firstText: {
//     color: colorConstant.white,
//     fontFamily: fontConstant.medium,
//     fontSize: responsiveScreenFontSize(3),
//     textAlign: 'center',
//   },
//   postLiveTouch: {
//     alignSelf: 'flex-end',
//     marginVertical: responsiveScreenHeight(2.5),
//     marginRight: responsiveScreenWidth(3),
//   },
//   postLiveModal: {
//     backgroundColor: colorConstant.black,
//     width: responsiveScreenWidth(95),
//     alignSelf: 'center',
//     borderRadius: 12,
//     borderWidth: 0.5,
//     borderColor: 'white',
//     flex: 0.7,
//   },
//   suggestView: {
//     flexDirection: 'row',
//     gap: responsiveScreenWidth(2),
//     marginVertical: responsiveScreenWidth(2),
//     width: responsiveScreenWidth(80),
//     marginLeft: responsiveScreenWidth(20),
//     paddingHorizontal: 5,
//     flexWrap: 'wrap',
//   },
//   removeImg: {
//     width: 28,
//     height: 28,
//     alignSelf: 'center',
//     marginLeft: responsiveScreenWidth(-2),
//     marginTop: responsiveScreenHeight(-2),
//   },
//   removeTouch: {
//     width: 28,
//     height: 28,
//     marginBottom: responsiveScreenHeight(15),
//     justifyContent: 'center',
//   },
//   touch: {
//     width: responsiveScreenWidth(40),
//     height: responsiveScreenHeight(10),
//   },
//   imageView: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     width: responsiveScreenWidth(95),
//     justifyContent: 'center',
//     marginVertical: responsiveScreenHeight(2),
//   },
//   selectedTagText: {
//     color: colorConstant.black,
//   },
//   errorView: {
//     marginTop: '1%',
//     marginLeft: '1%',
//     marginBottom: '-2%',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: responsiveScreenFontSize(1.7),
//     fontFamily: fontConstant.regular,
//   },
//   selectedTagContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#dfdfdf',
//     justifyContent: 'center',
//     alignItems: 'çenter',
//     borderRadius: 5,
//     padding: 5,
//   },
//   centerContainer: {
//     alignSelf: 'center',
//     justifyContent: 'center',
//     width: responsiveScreenWidth(80),
//     marginBottom: responsiveScreenHeight(3),
//   },
//   publishImg: {
//     resizeMode: 'cover',
//     width: responsiveScreenWidth(45),
//     height: responsiveScreenHeight(17),
//     // marginVertical: responsiveScreenHeight(3),
//     alignSelf: 'center',
//   },
//   centerText: {
//     color: colorConstant.lightText,
//     textAlign: 'center',
//     fontFamily: fontConstant.regular,
//     fontSize: responsiveScreenFontSize(2),
//   },

//   clickText: {
//     color: colorConstant.white,
//     textAlign: 'center',
//     fontFamily: fontConstant.medium,
//     fontSize: responsiveScreenFontSize(2),
//   },
//   rowTextContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//   },
//   rowConatiner: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     alignSelf: 'center',
//     width: responsiveScreenWidth(90),
//     marginVertical: responsiveScreenHeight(1),
//   },
//   leftText: {
//     color: colorConstant.white,
//     fontSize: responsiveScreenFontSize(2),
//     fontFamily: fontConstant.bold,
//   },
//   input: {
//     backgroundColor: colorConstant.backgroundBlack,
//     width: responsiveScreenWidth(75),
//     borderRadius: 12,
//     color: colorConstant.white,
//     fontSize: responsiveScreenFontSize(2),
//     paddingHorizontal: responsiveScreenWidth(4),
//     height: responsiveScreenHeight(5.5),
//     fontFamily: fontConstant.regular,
//   },
//   tagsInputView: {
//     backgroundColor: colorConstant.backgroundBlack,
//     width: responsiveScreenWidth(75),
//     borderRadius: 12,
//     height: responsiveScreenHeight(5.5),
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignSelf: 'center',
//   },
//   tagInput: {
//     backgroundColor: colorConstant.black,
//     borderRadius: 4,
//     marginVertical: 5,
//     marginHorizontal: 4,
//     justifyContent: 'center',
//   },
//   chipText: {
//     color: colorConstant.white,
//     fontSize: responsiveScreenFontSize(2),
//     fontFamily: fontConstant.regular,
//     alignSelf: 'center',
//   },
//   suggestText: {
//     color: colorConstant.white,
//     fontSize: responsiveScreenFontSize(1.8),
//     fontFamily: fontConstant.medium,
//   },
//   itemText: {
//     color: colorConstant.white,
//     marginLeft: 10,
//     borderWidth: 1,
//     borderBottomColor: colorConstant.white,
//   },
//   con:{justifyContent: 'center', alignItems: 'center'},
//   headText: {
//     color: colorConstant.white,
//     fontSize: responsiveScreenFontSize(2.3),
//     fontFamily: fontConstant.regular,
//     alignSelf: 'center',
//     marginVertical: responsiveScreenHeight(1),
//   },
//   multiInputs: {
//     backgroundColor: colorConstant.backgroundBlack,
//     width: responsiveScreenWidth(90),
//     borderRadius: 12,
//     color: colorConstant.white,
//     fontSize: responsiveScreenFontSize(2),
//     height: responsiveScreenHeight(15),
//     fontFamily: fontConstant.regular,
//     alignSelf: 'center',
//     textAlignVertical: 'top',
//     paddingHorizontal: 10,
//   },
//   inputdes: {
//     backgroundColor: colorConstant.backgroundBlack,
//     width: responsiveScreenWidth(90),
//     borderRadius: 12,
//     color: colorConstant.white,
//     fontSize: responsiveScreenFontSize(2),
//     height: responsiveScreenHeight(6),
//     fontFamily: fontConstant.regular,
//     alignSelf: 'center',
//     textAlignVertical: 'top',
//     paddingHorizontal: 10,
//     marginBottom: responsiveScreenHeight(2),
//   },
//   publishButton: {
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     width: responsiveScreenWidth(45),
//     height: responsiveScreenHeight(5),
//     marginVertical: responsiveScreenHeight(5),
//   },
//   modalContainer: {
//     backgroundColor: '#403735',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.36,
//     shadowRadius: 6.68,
//     elevation: 11,
//     bottom: -10,
//     position: 'absolute',
//     height: responsiveScreenHeight(20),
//     width: responsiveScreenWidth(100),
//     borderRadius: 8,
//     alignSelf: 'center',
//   },
//   mainModalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   rowCon: {
//     flexDirection: 'row',
//     // alignItems:'center',
//     alignSelf: 'center',
//     justifyContent: 'space-between',
//     width: responsiveScreenWidth(70),
//     marginTop: responsiveScreenHeight(2),
//   },
//   profileText: {
//     color: colorConstant.white,
//     fontFamily: fontConstant.medium,
//     fontSize: responsiveScreenFontSize(2.5),
//     marginVertical: 5,
//   },
//   paginationLine: {
//     width: 10,
//     height: 2,
//     backgroundColor: 'gray',
//     marginHorizontal: 3,

//     marginBottom: responsiveScreenHeight(-8),
//   },
//   activePaginationLine: {
//     width: 20, // Make the active line slightly larger
//     height: 2,
//     backgroundColor: 'white',
//     marginHorizontal: 3,

//     marginBottom: responsiveScreenHeight(-8),
//   },
//   textcontainer: {marginTop: responsiveScreenHeight(3)},
//   textcontainertext: {
//     color: colorConstant.white,
//     textAlign: 'center',
//     fontFamily: fontConstant.light,
//     fontSize: 16,
//   },
//   allicon: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     width: responsiveScreenWidth(100),
//     alignSelf: 'center',
//   },
//   singleicon: {
//     margin: 7,
//     alignItems: 'center',
//     width: responsiveScreenWidth(29),
//     marginVertical: responsiveScreenHeight(2),
//   },
//   inactiveText: {
//     color: '#979797',
//     textAlign: 'center',
//     fontFamily: fontConstant.regular,
//     fontSize: responsiveScreenFontSize(1.5),
//     marginTop: responsiveScreenHeight(0.5),
//     width: '100%',
//   },
//   activeText: {
//     color: 'white',
//     textAlign: 'center',
//     fontFamily: fontConstant.bold,
//     fontSize: responsiveScreenFontSize(1.5),
//     marginTop: responsiveScreenHeight(0.5),
//     width: '100%',
//   },

//   modalContainer1: {
//     width: responsiveScreenWidth(100),
//     height: responsiveScreenHeight(74),
//     alignSelf: 'center',
//     bottom: responsiveScreenHeight(5),
//     backgroundColor: colorConstant.backgroundBlack,
//     borderRadius: 5,

//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 2,
//       height: 5,
//     },
//     shadowOpacity: 1,
//     elevation: 11,
//     marginTop: responsiveScreenHeight(20),
//   },
//   mainModalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//     width: '90%',
//   },
//   modalrowContainer: {
//     flexDirection: 'row',
//     // alignItems:'center',
//     alignSelf: 'center',
//     justifyContent: 'space-between',
//     width: responsiveScreenWidth(70),
//     marginTop: responsiveScreenHeight(2),
//   },
//   hw2:{
//     width: responsiveScreenHeight(2),
//     height: responsiveScreenHeight(2),
//   },
//   modaltextinput: {
//     backgroundColor: colorConstant.backgroundBlack,
//     width: responsiveScreenWidth(60),
//     height: responsiveScreenHeight(5.5),
//     borderRadius: 15,
//     color: colorConstant.white,
//     paddingHorizontal: 9,
//     borderWidth: 1,
//     borderColor: colorConstant.bordercolor,
//     marginLeft: responsiveScreenWidth(-0.5),
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: responsiveScreenWidth(2),
//     marginRight: responsiveScreenWidth(10),
//   },
//   whiteline: {
//     alignSelf: 'center',
//     marginBottom: responsiveScreenHeight(2),
//     marginTop: responsiveScreenHeight(2),
//   },
//   modalinputcontainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     paddingHorizontal: responsiveScreenWidth(15),
//     gap: responsiveScreenWidth(15),
//     marginRight: responsiveScreenWidth(10),
//   },
//   modaltextinputstyle: {
//     color: colorConstant.white,
//     fontFamily: fontConstant.regular,
//     fontSize: responsiveScreenFontSize(1.8),
//     width: responsiveScreenWidth(45),
//   },
//   modaltagscontainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: responsiveScreenHeight(35),
//   },
//   modaltagstext: {
//     color: colorConstant.white,
//     fontFamily: fontConstant.regular,
//     fontSize: responsiveScreenFontSize(2),
//     alignSelf: 'center',
//     textAlign: 'center',
//   },
//   text123:{color: 'white', fontSize: 18},
//   modalsingletags: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: responsiveScreenHeight(3),
//     paddingHorizontal: responsiveScreenWidth(5),
//   },
//   view12:{
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: responsiveScreenWidth(90),
//     paddingLeft: responsiveScreenWidth(3),
//   },
//   view13:{
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//   },
//   searchtagText:{
//     color: colorConstant.placeholdercolor,
//     fontSize: responsiveScreenFontSize(2),
//   },
//   textinputnew: {
//     backgroundColor: colorConstant.backgroundBlack,
//     marginTop: responsiveScreenHeight(1),
//     width: responsiveScreenWidth(90),
//     height: responsiveScreenHeight(5.5),
//     borderRadius: 5,
//     color: colorConstant.white,
//     paddingHorizontal: 9,
//     borderWidth: 1,
//     borderColor: colorConstant.bordercolor,
//     // marginLeft: responsiveScreenWidth(-0.5),

//     justifyContent: 'space-around',
//     flexDirection: 'row',
//     alignItems: 'center',
//     // paddingHorizontal:responsiveScreenWidth(2)
//   },
// });
