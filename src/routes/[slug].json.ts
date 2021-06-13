import nodeFetch from 'node-fetch';
import { JSDOM } from 'jsdom';
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
    headers: { "X-API-KEY" : '99a2f198-c8dd-4e34-b37b-ca44b6fd89ad' }
  })
		.then((res) => res.json())
		.then(async (res) => {
      const utcDate = new Date(res.publishedAt);
      const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
      const jstString = format(jstDate, 'd MMMM, yyyy');
      const body = await Promise.all(
        (res.body || []).map(async (item: any) => {
          if (item.fieldId === 'linkCard') {
            const ogp = await fetch(item.url)
              .then(res => res.text())
              .then(res => {
                const dom = new JSDOM(res);
                const meta = dom.window.document.querySelectorAll('head > meta');
                return Array.from(meta)
                  .filter((element: any) => element.hasAttribute("property"))
                  .reduce((prev: any, ogp: any) => {
                    const property = ogp.getAttribute("property").trim().replace("og:", "");
                    const content = ogp.getAttribute("content");
                    return {
                      ...prev,
                      [property]: content,
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