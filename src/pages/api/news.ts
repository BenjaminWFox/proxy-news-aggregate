// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  descriptions: string,
  contents: string,
  summary: string
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
  let summary = '';

  b.articles.forEach((article, i) => {
    summary += `Title ${i}: ${article.title}, Description ${i}: ${article.description}, Content ${i} ${article.content}; `
  })

  res.status(200).json({ descriptions, contents, summary })
}
