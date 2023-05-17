import type { NextApiHandler } from "next";
import addressCrawler from "worker/addressCrawler";

const handler: NextApiHandler = async (_, res) => {
  addressCrawler();
  return res.send("OK");
};

export default handler;
