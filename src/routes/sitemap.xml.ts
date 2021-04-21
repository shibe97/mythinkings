import nodeFetch from 'node-fetch';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
const BASE_URL = "https://www.mythinkings.net/";

const render = (contents) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${BASE_URL}</loc><lastmod>${
  contents[0].revisedAt
}</lastmod></url>
${contents
  .map(
    post => `<url><loc>${BASE_URL}${post.id}/</loc><lastmod>${
      post.revisedAt
    }</lastmod></url>`
  )
  .join("\n")}
</urlset>
`;

type Response = {
	status?: number;
	headers?: Record<string, string>;
	body?: string;
};

export async function get(): Promise<Response> {
  const fetch =
  typeof window !== 'undefined'
    ? window.fetch
    : nodeFetch;
  const body = await fetch(`https://shibe97.microcms.io/api/v1/blog/?limit=100`, {
    headers: { "X-API-KEY" : '99a2f198-c8dd-4e34-b37b-ca44b6fd89ad' }
  })
    .then(res => res.json())
		.then((res) => {
      return {
        ...res,
        contents: res.contents.map(content => {
          const utcDate = new Date(content.revisedAt);
          const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
          const jstString = format(jstDate, 'yyyy-MM-dd');
          return {
            ...content,
            revisedAt: jstString,
          }
        })
      }
    })
    .catch(() => null);
  const sitemap = render(body.contents);
  return {
    body: sitemap,
    headers: {
      'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
      'Content-Type': 'application/rss+xml'
    }
  };
}
