import { NextPageContext } from "next";
import React from "react";
import { myGet } from "api/myGet";

function People({ people }: any) {
  return <div>{JSON.stringify(people)}</div>;
}

export default People;

People.getInitialProps = async (ctx: NextPageContext) => {
  const json = await myGet("http://localhost:3002/api/people", ctx);
  return {
    people: json,
  };
};
