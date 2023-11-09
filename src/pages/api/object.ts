// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Object {
  string: string;
  number: number;
  boolean: boolean;
  list: Array<string | number>;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed'});
    return;
  }

  console.log(req.body)

  try {
    const object = req.body as Object;

    if (!object) {
      res.status(500).json({ message: `You must provide an object`});
      
      return;
    }

    res.status(200).json({ message: `You provided this object: ${JSON.stringify(object)}`, data: object});
  } catch (e) {
    res.status(500).json({ message: `There was an error: ${JSON.stringify(e)}`});
  }
}
