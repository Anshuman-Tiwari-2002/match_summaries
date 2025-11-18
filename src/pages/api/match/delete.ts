// src/pages/api/match/delete.ts
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing match ID' })
  }

  try {
    await prisma.match.delete({
      where: { id },
    })

    return res.status(200).json({ message: 'Match deleted successfully' })
  } catch (err) {
    console.error('[DELETE MATCH ERROR]', err)
    return res.status(500).json({ error: 'Failed to delete match' })
  }
}
