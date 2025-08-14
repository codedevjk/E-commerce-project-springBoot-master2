import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
} from '@mui/material'
import {
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { logout } from '../store/slices/authSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.cart)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleClose()
    navigate('/')
  }

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <AppBar position="fixed" className="bg-white shadow-md">
      <Toolbar className="max-w-7xl mx-auto w-full">
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className="flex-grow text-gray-800 no-underline font-bold"
        >
          EcomStore
        </Typography>

        <Box className="hidden md:flex space-x-4">
          <Button
            component={Link}
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/products"
            className="text-gray-700 hover:text-blue-600"
          >
            Products
          </Button>
        </Box>

        <Box className="flex items-center space-x-2">
          <IconButton
            component={Link}
            to="/cart"
            className="text-gray-700"
          >
            <Badge badgeContent={cartItemCount} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                className="text-gray-700"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box className="space-x-2">
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="small"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="small"
              >
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar