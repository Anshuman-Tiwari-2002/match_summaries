import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { logout } from '@/lib/firebaseAuth';
import React from 'react';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <Box>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            🛠 Admin Dashboard
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Button color="inherit" onClick={() => router.push('/')}>
              🏠 Home
            </Button>
            <Button color="inherit" onClick={() => router.push('/admin/add')}>
              ➕ Add Match
            </Button>
            <Button color="inherit" onClick={() => router.push('/admin/view')}>
              📄 View Matches
            </Button>
            <ThemeToggleButton />
            <Button color="inherit" onClick={handleLogout}>
              🔓 Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">{children}</Container>
    </Box>
  );
}
