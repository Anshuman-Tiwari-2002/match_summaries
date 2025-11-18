// src/pages/api/match/list.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'  // ✅ Use this instead

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const matches = await prisma.match.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.status(200).json(matches)
  } catch (error) {
    console.error('Error fetching matches:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
