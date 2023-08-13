/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import { getValhallaContract } from "lib/contractFactory";
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

const rankPatcher = async () => {
  try {
    const valhalla = await getValhallaContract();
    const userWithNoRank = await prisma.user.findMany({
      where: {
        rank: undefined,
      },
    });
    if (!userWithNoRank.length) return;
    await Promise.all(
      userWithNoRank.map(async e => {
        const account = await valhalla.accountMap(e.address);
        await prisma.user.update({
          where: {
            address: e.address,
          },
          data: {
            rank: account.rank,
          },
        });
      })
    );
  } catch (e) {
    console.log(e);
  }
};
const handler: NextApiHandler = async (_, res) => {
  eventCrawler();
  addressCrawler();
  // timestampPatcher();
  // rankPatcher();
  return res.send("OK");
};

export default handler;
