// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  descriptions: string,
  contents: string
}

interface Article {
  source: {
    id: null;
    name: string;
  },
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;

}

interface Structure {
  status: string;
  totalResults: number;
  articles: Array<Article>;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const b = (JSON.parse(req.body) as Structure);

  console.log('B', b.articles)

  let descriptions = '';
  let contents = '';

  b.articles.forEach((article, i) => {
    descriptions += `Article description ${i}: ${article.description}\n\n`;
    contents += `Article content ${i}: ${article.content}\n\n`;
  })

  res.status(200).json({ descriptions, contents })
}
