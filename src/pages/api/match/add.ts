import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { teamA, teamB, scoreA, scoreB, summary } = req.body;

  if (!teamA || !teamB || !scoreA || !scoreB || !summary) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const match = await prisma.match.create({
      data: {
        teamA,
        teamB,
        scoreA,
        scoreB,
        summary,
      },
    });

    res.status(201).json(match);
  } catch (error) {
    console.error("Error adding match:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
