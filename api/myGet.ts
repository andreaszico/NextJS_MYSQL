import { NextPageContext } from "next";
import Router from "next/router";

export async function myGet(url: string, ctx: NextPageContext) {
  const cookie = ctx.req?.headers.cookie;

  const response = await fetch(url, {
    headers: {
      cookie: cookie!,
    },
  });

  if (response.status === 401 && !ctx.req) {
    Router.replace("/Login");
    return {};
  }

  if (response.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: "http://localhost:3002/login",
    });
    ctx.res?.end();
    return;
  }

  const json = await response.json();
  return json;
}
