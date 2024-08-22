import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticlesState } from '../types/interfaces';

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
};

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
});

export const { fetchArticlesStart, fetchArticlesSuccess, fetchArticlesFailure, addArticle } = articlesSlice.actions;
export default articlesSlice.reducer;