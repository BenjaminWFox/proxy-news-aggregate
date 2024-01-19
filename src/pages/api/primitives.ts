// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Endpoint called: /primitives');

  let setBool;
  let d;
  let dt;


  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed'});
    return;
  }

  try {
    const { str, num, bool, date, datetime } = req.query;

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

    if (typeof bool !== 'undefined' && (bool as string).toLowerCase() !== 'false' && (bool as string).toLowerCase() !== 'true') {
      res.status(500).json({ message: "`bool` must be either 'true' or 'false'"});
      console.log('500 - bool not true or false');

      return;
    } else if (typeof bool !== undefined) {
      setBool = (bool as string).toLowerCase() === 'false' ? false : Boolean(bool);
    }

    if (date) {
      try {
        d = (new Date(date as string))
      } catch {}
    }

    if (datetime) {
      try {
        dt = new Date(datetime as string);
      } catch {}
    }

    console.log(' - ', str, num, setBool, d, dt);

    res.status(200).json({
      message: `You provided this query; str: ${str}, num: ${num}, bool: ${bool}, date: ${date}, datetime: ${datetime}`,
      data: {
        str: str || null,
        num: Number(num) || null,
        bool: typeof setBool === 'undefined' ? null : Boolean(setBool),
        date: d?.toLocaleDateString() || null,
        datetime: dt?.toLocaleString() || null,
      }
    });
  } catch (e) {
    res.status(500).json({ message: `There was an error: ${JSON.stringify(e)}`});
  }
}
