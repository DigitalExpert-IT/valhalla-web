import type { NextApiHandler } from "next";
import addressCrawler from "worker/addressCrawler";
import eventCrawler from "worker/eventCrawler";

const handler: NextApiHandler = async (_, res) => {
  eventCrawler();
  return res.send("OK");
};

export default handler;
