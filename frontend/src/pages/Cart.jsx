import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Box,
  Divider,
} from '@mui/material'
import { Add, Remove, Delete } from '@mui/icons-material'
import { fetchCart, updateCartItem, removeFromCart } from '../store/slices/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, total, isLoading } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const handleUpdateQuantity = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change
    if (newQuantity > 0) {
      dispatch(updateCartItem({ itemId, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId))
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="md" className="py-16 text-center">
        <Typography variant="h4" className="mb-4">
          Your cart is empty
        </Typography>
        <Button component={Link} to="/products" variant="contained">
          Continue Shopping
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" className="py-8">
      <Typography variant="h3" className="mb-8 font-bold">
        Shopping Cart
      </Typography>

      {items.map((item) => (
        <Card key={item.id} className="mb-4">
          <CardContent>
            <Box className="flex items-center space-x-4">
              <img
                src={item.product.imageUrl || 'https://via.placeholder.com/100'}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded"
              />
              <Box className="flex-grow">
                <Typography variant="h6">{item.product.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${item.product.price}
                </Typography>
              </Box>
              <Box className="flex items-center space-x-2">
                <IconButton
                  onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                  size="small"
                >
                  <Remove />
                </IconButton>
                <Typography variant="body1" className="mx-2">
                  {item.quantity}
                </Typography>
                <IconButton
                  onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                  size="small"
                >
                  <Add />
                </IconButton>
              </Box>
              <Typography variant="h6" className="font-bold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </Typography>
              <IconButton
                onClick={() => handleRemoveItem(item.id)}
                color="error"
              >
                <Delete />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Divider className="my-4" />

      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5" className="font-bold">
          Total: ${total.toFixed(2)}
        </Typography>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          size="large"
          className="px-8"
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  )
}

export default Cart