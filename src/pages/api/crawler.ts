/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import { getMainProvider } from "lib/contractFactory";
import type { NextApiHandler } from "next";
import addressCrawler from "worker/addressCrawler";
import eventCrawler from "worker/eventCrawler";

const prisma = new PrismaClient();

const timestampPatcher = async () => {
  try {
    const provider = await getMainProvider();
    const eventListWithoutTimestamp = await prisma.event.findMany({
      where: {
        createdAt: null,
      },
    });

    if (eventListWithoutTimestamp.length > 0) {
      for (const event of eventListWithoutTimestamp) {
        const timestamp = (await provider.getBlock(Number(event.blockNumber)))
          .timestamp;

        await prisma.event.update({
          data: { createdAt: new Date(timestamp * 1000) },
          where: { id: event.id },
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const handler: NextApiHandler = async (_, res) => {
  eventCrawler();
  addressCrawler();
  timestampPatcher();
  return res.send("OK");
};

export default handler;
