import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/products'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 0, size = 12, category, search } = {}) => {
    const params = new URLSearchParams({ page, size })
    if (category) params.append('category', category)
    if (search) params.append('search', search)
    
    const response = await axios.get(`${API_URL}?${params}`)
    return response.data
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await axios.get(`${API_URL}/categories`)
    return response.data
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null,
    categories: [],
    totalPages: 0,
    currentPage: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.content
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.number
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

export const { clearCurrentProduct } = productSlice.actions
export default productSlice.reducer