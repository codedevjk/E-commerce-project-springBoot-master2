import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { addToCart } from '../store/slices/cartSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity: 1 }))
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl || 'https://via.placeholder.com/300x200'}
        alt={product.title}
        className="h-48 object-cover"
      />
      <CardContent className="flex-grow">
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          className="text-gray-800 font-semibold line-clamp-2"
        >
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="line-clamp-3 mb-2"
        >
          {product.description}
        </Typography>
        <Box className="flex items-center justify-between">
          <Typography variant="h6" className="text-green-600 font-bold">
            ${product.price}
          </Typography>
          {product.discountedPrice && (
            <Typography
              variant="body2"
              className="text-gray-500 line-through"
            >
              ${product.discountedPrice}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions className="p-4 pt-0">
        <Button
          component={Link}
          to={`/products/${product.id}`}
          size="small"
          variant="outlined"
          className="mr-2"
        >
          View Details
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard