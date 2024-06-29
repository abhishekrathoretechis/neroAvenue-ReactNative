import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import client from '../../utils/baseUrl';
import LoaderScreen from '../../utils/Loader';
import {getUniqArrayByCommentId} from '../../utils/functions';
import MyMagzineDetailsScreen from '../myMagzineDetailsScreen/MyMagzineDetailsScreen';

import styles from './Styles';
const MagzScrollProfileScreen = props => {
  const windowHeight = Dimensions.get('window').height;
  const magzData = props?.route?.params?.singleMagzData;
  const [magzList, setMagzList] = useState([]);
  const [zero, setZero] = useState(false);
  const [ppostid, setPpostid] = useState(magzData?.postId);
  const itemsPerLoad = 30;
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [activeIndex, setActiveIndex] = useState();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getMagzData(1, true);
    });
    return unsubscribe;
  }, [props.navigation]);

  const getMagzData = (page, isFirstTime = false) => {
    setLoading(true);
    client
      .get(
        `magz/${ppostid}/mymagzdetails?page=${page}&itemSize=${itemsPerLoad}`,
      )
      .then(res => {
        setLoading(false);
        if (res?.status === 200) {
          const result = res?.data?.data;
          setMagzList(isFirstTime ? result : [...magzList, ...result]);
          if (magzList.length > 0) {
            setZero(true);
          }
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };
  const handeCmntAndLikeCountInPosts = (pstId, ttlCmts) => {
    const reqPosts = magzList?.map(post => {
      if (post?.postId === pstId) {
        return {...post, totalComments: ttlCmts};
      }
      return post;
    });
    setMagzList(reqPosts);
  };

  const handleCommentByPostId = (pstId, isInitial = false, page = 1) => {
    setLoading(true);
    client
      .get(`post/${pstId}/comments?page=${page}&itemSize=${itemsPerLoad}`)
      .then(res => {
        const result = res?.data?.data ?? [];
        setCommentList(
          isInitial
            ? result
            : getUniqArrayByCommentId([...commentList, ...result]),
        );
        handeCmntAndLikeCountInPosts(pstId, res?.data?.totalComments);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const handleUpdateFollowStatusInPosts = (userId, status) => {
    const reqPosts = magzList?.map(mag => {
      if (mag?.user?.id === userId) {
        return {...mag, follow: status};
      }
      return mag;
    });
    setMagzList(reqPosts);
  };

  const handleUpdateLikeStatusInPosts = (pstId, status) => {
    const reqMags = magzList?.map(mag => {
      if (mag?.postId === pstId) return status;
      return mag;
    });
    setMagzList(reqMags);
  };

  const handleUpdateSaveStatusInPosts = (pstId, status) => {
    const reqPosts = magzList?.map(post => {
      if (post?.postId === pstId) {
        return {...post, savePost: status};
      }
      return post;
    });
    setMagzList(reqPosts);
  };

  const handleUpdateCommentLikes = data => {
    const reqComments = commentList?.map(cmt => {
      if (cmt?.commentId === data?.commentId) return data;
      return cmt;
    });
    setCommentList(reqComments);
  };

  return (
    <View style={styles.carousel}>
      <LoaderScreen data={loading} />
     

      {magzList  && (
        <Carousel
          firstItem={magzList.slice(0, 10).length - 1}
          layout={'stack'}
          data={magzList.slice(0, 10)}
          sliderHeight={300}
          itemHeight={windowHeight}
          vertical={true}
          renderItem={({item, index}) => (
            <MyMagzineDetailsScreen
              item={item}
              index={index}
              navigation={props.navigation}
              updateFollowStatus={handleUpdateFollowStatusInPosts}
              updateLikeStatus={handleUpdateLikeStatusInPosts}
              updateSaveStatus={handleUpdateSaveStatusInPosts}
              updateCommentsLike={handleUpdateCommentLikes}
              handleCommentByPostId={handleCommentByPostId}
              handeCmntAndLikeCountInPosts={handeCmntAndLikeCountInPosts}
              commentList={commentList}
              setCommentList={setCommentList}
            />
          )}
          onSnapToItem={index => setActiveIndex(index)}
        />
      )}
    </View>
  );
};

export default MagzScrollProfileScreen;

