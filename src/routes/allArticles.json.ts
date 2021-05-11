import nodeFetch from 'node-fetch';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import type { microcmsList } from '../types';

type Response = {
	status?: number;
	headers?: Record<string, string>;
	body?: microcmsList;
};

export async function get(): Promise<Response> {
  const fetch =
  typeof window !== 'undefined'
    ? window.fetch
    : nodeFetch;
  const body = await fetch(`https://shibe97.microcms.io/api/v1/blog/?limit=20&fields=id,ogimage,title,tags,publishedAt`, {
    headers: { "X-API-KEY" : '99a2f198-c8dd-4e34-b37b-ca44b6fd89ad' }
  })
		.then((res) => res.json())
		.then((res) => {
      return {
        ...res,
        contents: res.contents.map(content => {
          const utcDate = new Date(content.publishedAt);
          const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
          const jstString = format(jstDate, 'd MMMM, yyyy');
          return {
            ...content,
            publishedAt: jstString,
          }
        })
      }
    })
    .catch(() => null);
  return {
    body
  };
}