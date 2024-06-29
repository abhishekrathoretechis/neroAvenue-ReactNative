import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';

import {colorConstant, imageConstant} from '../../utils/constant';

import {
  updateSubCategory,
  getAllSubCategory,
} from '../../redux/reducers/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Style';
const Folders = (props,{route, navigation}) => {
  const subCategoryData = useSelector(state => state?.auth?.getSubCategory);
 
  const dispatch = useDispatch();
  
  const {postIds} = props.route?.params;
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [createNewShow, setCreateNewShow] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredSubCategories = subCategoryData?.filter(subCategoryItem =>
    subCategoryItem?.subCategory
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleSubCategoryPress = subCategory => {
    setSelectedSubCategory(subCategory);
  };

  const handleMoveHere = () => {
    const data = new FormData();
    data.append('postIds', postIds);
    data.append('subCategory', selectedSubCategory);

    dispatch(updateSubCategory(data));
    getSubCategory();
  };
  const handleCreateNew = () => {
    const data = new FormData();
    data.append('postIds', postIds);
    data.append('subCategory', newFolderName);

    dispatch(updateSubCategory(data));
    getSubCategory();
  };
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getSubCategory();
    });
    return unsubscribe;
  }, [props.navigation]);

  
  const getSubCategory = async () => {
    dispatch(getAllSubCategory());
  };
  const uniqueSubCategories = [];
  const groupedSubCategories = {};
  filteredSubCategories?.forEach(subCategoryItem => {
    const subCategoryName = subCategoryItem.subCategory;
    if (!groupedSubCategories[subCategoryName]) {
      groupedSubCategories[subCategoryName] = {
        ...subCategoryItem,
        images: [subCategoryItem.images[0]], 
      };
      uniqueSubCategories.push(groupedSubCategories[subCategoryName]);
    } else {
      groupedSubCategories[subCategoryName].images.push(
        subCategoryItem.images[0],
      );
    }
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerView}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image source={imageConstant.crossnew} />
            </TouchableOpacity>
          </View>
          <View style={styles.createFolderView}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                setCreateNewShow(!createNewShow);
              }}>
              <Image source={imageConstant.createnew} />
              <Text style={styles.text}>Create New</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                handleMoveHere();
                props.navigation.navigate('Profile');
              }}>
              <Image source={imageConstant.moveicon} />
              <Text style={styles.text}>Move</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <Image source={imageConstant.searchblack} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={colorConstant.placeholdercolor}
            style={styles.searchTextInput}
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>

        <View style={styles.folderView}>
          {createNewShow && (
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={e => setNewFolderName(e)}
                value={newFolderName}
                placeholder="New Folder Name"
                placeholderTextColor={colorConstant.placeholdercolor}
                style={styles.newFolderNameInput}
              />
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Profile');
                  handleCreateNew();
                }}>
                <Image source={imageConstant.rightarrow} />
              </TouchableOpacity>
            </View>
          )}
          {uniqueSubCategories?.map((subCategoryItem, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.folderNameCotainer,
                selectedSubCategory === subCategoryItem.subCategory &&
                  styles.selectedFolder,
              ]}
              onPress={() =>
                handleSubCategoryPress(subCategoryItem.subCategory)
              }>
              <View style={styles.imageView}>
                <Image
                  source={{uri: subCategoryItem.images[0]}}
                  style={styles.imageStyle}
                />
                <Text style={styles.categoryText}>
                  {subCategoryItem.subCategory}
                </Text>
              </View>
              <Image
                source={
                  selectedSubCategory === subCategoryItem.subCategory
                    ? imageConstant.ticknew
                    : imageConstant.rightarrow
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Folders;

