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
  console.log('Endpoint called: /object');

  if (req.method !== 'POST') {
    console.log(' - 405 Method Not Allowed')
    res.status(405).json({ message: 'Method Not Allowed'});
    return;
  }


  try {
    const object = req.body as Object;

    if (!object) {
      console.log(' - 500 No Object Provided')
      res.status(500).json({ message: `You must provide an object`});
      
      return;
    }

    console.log(' - ', object);

    res.status(200).json({ message: `You provided this object: ${JSON.stringify(object)}`, data: object});
  } catch (e) {
    console.log(' - 500 Error', e)
    
    res.status(500).json({ message: `There was an error: ${JSON.stringify(e)}`});
  }
}
