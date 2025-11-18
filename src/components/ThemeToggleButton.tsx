import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '@/context/ThemeContext';

export default function ThemeToggleButton() {
  const theme = useTheme();
  const { toggleColorMode } = useThemeMode();

  return (
    <IconButton color="inherit" onClick={toggleColorMode}>
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
