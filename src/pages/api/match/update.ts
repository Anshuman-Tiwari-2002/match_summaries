// src/pages/api/match/update.ts
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, teamA, teamB, scoreA, scoreB, summary } = req.body;

  if (!id || !teamA || !teamB || !scoreA || !scoreB || !summary) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const updatedMatch = await prisma.match.update({
      where: { id },
      data: { teamA, teamB, scoreA, scoreB, summary },
    });

    return res.status(200).json(updatedMatch);
  } catch (err) {
    console.error('[MATCH UPDATE ERROR]', err);
    return res.status(500).json({ error: 'Failed to update match' });
  }
}
