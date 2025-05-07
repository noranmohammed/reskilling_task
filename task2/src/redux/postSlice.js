import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ({ page = 1, limit = 50 }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:8080/posts?page=${page}&limit=${limit}`);
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const createPost = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
    try {
      console.log('Sending post data to API:', postData); // Debug log
      const response = await axios.post('http://localhost:8080/posts', postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.post; // Assuming the API returns { post: {...} }
    } catch (error) {
      console.error('Error from API:', error.response?.data?.message || error.message); // Debug log
      return rejectWithValue(error.response?.data?.message || 'Failed to create post');
    }
  });

// Delete post
export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:8080/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return postId; 
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
export const editPost = createAsyncThunk('posts/editPost', async ({ postId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:8080/posts/${postId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.post; 
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  });


const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  },
  reducers: {
    setLimit(state, action) {
     state.limit = action.payload; 
    },
     setCurrentPage(state, action) {
        state.currentPage = action.payload; 
      },
   },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalPosts = action.payload.totalPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        // Edit post
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload; // Update the post in the state
        }
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setLimit, setCurrentPage } = postSlice.actions;
export default postSlice.reducer;