// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Body {
  text: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed'});
    return;
  }

  try {
    const body = (JSON.parse(req.body) as Body);

    if (!body.text) {
      res.status(500).json({ message: `You must provide text`});  
    }

    res.status(200).json({ message: `You provided this text: ${body.text}`});
  } catch (e) {
    res.status(500).json({ message: `There was an error: ${JSON.stringify(e)}`});
  }
}
