// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  notAString: number;
  notANumber: string;
  notABoolean: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ notAString: 1234, notANumber: "asdf", notABoolean: "asdf" })
}
