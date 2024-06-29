import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  Time,
} from 'react-native-gifted-chat';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import NewHeader from '../../components/NewHeader';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';
import apiClient from '../../utils/baseUrl';
import LoaderScreen from '../../utils/Loader';
import ImageBlurLoading from 'react-native-image-blur-loading';
import styles from './Styles';
export default function ChatScreen(props) {
  const userProfileData = useSelector(state => state?.auth?.curretUser);
  const stompClient = Stomp.over(new SockJS('http://137.184.130.244:1995/ws'));
  // const stompClient = Stomp.over(new SockJS('http://192.168.163.188:1995/ws'));
  const [messages, setMessages] = useState([]);
  const [rightSideModal, setRightSideModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [username, setUsername] = useState(props?.route?.params?.username);
  const [userImage, setUserImage] = useState(props?.route?.params?.userImage);
  const [chatId, setChatId] = useState(props?.route?.params?.chatId);
  const [isAttachCameraImage, setIsAttachCameraImage] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getAll(chatId);
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    // Check if createdChat is null or undefined before connecting to WebSocket
    if (!chatId) {
      return;
    }

    const connectWebSocket = async () => {
      stompClient.connect({}, () => {
        console.log('WebSocket connection opened');
        stompClient.subscribe(`/user/${chatId}/topic/messages`, message => {
          const newMessage = JSON.parse(message.body);
          setMessages(prevMessages =>
            GiftedChat.append(prevMessages, [newMessage]),
          );
        });
      });
    };

    connectWebSocket();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, []);

  const getAll = async chatId => {
    if (chatId) {
      setLoading(true);
      const res = await apiClient.get(`chat/${chatId}/message`);
      if (res.data.status === 302) {
        setLoading(false);
        setMessages(prevMessages =>
          GiftedChat.append(prevMessages, res.data.data),
        );
      }
      setLoading(false);

      if (!chatId) {
        return;
      }

      const connectWebSocket = async () => {
        stompClient.connect({}, () => {
          console.log('WebSocket connection opened');
          stompClient.subscribe(`/user/${chatId}/topic/messages`, message => {
            const newMessage = JSON.parse(message.body);
            setMessages(prevMessages =>
              GiftedChat.append(prevMessages, [newMessage]),
            );
          });
        });
      };

      connectWebSocket();

      return () => {
        if (stompClient && stompClient.connected) {
          stompClient.disconnect();
        }
      };
    }
  };

  const sendFile = async image => {
    const imageUrl = image;
    const urlSegments = imageUrl.split('/');
    const filename = urlSegments[urlSegments.length - 1];
    const data = new FormData();
    data.append('imagesOrVideos', {
      uri: image,
      name: filename,
      type: 'image/jpeg',
    });
    const res = await apiClient.post(`chat/${chatId}/message/file`, data);

    if (res.status === 200) {
      setMessages(prevMessages =>
        GiftedChat.append(prevMessages, res.data.data),
      );
    }
  };

  const onSend = (newMessages = []) => {
    if (newMessages[0]?.text && image) {
      const newMessage = {
        userId: userProfileData?.id,
        chatId: chatId,
        _id: newMessages[0]?._id || Math.round(Math.random() * 1000000),
        createdAt: null,
        user: newMessages[0]?.user,
        text: newMessages[0]?.text,
      };
      sendFile(image);
      setImage('');
      setIsAttachCameraImage(false);

      const messageToSend = {
        ...newMessage,
        recipient: chatId,
      };

      if (stompClient) {
        stompClient.send('/app/sendMessage', {}, JSON.stringify(messageToSend));
      }
    } else if (!newMessages[0].text && image) {
      const newMessage = {
        userId: userProfileData?.id,
        chatId: chatId,
        _id: newMessages[0]?._id || Math.round(Math.random() * 1000000),
        createdAt: null,
        user: newMessages[0]?.user,
      };
      sendFile(image);
      setImage('');
      setIsAttachCameraImage(false);

      const messageToSend = {
        ...newMessage,
        recipient: chatId,
      };

      if (stompClient) {
        stompClient.send('/app/sendMessage', {}, JSON.stringify(messageToSend));
      }
    } else {
      const newMessage = {
        userId: userProfileData?.id,
        chatId: chatId,
        _id: newMessages[0]?._id || Math.round(Math.random() * 1000000),
        createdAt: null,
        user: newMessages[0]?.user,
        text: newMessages[0]?.text,
      };
      const messageToSend = {
        ...newMessage,
        recipient: chatId,
      };

      if (stompClient) {
        stompClient.send('/app/sendMessage', {}, JSON.stringify(messageToSend));
      }
    }
  };

  const renderBubble = props => {
    const {currentMessage} = props;
    if (currentMessage?.images && currentMessage?.images?.length > 0) {
      return (
        <View>
          {imageUploading && (
            <ActivityIndicator size="small" color={colorConstant.white} />
          )}
          {currentMessage?.images?.map((imageUri, index) => (
            <View key={index}>
              <ImageBlurLoading
                thumbnailSource={{uri: imageUri}}
                source={{uri: imageUri}}
                style={styles.blurLoder}
              />
            </View>
          ))}

          <Text
            style={{
              ...styles.bubble,
              color:
                currentMessage.user._id === userProfileData?.id
                  ? 'white'
                  : 'black',
            }}>
            {currentMessage.text}
          </Text>
        </View>
      );
    }

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#656161',
            borderRadius: 5,
            marginBottom: 5,
          },
          left: {
            backgroundColor: '#D9DADB',
            borderRadius: 5,
            marginBottom: 5,
          },
        }}
        textStyle={{
          right: {
            color: colorConstant.white,
            fontSize: responsiveScreenFontSize(1.7),
            fontFamily: fontConstant.regular,
          },
          left: {
            color: colorConstant.black,
            fontSize: responsiveScreenFontSize(1.7),
            fontFamily: fontConstant.regular,
          },
        }}
      />
    );
  };

  const renderTime = props => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: 'black',
          },
          right: {
            color: 'white',
          },
        }}
      />
    );
  };

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.renderInputMainView}
        textInputStyle={styles.renderInputTextInput}
        primaryStyle={{alignItems: 'center'}}
        renderActions={props => (
          <TouchableOpacity onPress={_cameraCall}>
            <Image
              source={imageConstant.camerawhite}
              style={{...styles.icon, marginLeft: 5}}
            />
          </TouchableOpacity>
        )}></InputToolbar>
    );
  };

  const _galleryCall = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
      }).then(image => {
        if (image.path !== '') {
          setImage(image.path);

          setIsAttachCameraImage(true);
        } else {
          setImage('');
        }
      });
    } catch (error) {}
  };

  const _cameraCall = async () => {
    try {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
      }).then(image => {
        if (image.path !== '') {
          setImage(image.path);
          setIsAttachCameraImage(true);
        } else {
          setImage('');
        }
      });
    } catch (error) {}
  };

  const renderChatFooter = useCallback(() => {
    if (image) {
      return (
        <View style={styles.renderChatFooterView}>
          <Image source={{uri: image}} style={styles.renderChatFooterImage} />
          <TouchableOpacity
            onPress={() => setImage('')}
            style={styles.renderFooterCrossImage}>
            <Image source={imageConstant.crossnew} />
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  }, [image]);

  const renderSend = props => {
    const {text, onSend} = props;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={_galleryCall}>
          <Image source={imageConstant.clip} style={styles.imgStyle} />
        </TouchableOpacity>
        <View>
          <Send
            {...props}
            sendButtonProps={{onPress: () => onSend([{text: text}], true)}}>
            <Image source={imageConstant.send} style={styles.imgStyle} />
          </Send>
        </View>
      </View>
    );
  };

  const goToSearch = () => {
    props.navigation.navigate('SearchChat', {
      chatId: chatId,
    });
    setRightSideModal(false);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LoaderScreen data={loading} />
      <NewHeader
        title={username}
        navigation={props.navigation}
        rightNavigation={() => setRightSideModal(true)}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{flex: 1}} enabled>
          <GiftedChat
            messages={messages}
            onSend={newMessages => onSend(newMessages)}
            user={{
              _id: userProfileData?.id,
              name: userProfileData?.username,
              avatar: userProfileData?.userImage,
            }}
            renderBubble={renderBubble}
            renderTime={renderTime}
            renderSend={renderSend}
            alwaysShowSend
            renderInputToolbar={props => renderInputToolbar(props)}
            renderChatFooter={renderChatFooter}
            scrollToBottom={true}
            InputToolbar={null}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {/* right side modal */}
      <Modal
        isVisible={rightSideModal}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        onBackdropPress={() => setRightSideModal(false)}
        onBackButtonPress={() => setRightSideModal(false)}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropOpacity={0}
        style={styles.sideRightMainView}>
        <View style={styles.rightSideModalRow}>
          <Image
            source={{uri: userImage}}
            style={{
              ...styles.sideModalImage,
              borderWidth: 1,
              borderColor: colorConstant.lightWhite,
            }}
          />
          <TouchableOpacity style={styles.sideModalProfileTextView}>
            <Text style={styles.sideModalProfileText}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightSideModalRow}>
          <Image
            source={imageConstant.searchblack}
            style={styles.sideModalImage}
          />
          <TouchableOpacity
            style={styles.sideModalProfileTextView}
            onPress={goToSearch}>
            <Text style={styles.sideModalProfileText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightSideModalRow}>
          <Image source={imageConstant.info} style={styles.sideModalImage} />
          <View style={styles.sideModalProfileTextView}>
            <Text style={{...styles.sideModalProfileText, color: 'red'}}>
              Report
            </Text>
          </View>
        </View>
        <View style={styles.rightSideModalRow}>
          <Image source={imageConstant.block} style={styles.sideModalImage} />
          <View style={styles.sideModalProfileTextView}>
            <Text style={{...styles.sideModalProfileText, color: 'red'}}>
              Block
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
