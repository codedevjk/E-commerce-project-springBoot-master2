import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/cart'

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState }) => {
    const token = getState().auth.token
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { getState }) => {
    const token = getState().auth.token
    const response = await axios.post(`${API_URL}/add`, 
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { getState }) => {
    const token = getState().auth.token
    const response = await axios.put(`${API_URL}/update/${itemId}`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { getState }) => {
    const token = getState().auth.token
    await axios.delete(`${API_URL}/remove/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return itemId
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.total = action.payload.total
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.total = action.payload.total
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.total = action.payload.total
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      })
  },
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer