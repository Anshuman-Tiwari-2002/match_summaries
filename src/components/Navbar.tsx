// src/components/Navbar.tsx
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export default function Navbar() {
  const router = useRouter();

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backdropFilter: 'blur(12px)',
        borderBottom: 1,
        borderColor: 'divider',
        background: (theme) => 
          theme.palette.mode === 'dark'
            ? 'linear-gradient(90deg, rgba(30, 27, 75, 0.9) 0%, rgba(49, 46, 129, 0.9) 100%)'
            : 'linear-gradient(90deg, rgba(109, 40, 217, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%)',
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🏏 Match Summaries
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Button color="inherit" onClick={() => router.push('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => router.push('/admin/add')}>
            Admin
          </Button>

          <ThemeToggleButton /> {/* 🌙/☀️ Toggle added here */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
