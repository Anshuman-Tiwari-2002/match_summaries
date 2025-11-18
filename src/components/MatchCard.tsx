import { Card, CardContent, Typography, Box, Avatar, Divider, Stack, Button, Modal } from "@mui/material";
import { useState } from "react";

type Match = {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: string;
  scoreB: string;
  summary: string;
  createdAt: string;
};

const getFlagSrc = (team: string): string => {
  const map: Record<string, string> = {
    India: "india.png",
    Australia: "australia.png",
    England: "england.png",
    Pakistan: "pakistan.png",
    NewZealand: "newzealand.png",
    SouthAfrica: "southafrica.png",
    SriLanka: "srilanka.png",
    Bangladesh: "bangladesh.png",
    Afghanistan: "afghanistan.png",
    WestIndies: "westindies.png",
    USA: "usa.png",
  };
  return `/flags/${map[team] || "default.png"}`;
};

interface MatchCardProps {
  match: Match;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MatchCard({ match, onEdit, onDelete }: MatchCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        sx={{
          width: "100%",
          mx: "auto",
          borderRadius: 4,
          boxShadow: (theme) => `0 8px 32px ${
            theme.palette.mode === 'dark' 
              ? 'rgba(0, 0, 0, 0.4)'
              : 'rgba(109, 40, 217, 0.25)'
          }`,
          mb: 3,
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
        <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          {/* Match Header Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            mb={2.5}
          >
            {/* Teams and Scores Section */}
            <Box 
              width="100%" 
              sx={{
                background: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(0, 0, 0, 0.2)' 
                  : 'rgba(255, 255, 255, 0.5)',
                borderRadius: 2,
                p: 2,
              }}
            >
              {[
                { team: match.teamA, score: match.scoreA }, 
                { team: match.teamB, score: match.scoreB }
              ].map((entry, idx) => (
                <Box
                  key={entry.team}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={idx === 0 ? 0 : 2}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar
                      src={getFlagSrc(entry.team)}
                      alt={`${entry.team} Flag`}
                      sx={{ 
                        width: 32, 
                        height: 22,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      variant="rounded"
                    />
                    <Typography 
                      variant="subtitle1" 
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: 'text.primary'
                      }}
                    >
                      {entry.team}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{
                      fontWeight: 700,
                      color: (theme) => 
                        theme.palette.mode === 'dark' 
                          ? '#f1f5f9'
                          : '#1e293b',
                    }}
                  >
                    {entry.score}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Date Section */}
            <Typography 
              variant="caption" 
              sx={{ 
                mt: { xs: 1, sm: 0 },
                px: 1.5,
                py: 0.75,
                borderRadius: 1,
                bgcolor: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.05)',
                color: 'text.secondary',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              {new Date(match.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </Box>

          <Divider 
            sx={{ 
              my: 2.5,
              opacity: 0.6
            }} 
          />

          {/* Summary Section */}
          <Typography 
            color="text.secondary" 
            sx={{
              fontSize: '0.95rem',
              lineHeight: 1.7,
              letterSpacing: '0.01em',
              px: 1
            }}
          >
            {match.summary}
          </Typography>

          {/* Admin Actions */}
          {(onEdit || onDelete) && (
            <Stack 
              direction="row" 
              spacing={2}
              sx={{
                pt: 2,
                mt: 2,
                borderTop: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
              }}
            >
              {onEdit && (
                <Button
                  variant="contained"
                  onClick={onEdit}
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
              )}
              {onDelete && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={onDelete}
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
              )}
            </Stack>
          )}
        </CardContent>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 4, bgcolor: "background.paper", borderRadius: 2, maxWidth: 600, mx: "auto", mt: 8 }}>
          {/* Fetch and display full scorecard here */}
          <Typography variant="h5">{match.teamA} vs {match.teamB}</Typography>
          {/* Render full scorecard details */}
        </Box>
      </Modal>
    </>
  );
}
