import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Box,
} from '@mui/material'
import { fetchProducts, fetchCategories } from '../store/slices/productSlice'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const dispatch = useDispatch()
  const { items: products, categories, totalPages, currentPage, isLoading } = useSelector(
    (state) => state.products
  )
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchProducts({ page, search, category }))
  }, [dispatch, page, search, category])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setPage(0)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
    setPage(0)
  }

  const handlePageChange = (event, value) => {
    setPage(value - 1)
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" className="mb-8 font-bold text-gray-800">
        Products
      </Typography>

      {/* Filters */}
      <Box className="mb-8 flex flex-col md:flex-row gap-4">
        <TextField
          label="Search products..."
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          className="flex-1"
        />
        <FormControl className="min-w-48">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Products Grid */}
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box className="flex justify-center mt-8">
              <Pagination
                count={totalPages}
                page={currentPage + 1}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  )
}

export default Products