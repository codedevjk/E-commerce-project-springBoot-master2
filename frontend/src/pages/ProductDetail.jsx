import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { fetchProductById } from '../store/slices/productSlice'
import { addToCart } from '../store/slices/cartSlice'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentProduct: product } = useSelector((state) => state.products)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity }))
  }

  if (!product) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <img
            src={product.imageUrl || 'https://via.placeholder.com/500'}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" className="mb-4 font-bold">
            {product.title}
          </Typography>
          <Typography variant="body1" className="mb-4 text-gray-600">
            {product.description}
          </Typography>
          
          <Box className="mb-4">
            <Typography variant="h4" className="text-green-600 font-bold">
              ${product.price}
            </Typography>
            {product.discountedPrice && (
              <Typography
                variant="h6"
                className="text-gray-500 line-through"
              >
                ${product.discountedPrice}
              </Typography>
            )}
          </Box>

          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" className="mb-2">
                Product Details
              </Typography>
              <Typography variant="body2" className="mb-1">
                <strong>Brand:</strong> {product.brand || 'N/A'}
              </Typography>
              <Typography variant="body2" className="mb-1">
                <strong>Category:</strong> {product.category?.name || 'N/A'}
              </Typography>
              <Typography variant="body2" className="mb-1">
                <strong>Color:</strong> {product.color || 'N/A'}
              </Typography>
              <Typography variant="body2">
                <strong>Size:</strong> {product.size || 'N/A'}
              </Typography>
            </CardContent>
          </Card>

          <Box className="flex items-center space-x-4 mb-4">
            <Typography variant="body1">Quantity:</Typography>
            <Button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              variant="outlined"
              size="small"
            >
              -
            </Button>
            <Typography variant="body1" className="px-4">
              {quantity}
            </Typography>
            <Button
              onClick={() => setQuantity(quantity + 1)}
              variant="outlined"
              size="small"
            >
              +
            </Button>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductDetail