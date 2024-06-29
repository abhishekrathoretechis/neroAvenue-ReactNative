import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import toastShow from '../../utils/Toast';
import authStorage from '../../utils/authStorage';
import api from './../../utils/baseUrl';

export const loginUser = createAsyncThunk('login', async (data, thunkApi) => {
  try {
    thunkApi.dispatch(showLoader());
    const res = await api.post('user/login', data);
    console.log('authslice----->', res.data);
    await AsyncStorage.setItem('email', data?.username);
    if (
      res.status === 200 &&
      res.data ===
        'Please check and verify your email to complete the profile setup.'
    ) {
      toastShow(res.data, 'red');
      thunkApi.dispatch(hideLoader());
      return res.data;
    } else if (res.status === 200) {
      await authStorage.storeToken(res.data.accessToken);
      await AsyncStorage.setItem('forgotPassword', res.data.forgotPassword);
      thunkApi.dispatch(hideLoader());
      return res.data;
    } else {
      thunkApi.dispatch(hideLoader());
      toastShow('Invalid username and password', 'red');
    }
  } catch (err) {
    thunkApi.dispatch(hideLoader());
    console.log('error--------->>', err);
  }
});

export const signupUser = createAsyncThunk('signup', async (data, thunkApi) => {
  try {
    thunkApi.dispatch(showLoader());
    const res = await api.post('user/register', data);
    if (res.data.data === 'true') {
      thunkApi.dispatch(hideLoader());
      // toastShow(res.data.message, 'red');
    } else if (res.data.status === 200) {
      thunkApi.dispatch(hideLoader());

      toastShow(
        'User registered successfully. Please check the email and complete the account verification.',
        'lightgreen',
      );
    } else {
      thunkApi.dispatch(hideLoader());
      toastShow(res.data.message, 'red');
    }
    return res.data;
  } catch (err) {
    thunkApi.dispatch(hideLoader());
    console.log('error', err);
  }
});

export const postOtp = createAsyncThunk('postOtp', async (data, thunkApi) => {
  try {
    thunkApi.dispatch(showLoader());
    const res = await api.post('user/otp', data);

    if (res.data.status === 200) {
      thunkApi.dispatch(hideLoader());
      toastShow(res.data.message, 'lightgreen');
    } else {
      thunkApi.dispatch(hideLoader());
      toastShow(res.data.message, 'red');
    }
  } catch (err) {
    thunkApi.dispatch(hideLoader());
    console.log('error', err);
  }
});

