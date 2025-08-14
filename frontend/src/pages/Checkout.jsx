import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Card,
  CardContent,
} from '@mui/material'
import { fetchCart } from '../store/slices/cartSlice'

const Checkout = () => {
  const dispatch = useDispatch()
  const { items, total } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  })

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement Razorpay payment integration
    console.log('Processing payment...', { shippingInfo, items, total })
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" className="mb-8 font-bold">
        Checkout
      </Typography>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <Paper elevation={3} className="p-6">
          <Typography variant="h5" className="mb-4 font-semibold">
            Shipping Information
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextField
                label="First Name"
                name="firstName"
                value={shippingInfo.firstName}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={shippingInfo.lastName}
                onChange={handleChange}
                required
                fullWidth
              />
            </div>

            <TextField
              label="Email"
              name="email"
              type="email"
              value={shippingInfo.email}
              onChange={handleChange}
              required
              fullWidth
              className="mb-4"
            />

            <TextField
              label="Address"
              name="address"
              value={shippingInfo.address}
              onChange={handleChange}
              required
              fullWidth
              className="mb-4"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextField
                label="City"
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="State"
                name="state"
                value={shippingInfo.state}
                onChange={handleChange}
                required
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <TextField
                label="ZIP Code"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Country"
                name="country"
                value={shippingInfo.country}
                onChange={handleChange}
                required
                fullWidth
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              className="bg-blue-600 hover:bg-blue-700"
            >
              Place Order
            </Button>
          </form>
        </Paper>

        {/* Order Summary */}
        <Paper elevation={3} className="p-6">
          <Typography variant="h5" className="mb-4 font-semibold">
            Order Summary
          </Typography>

          {items.map((item) => (
            <Card key={item.id} className="mb-3">
              <CardContent className="p-4">
                <Box className="flex items-center space-x-4">
                  <img
                    src={item.product.imageUrl || 'https://via.placeholder.com/60'}
                    alt={item.product.title}
                    className="w-15 h-15 object-cover rounded"
                  />
                  <Box className="flex-grow">
                    <Typography variant="body1" className="font-semibold">
                      {item.product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography variant="body1" className="font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Divider className="my-4" />

          <Box className="space-y-2">
            <Box className="flex justify-between">
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1">${total.toFixed(2)}</Typography>
            </Box>
            <Box className="flex justify-between">
              <Typography variant="body1">Shipping:</Typography>
              <Typography variant="body1">Free</Typography>
            </Box>
            <Box className="flex justify-between">
              <Typography variant="body1">Tax:</Typography>
              <Typography variant="body1">${(total * 0.1).toFixed(2)}</Typography>
            </Box>
            <Divider />
            <Box className="flex justify-between">
              <Typography variant="h6" className="font-bold">
                Total:
              </Typography>
              <Typography variant="h6" className="font-bold">
                ${(total * 1.1).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </div>
    </Container>
  )
}

export default Checkout