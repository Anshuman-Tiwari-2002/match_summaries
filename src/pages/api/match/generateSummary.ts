import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { teamA, teamB, scoreA, scoreB } = req.body;

  const prompt = `
  Write a short cricket match summary:

  Team A: ${teamA}
  Score A: ${scoreA}

  Team B: ${teamB}
  Score B: ${scoreB}

  Summary:
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',  // you can use 'gpt-3.5-turbo' if needed
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    });

    const summary = completion.choices[0]?.message.content?.trim() || 'Summary not generated.';

    res.status(200).json({ summary });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to generate summary.' });
  }
}
