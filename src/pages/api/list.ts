// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type List = Array<unknown>;

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
    const unknownItemTypeList = req.body as List;
    if (!unknownItemTypeList || !unknownItemTypeList.length) {
      res.status(500).json({ message: `You must provide a list with items`});  
      
      return;
    }

    const i0 = unknownItemTypeList[0];
    const list = unknownItemTypeList as Array<typeof i0>;
    let typeError: string | undefined;

    list.forEach(item => {
      if (typeof item !== typeof i0) {
        typeError = "All list items must be of the same type";
      }
    })

    if (typeError) {
      res.status(500).json({ message: typeError});  
      
      return;
    }

    res.status(200).json({ message: `You provided this list: ${JSON.stringify(list)}`, data: list});
  } catch (e) {
    res.status(500).json({ message: `There was an error: ${JSON.stringify(e)}`});
  }
}
