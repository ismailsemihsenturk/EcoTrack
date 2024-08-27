import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Article, ArticlesState } from '../types/interfaces';
import { getArticles } from '../services/firestore';

const initialState: ArticlesState = {
  articles: [] as Article[],
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk(
  'tips/fetchTips',
  async () => {
    const response = await getArticles();
    return response;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    fetchArticlesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchArticlesSuccess: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
      state.loading = false;
    },
    fetchArticlesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addArticle: (state, action: PayloadAction<Article>) => {
      state.articles.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { fetchArticlesStart, fetchArticlesSuccess, fetchArticlesFailure, addArticle } = articlesSlice.actions;
export default articlesSlice.reducer;