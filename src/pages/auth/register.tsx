// src/pages/auth/register.tsx
import { useState } from 'react'
import { register } from '@/lib/firebaseAuth'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper
} from '@mui/material'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(email, password)
      router.push('/') // Redirect after registration
    } catch (err: any) {
      setError('Registration failed. Try again.')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>
          📝 Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant="contained" type="submit">
              Register
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </form>
      </Paper>
    </Container>
  )
}
