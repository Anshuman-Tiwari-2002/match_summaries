// src/pages/api/match/get.ts
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const match = await prisma.match.findUnique({
      where: { id },
    });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    return res.status(200).json(match);
  } catch (error) {
    console.error('[GET MATCH ERROR]', error);
    return res.status(500).json({ error: 'Failed to fetch match' });
  }
}
