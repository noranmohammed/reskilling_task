import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Interfaces for Post and State
interface Post {
  id: string;
  title: string;
  body: string;
  userId: number;
}

interface FetchPostsResponse {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalPosts?: number;
  limit: number;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  limit: 10,
};

// Fetch posts
export const fetchPosts = createAsyncThunk<
  FetchPostsResponse,
  { page?: number; limit?: number },
  { rejectValue: string }
>(
  'posts/fetchPosts',
  async ({ page = 1, limit = 50 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/posts?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
    }
  }
);

// Create post
export const createPost = createAsyncThunk<
  Post,
  Post,
  { rejectValue: string }
>(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/posts', postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.post;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create post');
    }
  }
);

// Delete post
export const deletePost = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return postId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete post');
    }
  }
);

// Edit post
export const editPost = createAsyncThunk<
  Post,
  { postId: string; updatedData: Partial<Post> },
  { rejectValue: string }
>(
  'posts/editPost',
  async ({ postId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:8080/posts/${postId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.post;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to edit post');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<FetchPostsResponse>) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalPosts = action.payload.totalPosts;
      })
      .addCase(fetchPosts.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch posts';
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create post';
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete post';
      })
      // Edit post
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(editPost.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to edit post';
      });
  },
});

export const { setLimit, setCurrentPage } = postSlice.actions;
export default postSlice.reducer;