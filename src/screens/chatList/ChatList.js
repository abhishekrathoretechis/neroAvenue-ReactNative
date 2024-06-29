import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorConstant, imageConstant} from '../../utils/constant';
import NewHeader from '../../components/NewHeader';
import {useDispatch, useSelector} from 'react-redux';
import {createChat, getChatListUser} from '../../redux/reducers/authSlice';
import LoaderScreen from '../../utils/Loader';
import styles from './Styles';
const ChatList = props => {
  const dispatch = useDispatch();
  const {getChatList} = useSelector(state => state?.auth);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filtered = getChatList?.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [searchText, getChatList]);

  useEffect(() => {
    dispatch(getChatListUser());
  }, []);

  const sendIdForCreateChat = async item => {
    setLoading(true);
    const x = await dispatch(createChat(item?._id)).unwrap();
    if (x.chatId !== null || x.chatId !== undefined || x.chatId !== '') {
      setLoading(false);
      props.navigation.navigate('ChatScreen', {
        username: item.name,
        chatId: x.chatId,
        userImage: item.avatar,
      });
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => sendIdForCreateChat(item)}>
      <View key={item.id} style={styles.usernameContainer}>
        <View style={styles.left}>
          <View style={styles.profilepic}>
            {item.avatar !== null ? (
              <Image
                source={{uri: item.avatar}}
                style={styles.profilepicstyle}
              />
            ) : (
              <View style={styles.profileImgView}>
                <Text style={styles.profileImgText}>
                  {item?.name?.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Image
              source={
                item?.userType === 'collectors'
                  ? imageConstant?.nerocollector
                  : item?.userType === 'alliance'
                  ? imageConstant?.neroalliance
                  : item?.userType === 'inner circle'
                  ? imageConstant?.nerocircle
                  : null
              }
              style={styles.sideiconstyle}
            />
          </View>
          <View style={styles.username}>
            <Text style={styles.usernamestyle}>
              {item.name.charAt(0).toUpperCase() +
                item.name.slice(1).toLowerCase()}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.timestyle}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.linestyle}></View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.maincontainer}>
      <LoaderScreen data={loading} />

      <NewHeader navigation={props.navigation} title={'Messages'} />
      <View style={styles.textinputcontainer}>
        <View style={styles.modaltextinput}>
          <Image source={imageConstant.searchblack} style={styles.searchicon} />
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
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item?._id?.toString()}
        renderItem={renderItem}
        style={styles.flatlistStyle}
      />
    </View>
  );
};

export default ChatList;

