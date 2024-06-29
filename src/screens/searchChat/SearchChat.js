import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import CommonTextInput from '../../components/CommonTextInput';
import apiClient from '../../utils/baseUrl';
import moment from 'moment';

export default function SearchChat(props) {
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);

  const chatId = props?.route?.params?.chatId;
  const getSearchData = async text => {
    setSearchText(text);
    try {
      const res = await apiClient.get(
        `chat/${chatId}/message/search?search=${searchText}`,
      );
      if (res.status == 200) {
        setSearchList(res.data.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={styles.rowView}
      
        // onPress={() => {
        //   props.navigation.navigate('ChatScreen', {
        //     username: item?.user?.name,
        //     chatId: item?.chatId,
        //     userImage: item?.user?.userImage,
        //   });
        // }}
        >
        <Image source={{uri: item?.user?.userImage}} style={styles.userImage} />
        <View>
          <Text style={styles.name}>{item?.user?.name}</Text>

          <Text style={styles.content} numberOfLines={1}>
            {item?.content}
            <Text style={styles.date}>
              {' '}
              {moment(item?.timeStamp).format('LL')}
            </Text>
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={imageConstant.whitearrow} style={styles.backArrow} />
        </TouchableOpacity>

        <CommonTextInput
          width={responsiveScreenWidth(80)}
          height={responsiveScreenHeight(5.5)}
          marginTop={1}
          value={searchText}
          onChangeText={getSearchData}
          placeholder={'Search'}
        />
      </View>

      <FlatList
        data={searchList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.black,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(95),
  },
  backArrow: {
    width: 70,
    height: 70,
    marginLeft: -10,
    marginRight: -10,
  },
  rowView: {
    width: responsiveScreenWidth(95),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    gap: 13,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colorConstant.lightWhite,
  },
  name: {
    fontFamily: fontConstant.bold,
    fontSize: responsiveScreenFontSize(2.1),
    color: colorConstant.white,
  },
  date: {
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2.1),
    color: colorConstant.gray,
  },
  content: {
    fontFamily: fontConstant.regular,
    fontSize: responsiveScreenFontSize(2.1),
    color: colorConstant.white,
  },
});