export const putOtpVerify = createAsyncThunk(
  'putOtpVerify',

  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put('user/verify', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());

        toastShow(res.data.message, 'lightgreen');

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());

        toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const putUserProfileSetup = createAsyncThunk(
  'putUserProfileSetup',

  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put('user/profile/setup', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        toastShow(res.data.message, 'lightgreen');

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());

        toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const putUserProfileSetupUsername = createAsyncThunk(
  'putUserProfileSetupUsername',

  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put('user/profile/setup/username', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'lightgreen');

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());

        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const userProfileDetails = createAsyncThunk(
  'userProfileDetails',
  async (_, thunkApi) => {
    try {
      // thunkApi.dispatch(showLoader());
      const res = await api.get('user/profile');
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getUsernameFollowers = createAsyncThunk(
  'getUsernameFollowers',
  async (_, thunkApi) => {
    try {
      // thunkApi.dispatch(showLoader());
      const res = await api.get('user/followers/username');
      if (res.status === 200) {
        // thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        // thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      // thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getAllTags = createAsyncThunk(
  'getAllTags',
  async (data, thunkApi) => {
    try {
      // thunkApi.dispatch(showLoader());
      const res = await api.get(`post/tags?type=${data}`);
      if (res.status === 200) {
        // thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        // thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      // thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const createTagsPost = createAsyncThunk(
  'createTagsPost',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.post('post/tags/create', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());

        // toastShow(res.data.message);
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const userProfileUpdate = createAsyncThunk(
  'userProfileUpdate',

  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put('user/update', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        toastShow(res.data.message, 'lightgreen');
        thunkApi.dispatch(userProfileDetails());

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());

        toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const userNeroMags = createAsyncThunk(
  'userNeroMags',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(
        `mags/all?page=${data.page}&itemSize=${data.itemSize}`,
      );
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const allMagzData = createAsyncThunk(
  'allMagzData',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(`mags/all`);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);
export const getAllSearch = createAsyncThunk(
  'getAllSearch',
  async (data, thunkApi) => {
    try {
      // thunkApi.dispatch(showLoader());
      const res = await api.get(
        `post/all/search?type=${data.type}&search=${data.search}&page=${data.page}&itemSize=${data.itemSize}`,
      );
      console.log('search data--------->>', res?.data);

      if (res.status === 200) {
        // thunkApi.dispatch(hideLoader());

        return res?.data?.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      // thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const getUserPost = createAsyncThunk(
  'getUserPost',
  async (id, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(`post/all/${id}`);

      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getNotification = createAsyncThunk(
  'getNotification',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(`notifications`);

      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const InvateFriends = createAsyncThunk(
  'InvateFriends',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.post('user/invate', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());

        thunkApi.dispatch(getDashboardPostAll());
        // toastShow(res.data.message,'green');
        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message,'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const createAllPost = createAsyncThunk(
  'createAllPost',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.post('post', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());

        thunkApi.dispatch(getDashboardPostAll());
        // toastShow(res.data.message,'green');
        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message,'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const createAllMagz = createAsyncThunk(
  'createAllMagz',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.post('magz', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        thunkApi.dispatch(userNeroMags());
        // toastShow(res.data.message,'green');
        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message,'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const createChat = createAsyncThunk(
  'createChat',
  async (id, thunkApi) => {
    try {
      const res = await api.post(`chat?userId=${id}`);
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (err) {
      console.log('error', err);
    }
  },
);

export const sendImageOrVideoInChat = createAsyncThunk(
  'sendImageOrVideoInChat',
  async (data, thunkApi) => {
    const sendData = {
      imageFile: data.data,
    };
    console.log('sendData------->>', sendData);
    try {
      const res = await api.post(`chat/${data.chatId}/message/file`, sendData);
      console.log('res.data.data;------------>>', res.data.data);
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (err) {
      console.log('error', err);
    }
  },
);
export const getAllChatAndMessage = createAsyncThunk(
  'getAllChatAndMessage',
  async (id, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(`chat/${id}/message`);
      if (res.data.status === 302) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        return res.data;
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const createChatMessage = createAsyncThunk(
  'createChatMessage',
  async (id, thunkApi) => {
    try {
      const res = await api.post(`chat/${id}/message`);
      if (res.data === 200) {
        return res.data.data;
      } else {
        return res.data;
      }
    } catch (err) {
      console.log('error', err);
    }
  },
);

export const getChatListUser = createAsyncThunk(
  'getChatListUser',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(`chat/users`);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());

        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const getAllComment = createAsyncThunk(
  'getAllComment',
  async (id, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(`comment/${id}`);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());

        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const getAllNestedComment = createAsyncThunk(
  'getAllNestedComment',
  async (id, thunkApi) => {
    try {
      const res = await api.get(`comment/${id}/nested`);
      if (res.status === 200) {
        return res.data.data;
      } else {
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      console.log('error', err);
    }
  },
);

export const postAllComment = createAsyncThunk(
  'postAllComment',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const commentData = {
        comment: data.comment,
      };
      const res = await api.post(`post/${data.id}/comment/create`, commentData);

      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res?.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const postAllNestedComment = createAsyncThunk(
  'postAllNestedComment',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      console.log('data-------->>', data);
      const commentData = {
        comment: data.comment,
      };
      const res = await api.post(`comment/${id}/nested`, commentData);

      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res?.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getPostById = createAsyncThunk(
  'getPostById',
  async (id, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(`post/${id}`);

      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllPost());

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const getMagzById = createAsyncThunk(
  'getMagzById',
  async (id, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(`magz/${id}`);

      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const putLikeComment = createAsyncThunk(
  'putLikeComment',

  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put(`comment/${data}/like`);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllPost());

        // toastShow(res.data.message);
        // toastShow('like comment','lightgreen');

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const putUnlikeComment = createAsyncThunk(
  'putUnlikeComment',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());

      const res = await api.put(`comment/${data}/unlike`);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllPost());

        // toastShow(res.data.message);
        // toastShow('unlike comment', 'lightgreen');
        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const putLikePost = createAsyncThunk(
  'putLikePost',

  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put(`post/${data}/like`);

      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllPost());
        // toastShow(res.data.message, 'green');

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const putUnlikePost = createAsyncThunk(
  'putUnlikePost',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put(`post/${data}/unlike`);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllPost());

        // toastShow(res.data.message, 'lightgreen');
        // console.log('unlike----------->>', res.data);
        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getAllPost = createAsyncThunk(
  'getAllPost',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get('post/all');
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getDashboardPostAll = createAsyncThunk(
  'getDashboardPostAll',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get('post/all');
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message, 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const putSavePost = createAsyncThunk(
  'putSavePost',

  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put(`post/${data}/save`);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllPost());

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const putUnsavePost = createAsyncThunk(
  'putUnsavePost',

  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put(`post/${data}/unsave`);

      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllPost());

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const putFollowing = createAsyncThunk(
  'putFollowing',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put(`user/${data}/follow`);

      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllPost());

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const putUnfollowing = createAsyncThunk(
  'putUnfollowing',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put(`user/${data}/unfollow`);

      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllPost());

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getAllCountryName = createAsyncThunk(
  'getAllCountryName',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get('user/country');
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);
export const getUserFollowing = createAsyncThunk(
  'getUserFollowing',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get('user/followingUsers');
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getOtherProfile = createAsyncThunk(
  'getOtherProfile',
  async (id, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(`user/${id}/other`);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const reportPost = createAsyncThunk(
  'reportPost',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.post('post/report', data);
      console.log('report res-------->>', res);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllPost());
        // toastShow('Thanks for reporting this post We have received your feedback and will take necessary action to keep the community safe.','lightgreen')
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message,'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const giveCredit = createAsyncThunk(
  'giveCredit',
  async (data, thunkApi) => {
    try {
      const res = await api.post(`credit/${data.id}`, data.creditData);
      if (res.status === 200) {
        return res.data.data;
      } else {
      }
    } catch (err) {
      console.log('error', err);
    }
  },
);

export const updateSubCategory = createAsyncThunk(
  'updateSubCategory',

  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put('user/post/subCategory', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);

        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);
export const getAllSubCategory = createAsyncThunk(
  'getAllSubCategory',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get('user/post/subCategory/getall');
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getAllHomePost = createAsyncThunk(
  'getAllHomePost',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(
        `post/all/home?page=${data.page}&itemSize=${data.itemSize}`,
      );
      console.log('res home page----->>', res.data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data.content;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getAllHomePostDetails = createAsyncThunk(
  'getAllHomePostDetails',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(
        `post/${data.postId}/home?page=${data.page}&itemSize=${data.itemSize}`,
        // `post/${data.postId}/home`,
      );
      console.log('res home deatils------------->>', res.data.data.content);

      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data.content;
        // return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getAllGalleryPost = createAsyncThunk(
  'getAllGalleryPost',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get(
        `post/all/galary?page=${data.page}&itemSize=${data.itemSize}`,
      );
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        return res.data.data.content;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const getAllByUserPost = createAsyncThunk(
  'getAllByUserPost',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.get('user/all/post');
      // console.log('res user post---------->>',res)
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // console.log('res user data post---------->>',res.data)

        return res.data.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message);
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const changePassword = createAsyncThunk(
  'changePassword',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.patch('user/change/password', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());

        toastShow(res.data.message, 'lightgreen');
        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message,'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);

export const ForgetPaaword = createAsyncThunk(
  'ForgetPaaword',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.patch('user/forgotPassword', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());

        toastShow(
          'Reset password link has been sent to your registered email address.',
          'lightgreen',
        );
        return res.data;
      } else {
        thunkApi.dispatch(hideLoader());
        toastShow('Sorry, this ID is not registered with us.', 'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());

      console.log('error', err);
    }
  },
);
export const hidePost = createAsyncThunk('hidePost', async (data, thunkApi) => {
  try {
    thunkApi.dispatch(showLoader());
    const res = await api.post('post/hide', data);
    console.log('res hide------------>>', res);
    if (res.status === 200) {
      thunkApi.dispatch(hideLoader());
      // thunkApi.dispatch(getAllPost());
      // toastShow("You won't see this post again We will use your feedback to improve our algorithm to offer you a better experience.",'lightgreen');
    } else {
      thunkApi.dispatch(hideLoader());
      // toastShow(res.data.message,'red');
    }
  } catch (err) {
    thunkApi.dispatch(hideLoader());
    console.log('error', err);
  }
});

export const putUserHidePost = createAsyncThunk(
  'putUserHidePost',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put('user/post/hide', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllByUserPost());
        return res;
        // toastShow(res.data.message,'lightgreen');
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message,'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);

export const putUserShowPost = createAsyncThunk(
  'putUserShowPost',
  async (data, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const res = await api.put('user/post/show', data);
      if (res.status === 200) {
        thunkApi.dispatch(hideLoader());
        // thunkApi.dispatch(getAllByUserPost());
        // toastShow(res.data.message,'lightgreen');
        return res;
      } else {
        thunkApi.dispatch(hideLoader());
        // toastShow(res.data.message,'red');
      }
    } catch (err) {
      thunkApi.dispatch(hideLoader());
      console.log('error', err);
    }
  },
);
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    curretUser: null,
    authToken: null,
    loader: false,
    forgotPasswordFlag: false,
    loadingText: '',
    userPost: null,
    searchData: {
      content: [],
      page: 1, // Initial page
    },
    searchDetails: [],
    neroMags: null,
    notification: null,
    allPost: null,
    allComment: null,
    createPost: null,
    invate: null,
    getPostId: null,
    getMagzId: null,
    likedPosts: [],
    savedPosts: [],
    followStatus: false,
    likedComments: {},
    getTags: null,
    dashboardAllPost: null,
    getCountry: null,
    magz: null,
    userFollowing: null,
    otherProfile: null,
    postSaveStatus: [],
    posts: [],
    userFollowing: {},
    getSubCategory: null,
    usernameFollowers: null,
    home: {
      content: [],
      loading: false,
      page: 1, // Initial page
    },
    postDetails: [],
    homeDetails: {
      content: [],
      loading: false,
      page: 1, // Initial page
    },
    // homeDetails: null,
    userAllPost: null,
    galleryPost: {
      content: [],
      loading: false,
      page: 1, // Initial page
    },
    createdChat: null,
    getAllMessage: null,
    getChatList: null,
    getNestedComment: null,
  },

  reducers: {
    showLoader: (state, action) => {
      state.loader = true;
      state.loadingText = action.payload;
    },

    hideLoader: (state, action) => {
      state.loader = false;
    },
    setForgotPasswordFlag: (state, action) => {
      state.forgotPasswordFlag = action.payload;
    },

    updateLikedPostStatus: (state, action) => {
      const {postId, isLiked} = action.payload;

      if (isLiked) {
        state.likedPosts.push(postId); // Add the post ID to the liked list
      } else {
        state.likedPosts = state.likedPosts.filter(id => id !== postId); // Remove the post ID from the liked list
      }
    },

    updateSavedPostStatus: (state, action) => {
      const {postId, isSaved} = action.payload;

      if (isSaved) {
        state.savedPosts.push(postId); // Add the post ID to the liked list
      } else {
        state.savedPosts = state.savedPosts.filter(id => id !== postId); // Remove the post ID from the liked list
      }
    },

    putSavePost: (state, action) => {
      const {postId} = action.payload;
      return {
        ...state,
        postSaveStatus: [...state.postSaveStatus, {postId, isSaved: true}],
      };
    },
    putUnsavePost: (state, action) => {
      const {postId} = action.payload;
      return {
        ...state,
        postSaveStatus: state.postSaveStatus.filter(
          item => item.postId !== postId,
        ),
      };
    },

    updateFollowStatus(state, action) {
      state.followStatus = action.payload;
    },

    putLikeCommentUpdate(state, action) {
      const {commentId} = action.payload;
      state.likedComments[commentId] = true;
    },

    putUnlikeCommentUpdate(state, action) {
      const {commentId} = action.payload;
      state.likedComments[commentId] = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.authToken = action.payload;
    });
    builder.addCase(signupUser.fulfilled, () => {});

    builder.addCase(userProfileDetails.fulfilled, (state, action) => {
      state.curretUser = action.payload;
    });

    builder.addCase(getUserPost.fulfilled, (state, action) => {
      state.userPost = action.payload;
    });

    builder.addCase(userNeroMags.fulfilled, (state, action) => {
      state.neroMags = action.payload;
    });

    builder.addCase(getNotification.fulfilled, (state, action) => {
      state.notification = action.payload;
    });
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.allPost = action.payload;
    });

    builder.addCase(getDashboardPostAll.fulfilled, (state, action) => {
      state.dashboardAllPost = action.payload;
    });

    builder.addCase(getAllComment.fulfilled, (state, action) => {
      state.allComment = action.payload;
    });
    builder.addCase(InvateFriends.fulfilled, (state, action) => {
      state.invate = action.payload;
    });

    builder.addCase(createAllPost.fulfilled, (state, action) => {
      state.createPost = action.payload;
    });

    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.getPostId = action.payload;
    });
    builder.addCase(getMagzById.fulfilled, (state, action) => {
      state.getMagzId = action.payload;
    });

    builder.addCase(getAllTags.fulfilled, (state, action) => {
      state.getTags = action.payload;
    });

    builder.addCase(getAllCountryName.fulfilled, (state, action) => {
      state.getCountry = action.payload;
    });

    builder.addCase(allMagzData.fulfilled, (state, action) => {
      state.magz = action.payload;
    });

    builder.addCase(getUserFollowing.fulfilled, (state, action) => {
      state.userFollowing = action.payload;
    });

    builder.addCase(getOtherProfile.fulfilled, (state, action) => {
      state.otherProfile = action.payload;
    });
    builder.addCase(getAllSubCategory.fulfilled, (state, action) => {
      state.getSubCategory = action.payload;
    });
    builder
      // ... other extraReducers
      .addCase(getAllHomePost.pending, state => {
        state.home.loading = true;
      })
      .addCase(getAllHomePost.fulfilled, (state, action) => {
        state.home.loading = false;
        state.home.content = [...state.home.content, ...action.payload];
        state.home.page += 1; // Increment the page for the next request
      })
      .addCase(getAllHomePost.rejected, state => {
        state.home.loading = false;
      });
    builder.addCase(getAllByUserPost.fulfilled, (state, action) => {
      state.userAllPost = action.payload;
    });
    builder
      .addCase(getAllGalleryPost.pending, state => {
        state.galleryPost.loading = true;
      })
      .addCase(getAllGalleryPost.fulfilled, (state, action) => {
        state.galleryPost.loading = false;
        state.galleryPost.content = [
          ...state.galleryPost.content,
          ...action.payload,
        ];
        state.galleryPost.page += 1; // Increment the page for the next request
      })
      .addCase(getAllGalleryPost.rejected, state => {
        state.galleryPost.loading = false;
      });
    builder
      .addCase(getAllHomePostDetails.pending, state => {
        state.homeDetails.loading = true;
      })
      .addCase(getAllHomePostDetails.fulfilled, (state, action) => {
        state.homeDetails.loading = false;
        state.homeDetails.content = [
          ...state.homeDetails.content,
          ...action.payload,
        ];
        state.homeDetails.page += 1; // Increment the page for the next request
        state.postDetails = action.payload;
      })
      .addCase(getAllHomePostDetails.rejected, state => {
        state.homeDetails.loading = false;
      });

    builder.addCase(getAllSearch.fulfilled, (state, action) => {
      const responseData = action.payload;
      const newContent = responseData?.content || [];

      if (newContent.length > 0) {
        // If data is found, update state
        state.searchData.content = [
          ...state?.searchData?.content,
          ...newContent,
        ];
        state.searchData.page += 1;
        state.searchDetails = newContent;
      } else {
        state.searchData.content = [];
        state.searchData.page = 1;
        state.searchDetails = null;
      }
    });

    builder.addCase(getUsernameFollowers.fulfilled, (state, action) => {
      state.usernameFollowers = action.payload;
    });
    builder.addCase(createChat.fulfilled, (state, action) => {
      state.createdChat = action.payload;
    });
    builder.addCase(getAllChatAndMessage.fulfilled, (state, action) => {
      state.getAllMessage = action.payload;
    });
    builder.addCase(getChatListUser.fulfilled, (state, action) => {
      state.getChatList = action.payload;
    });
    builder.addCase(getAllNestedComment.fulfilled, (state, action) => {
      state.getNestedComment = action.payload;
    });
  },
});

export const {
  showLoader,
  hideLoader,
  updateLikedPostStatus,
  updateSavedPostStatus,
  updateFollowStatus,
  updateLikedCommentStatus,
  putLikeCommentUpdate,
  putUnlikeCommentUpdate,
  setForgotPasswordFlag,
} = authSlice.actions;

export default authSlice.reducer;
