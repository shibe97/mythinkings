import nodeFetch from 'node-fetch';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import type { article } from '../types';

type Request = {
	params: Record<string, string | string[]>;
};

type Response = {
	status?: number;
	headers?: Record<string, string>;
	body?: article;
};

export async function get({ params }: Request): Promise<Response> {
  const { slug } = params;
  const fetch =
  typeof window !== 'undefined'
    ? window.fetch
    : nodeFetch;
  const body = await fetch(`https://shibe97.microcms.io/api/v1/blog/${slug}`, {
    headers: { "X-MICROCMS-API-KEY" : import.meta.env.VITE_API_KEY }
  })
		.then((res) => res.json())
		.then(async (res) => {
      const utcDate = new Date(res.publishedAt);
      const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
      const jstString = format(jstDate, 'd MMMM, yyyy');
      const body = await Promise.all(
        (res.body || []).map(async (item) => {
          if (item.fieldId === 'linkCard') {
            const ogp = await fetch(item.url)
              .then(res => res.text())
              .then(res => {
                const metas = res.match(/<meta.+?>/g);
                return metas.map(m => {
                  const propertyStr = m.match(/property=".+?"/);
                  const property = propertyStr && propertyStr[0].trim().replace(/"/g, '').replace('og:', '').split('=')[1];
                  const contentStr = m.match(/content=".+?"/);
                  const content = contentStr && contentStr[0].trim().replace(/"/g, '').split('=')[1];
                  return {
                    property, content
                  };
                }).filter(m => m.property && m.content).reduce((prev, ogp) => {
                  return {
                    ...prev,
                    [ogp.property]: ogp.content
                  };
                }, {});
              })
            return {
              ...item,
              ogp,
            }
          }
          return item;
        })
      );
      return {
        ...res,
        body,
        publishedAt: jstString
      };
    })
    .catch(() => null);
  return {
    body
  };
}