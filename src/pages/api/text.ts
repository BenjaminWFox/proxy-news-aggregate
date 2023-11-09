// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Body {
  text: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Endpoint called: /text');

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed'});
    return;
  }

  try {
    const {text} = req.body as Body;

    if (!text) {
      res.status(500).json({ message: `You must provide text`});  
    }

    console.log(' - ', text);

    res.status(200).json({ message: `You provided this text: ${text}`, data: text});
  } catch (e) {
    res.status(500).json({ message: `There was an error: ${JSON.stringify(e)}`});
  }
}
