import React, { createContext, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext<{ toggleColorMode: () => void }>({ toggleColorMode: () => {} });

export const useThemeMode = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#a855f7' },    // Purple-500
          secondary: { main: '#06b6d4' },   // Cyan-500
          background: {
            default: mode === "dark" ? "#0B1121" : "#e0e7ff",
            paper: mode === "dark" ? "#111827" : "#f1f5f9",
          },
          text: {
            primary: mode === "dark" ? "#f1f5f9" : "#1e293b",
            secondary: mode === "dark" ? "#94a3b8" : "#64748b",
          }
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                background: mode === "dark" 
                  ? 'linear-gradient(145deg, #1e1b4b 0%, #312e81 100%)'
                  : 'linear-gradient(145deg, #f1f5f9 0%, #e0e7ff 100%)',
                borderColor: mode === "dark" ? "#312e81" : "#c7d2fe",
                backdropFilter: 'blur(12px)',
              }
            }
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                background: mode === "dark" 
                  ? 'linear-gradient(90deg, #0F172A 0%, #1E293B 100%)'
                  : 'linear-gradient(90deg, #818cf8 0%, #8b5cf6 100%)',
                boxShadow: mode === "dark" 
                  ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                  : '0 4px 20px rgba(0, 0, 0, 0.08)',
              }
            }
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 600,
              },
              contained: {
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
              },
              outlined: {
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        }
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
