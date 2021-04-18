import nodeFetch from 'node-fetch';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export async function get({ params }) {
  const { slug } = params;
  const fetch =
  typeof window !== 'undefined'
    ? window.fetch
    : nodeFetch;
  const body = await fetch(`https://shibe97.microcms.io/api/v1/blog/${slug}`, {
    headers: { "X-API-KEY" : '99a2f198-c8dd-4e34-b37b-ca44b6fd89ad' }
  })
		.then((res) => res.json())
		.then((res) => {
      const utcDate = new Date(res.publishedAt);
      const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
      const jstString = format(jstDate, 'd MMMM, yyyy');
      return {
        ...res,
        publishedAt: jstString
      };
    });
  return {
    body
  };
}