import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
} from '@mui/material'
import { fetchProducts } from '../store/slices/productSlice'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const dispatch = useDispatch()
  const { items: products, isLoading } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts({ size: 8 }))
  }, [dispatch])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Box className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <Container maxWidth="lg">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">
              Welcome to EcomStore
            </Typography>
            <Typography variant="h5" className="mb-8 opacity-90">
              Discover amazing products at unbeatable prices
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              size="large"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Shop Now
            </Button>
          </div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" className="py-16">
        <Typography variant="h3" className="text-center mb-12 font-bold text-gray-800">
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card className="text-center h-full">
              <CardContent className="p-8">
                <Typography variant="h5" className="mb-4 font-semibold">
                  🚚 Free Shipping
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Free shipping on all orders over $50. Fast and reliable delivery.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="text-center h-full">
              <CardContent className="p-8">
                <Typography variant="h5" className="mb-4 font-semibold">
                  🔒 Secure Payment
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Your payment information is processed securely with Razorpay.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="text-center h-full">
              <CardContent className="p-8">
                <Typography variant="h5" className="mb-4 font-semibold">
                  ↩️ Easy Returns
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  30-day return policy. No questions asked, hassle-free returns.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Featured Products */}
      <Box className="bg-gray-100 py-16">
        <Container maxWidth="lg">
          <Typography variant="h3" className="text-center mb-12 font-bold text-gray-800">
            Featured Products
          </Typography>
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <Grid container spacing={4}>
              {products.slice(0, 8).map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
          <div className="text-center mt-8">
            <Button
              component={Link}
              to="/products"
              variant="outlined"
              size="large"
              className="px-8"
            >
              View All Products
            </Button>
          </div>
        </Container>
      </Box>
    </div>
  )
}

export default Home