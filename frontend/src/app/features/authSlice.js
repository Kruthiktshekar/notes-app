import { axiosApi } from '@/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post('/signin', { user_email:email, password:password, user_name:username });
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post('/login', { user_email:email, password:password });
      localStorage.setItem('token', res.data.access_token);
      if(res){
        const userDataRes = await axiosApi.get('/user', {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`,
          },
        });
        console.log(userDataRes)
        return { token: localStorage.getItem('token'), userData: userDataRes.data };
      }
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token:  null,
    userData: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(signInUser.fulfilled, (state, action) => {
      state.loading = false;
    })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userData = action.payload.userData
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
