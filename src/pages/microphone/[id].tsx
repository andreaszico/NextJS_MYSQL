import { queryExamp, query } from "@/lib/db";
import { Microphone } from "model/Microphone";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

export type MicrophoneDetailProps = Microphone;

function MicrophoneDetail({ id, brand, model, price, imageUrl }: MicrophoneDetailProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>I'm Sorry for the Wait</div>;
  }

  return <div>{id}</div>;
}

export default MicrophoneDetail;

export const getStaticProps: GetStaticProps<MicrophoneDetailProps> = async (
  ctx
) => {
  const id = ctx.params?.id as string;
  const microphones = JSON.parse(
    JSON.stringify(
      await queryExamp(`SELECT * FROM microphone WHERE id = ?`, id)
    )
  );
  return { props: microphones };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  
  const microphones = await query(`SELECT * FROM microphone`);

  const paths = microphones.map((a:any) => {
    return { params : {
      id: a.id.toString()
    }}
  })
  
  return {
    fallback: true,
    paths,

  };
};