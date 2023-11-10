// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Endpoint called: /text');

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed'});
    return;
  }

  try {
    const { str, num, bool } = req.query;

    if (!str && !num && !bool) {
      res.status(500).json({ message: `You must provide at least one query parameter "str|num|bool"`});
      console.log('500 - no parameters');
      return;
    }

    if (num && !Number(num)) {
      res.status(500).json({ message: "`num` must be a number"});
      console.log('500 - num was not a number');
      return;
    }

    if ((bool as string).toLowerCase() !== 'false' && (bool as string).toLowerCase() !== 'true') {
      res.status(500).json({ message: "`bool` must be either 'true' or 'false'"});
      console.log('500 - bool not true or false');

      return;
    }

    const setBool = (bool as string).toLowerCase() === 'false' ? false : Boolean(bool);

    console.log(' - ', str, num, setBool);

    res.status(200).json({ message: `You provided this query; str: ${str}, num: ${num}, bool: ${bool}`, data: { str, num: Number(num), bool: Boolean(setBool)}});
  } catch (e) {
    res.status(500).json({ message: `There was an error: ${JSON.stringify(e)}`});
  }
}
