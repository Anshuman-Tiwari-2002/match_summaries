import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import MatchCard from "@/components/MatchCard";
import Navbar from "@/components/Navbar";

type Match = {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: string;
  scoreB: string;
  summary: string;
  createdAt: string;
};

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/match/list")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setMatches)
      .catch((err) => {
        console.error("Failed to fetch matches:", err);
        setError("Failed to load matches");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Recent Match Summaries
      </Typography>

      {loading ? (
        <Grid container justifyContent="center" mt={4}>
          <CircularProgress />
        </Grid>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : matches.length === 0 ? (
        <Typography>No matches available.</Typography>
      ) : (
        <Grid container spacing={2}>
          {matches.map((match) => (
            <Box key={match.id} mb={2}>
              <MatchCard match={match} />
            </Box>
          ))}
        </Grid>
      )}
    </Container>
    </>
  );
}
