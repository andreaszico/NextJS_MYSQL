import { query } from "@/lib/db";
import { GetStaticPaths } from "next";
import MicroPhone, { getStaticProps } from "./";

export default MicroPhone;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => {
  const microphone = await query("select count(*) as total from microphone");
  const total = microphone[0].total;
  const numberOfPages = Math.ceil(total / 5.0);
  const paths = Array(numberOfPages - 1)
    .fill("")
    .map((_, index) => {
      return { params: { currentPage: (index + 1).toString() } };
    });
  return {
    fallback: false,
    paths: paths,
  };
};
