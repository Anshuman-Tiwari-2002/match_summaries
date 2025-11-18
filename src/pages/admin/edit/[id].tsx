// src/pages/admin/edit/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import AdminLayout from '@/components/AdminLayout';

export default function EditMatchPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    teamA: '',
    teamB: '',
    scoreA: '',
    scoreB: '',
    summary: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const teams = [
    'India',
    'Australia',
    'England',
    'Pakistan',
    'NewZealand',
    'SouthAfrica',
    'SriLanka',
    'Bangladesh',
    'Afghanistan',
    'WestIndies',
    'USA',
  ];

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth/login');
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch existing match data
  useEffect(() => {
    if (id && typeof id === 'string') {
      fetch(`/api/match/get?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm(data);
        })
        .catch(() => {
          setStatus('❌ Failed to load match');
        });
    }
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/match/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...form }),
    });

    if (res.ok) {
      setStatus('✅ Match updated successfully');
      router.push('/admin/view');
    } else {
      setStatus('❌ Failed to update match');
    }
  };

  if (isLoading) return <Typography mt={4}>Checking admin access...</Typography>;

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom>
        ✏️ Edit Match
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
        mt={2}
      >
        <FormControl fullWidth required>
          <InputLabel>Team A</InputLabel>
          <Select
            name="teamA"
            value={form.teamA}
            onChange={handleChange}
            label="Team A"
          >
            {teams.map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>Team B</InputLabel>
          <Select
            name="teamB"
            value={form.teamB}
            onChange={handleChange}
            label="Team B"
          >
            {teams.map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Score A"
          name="scoreA"
          value={form.scoreA}
          onChange={handleChange}
          required
        />
        <TextField
          label="Score B"
          name="scoreB"
          value={form.scoreB}
          onChange={handleChange}
          required
        />
        <TextField
          label="Summary"
          name="summary"
          value={form.summary}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>

        {status && <Typography>{status}</Typography>}
      </Box>
    </AdminLayout>
  );
}
