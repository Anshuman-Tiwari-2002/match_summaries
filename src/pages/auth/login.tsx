// src/pages/auth/login.tsx
import { useState } from 'react'
import { login } from '@/lib/firebaseAuth'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper
} from '@mui/material'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      router.push('/') // Redirect after login
    } catch (err: any) {
      setError('Login failed. Check credentials.')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>
          🔐 Login
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
              Login
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </form>
      </Paper>
    </Container>
  )
}
