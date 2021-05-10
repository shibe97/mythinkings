import nodeFetch from 'node-fetch';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import type { microcmsList } from '../../types';
import { LIMIT } from '../../constants';

type Request = {
	params: Record<string, string | string[]>;
};

type Response = {
	status?: number;
	headers?: Record<string, string>;
	body?: microcmsList;
};

export async function get({ params }: Request): Promise<Response> {
  const { p } = params;
  const page = parseInt(p as string, 10);

  const fetch =
  typeof window !== 'undefined'
    ? window.fetch
    : nodeFetch;
  const body = await fetch(`https://shibe97.microcms.io/api/v1/blog/?limit=${LIMIT}&offset=${LIMIT * (page - 1)}&fields=id,ogimage,title,tags,publishedAt`, {
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