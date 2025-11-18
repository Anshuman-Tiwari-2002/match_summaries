import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { logout } from "@/lib/firebaseAuth";
import AdminLayout from "@/components/AdminLayout";

export default function AddMatchPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const teams = [
    "India",
    "Australia",
    "England",
    "Pakistan",
    "NewZealand",
    "SouthAfrica",
    "SriLanka",
    "Bangladesh",
    "Afghanistan",
    "WestIndies",
    "USA",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login");
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    scoreA: "",
    scoreB: "",
    summary: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const res = await fetch("/api/match/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("✅ Match added successfully!");
      setForm({ teamA: "", teamB: "", scoreA: "", scoreB: "", summary: "" });
    } else {
      setStatus("❌ Failed to add match.");
    }
  };

   //  AI Summary Generator Function
   
  const generateSummary = async () => {
    const res = await fetch("/api/match/generateSummary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamA: form.teamA,
        teamB: form.teamB,
        scoreA: form.scoreA,
        scoreB: form.scoreB,
      }),
    });

    const data = await res.json();
    if (data.summary) {
      setForm({ ...form, summary: data.summary });
    }
  };


  if (isLoading) return <Typography mt={4}>Checking admin access...</Typography>;

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom>
        Add Match Summary
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
        mt={2}
      >
        {/* Team A Dropdown */}
        <FormControl fullWidth>
          <InputLabel>Select Team A</InputLabel>
          <Select
            name="teamA"
            value={form.teamA}
            onChange={(e) => setForm({ ...form, teamA: e.target.value })}
            required
          >
            {teams.map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Team B Dropdown */}
        <FormControl fullWidth>
          <InputLabel>Select Team B</InputLabel>
          <Select
            name="teamB"
            value={form.teamB}
            onChange={(e) => setForm({ ...form, teamB: e.target.value })}
            required
          >
            {teams.map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Score A */}
        <TextField
          name="scoreA"
          label="Score A"
          value={form.scoreA}
          onChange={handleChange}
          required
        />

        {/* Score B */}
        <TextField
          name="scoreB"
          label="Score B"
          value={form.scoreB}
          onChange={handleChange}
          required
        />

          {/* Generate Summary Button */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={generateSummary}
        >
          ✨ Generate Summary with AI
        </Button>

        {/* Summary */}
        <TextField
          name="summary"
          label="Summary"
          value={form.summary}
          onChange={handleChange}
          required
          multiline
          rows={4}
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit">
          Submit Match
        </Button>

        {status && <Typography>{status}</Typography>}
      </Box>
    </AdminLayout>
  );
}
