import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from '@mui/material'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement profile update
    setIsEditing(false)
  }

  return (
    <Container maxWidth="md" className="py-8">
      <Paper elevation={3} className="p-8">
        <Typography variant="h4" className="mb-6 font-bold">
          My Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />
          </Box>

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            fullWidth
            className="mb-6"
          />

          <Box className="flex space-x-4">
            {isEditing ? (
              <>
                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </form>

        <Divider className="my-8" />

        <Typography variant="h5" className="mb-4 font-semibold">
          Order History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No orders found.
        </Typography>
      </Paper>
    </Container>
  )
}

export default Profile