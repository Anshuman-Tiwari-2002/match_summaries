import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  Stack,
  CircularProgress
} from "@mui/material";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminLayout from "@/components/AdminLayout";

type Match = {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: string;
  scoreB: string;
  summary: string;
  createdAt?: string; // optional, if available
};

export default function ViewMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // ✅ Admin auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/auth/login");
    });
    return () => unsubscribe();
  }, []);

  // 🔃 Fetch matches
  useEffect(() => {
    fetch("/api/match/list")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load matches");
        return res.json();
      })
      .then(setMatches)
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load matches.");
      })
      .finally(() => setLoading(false));
  }, []);

  // ❌ Delete match
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this match?");
    if (!confirmed) return;

    const res = await fetch("/api/match/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setMatches(matches.filter((m) => m.id !== id));
    } else {
      alert("Failed to delete match");
    }
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          borderRadius: 3,
          p: { xs: 2, sm: 3 },
          background: (theme) => 
            theme.palette.mode === 'dark'
              ? 'linear-gradient(145deg, #1e1b4b 0%, #312e81 100%)'
              : 'linear-gradient(145deg, #f1f5f9 0%, #e0e7ff 100%)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.4)'
              : '0 8px 32px rgba(99, 102, 241, 0.15)',
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{
            fontWeight: 600,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(to right, #f1f5f9, #94a3b8)'
                : 'linear-gradient(to right, #1e293b, #334155)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 4
          }}
        >
          📋 All Matches
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ p: 2 }}>{error}</Typography>
        ) : matches.length === 0 ? (
          <Typography sx={{ p: 2 }}>No matches found.</Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={3}>
            {matches.map((match) => (
              <Paper 
                key={match.id} 
                elevation={0}
                sx={{
                  width: "100%",
                  mx: "auto",
                  borderRadius: 4,
                  p: { xs: 2, sm: 3 },
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(145deg, #1e1b4b 0%, #312e81 100%)'
                      : 'linear-gradient(145deg, #f1f5f9 0%, #e0e7ff 100%)',
                  boxShadow: (theme) => `0 8px 32px ${
                    theme.palette.mode === 'dark' 
                      ? 'rgba(0, 0, 0, 0.4)'
                      : 'rgba(109, 40, 217, 0.25)'
                  }`,
                  backdropFilter: 'blur(12px)',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: "all 0.3s ease",
                  '&:hover': {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) => `0 12px 48px ${
                      theme.palette.mode === 'dark'
                        ? 'rgba(168, 85, 247, 0.3)'
                        : 'rgba(99, 102, 241, 0.2)'
                    }`,
                    background: (theme) => 
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(145deg, #1e1b4b 0%, #312e81 100%)'
                        : 'linear-gradient(145deg, #e0e7ff 0%, #c7d2fe 100%)',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(168, 85, 247, 0.4)'
                        : theme.palette.divider,
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 1,
                      color: (theme) => 
                        theme.palette.mode === 'dark' 
                          ? '#f1f5f9' 
                          : '#1e293b'
                    }}
                  >
                    {match.teamA} ({match.scoreA}) vs {match.teamB} ({match.scoreB})
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      lineHeight: 1.6 
                    }}
                  >
                    {match.summary}
                  </Typography>
                </Box>

                <Stack 
                  direction="row" 
                  spacing={2}
                  sx={{
                    mt: 3,
                    pt: 3,
                    borderTop: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => router.push(`/admin/edit/${match.id}`)}
                    sx={{
                      bgcolor: 'primary.main',
                      color: '#fff',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(match.id)}
                    sx={{
                      borderWidth: 2,
                      fontWeight: 600,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    🗑️ Delete
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </AdminLayout>
  );
}
