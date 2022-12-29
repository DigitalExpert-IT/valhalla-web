import type { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { getKeccakHexHash, lowerCase } from "utils";
import { getValhallaContract, getMainProvider } from "lib/contractFactory";
import { rootAdressList } from "@warmbyte/valhalla/constant/rootAddress";

const prisma = new PrismaClient();
const REGISTRATION_TOPIC = getKeccakHexHash("Registration(address,address)");

const storeRootAddressList = async () => {
  try {
    let upline = "0x0";
    for (const address of rootAdressList) {
      const existingUser = await prisma.user.findUnique({
        where: { address: address },
      });
      if (!existingUser) {
        await prisma.user.create({
          data: {
            address: lowerCase(address),
            upline: lowerCase(upline),
            blockNumber: 0,
          },
        });
      }
      upline = lowerCase(address);
    }
  } catch (error) {
    console.log(error);
  }
};

const initCrawler = async () => {
  try {
    const provider = await getMainProvider();
    const valhalla = await getValhallaContract();

    if (valhalla.listenerCount("Registration") > 0) return;

    await storeRootAddressList();
    const latestUser = await prisma.user.findFirst({
      orderBy: {
        blockNumber: "desc",
      },
    });
    const contractDeploymentBlock = await valhalla.deployedAtBlock();
    const startingBlock =
      latestUser?.blockNumber ?? contractDeploymentBlock.toNumber();
    const latestBlock = await provider.getBlockNumber();

    const registrationEventList = await valhalla.queryFilter(
      {
        address: valhalla.address,
        topics: [REGISTRATION_TOPIC],
      },
      startingBlock,
      latestBlock
    );

    for (const registrationEvent of registrationEventList) {
      const [user, referrer] = registrationEvent.args;

      const existingUser = await prisma.user.findFirst({
        where: { address: user },
      });
      if (!existingUser) {
        await prisma.user.create({
          data: {
            address: lowerCase(user),
            upline: lowerCase(referrer),
            blockNumber: Number(registrationEvent.blockNumber),
          },
        });
      }
    }

    valhalla.on("Registration", async (user, referrer, { blockNumber }) => {
      const existingUser = await prisma.user.findFirst({
        where: { address: user },
      });
      if (!existingUser) {
        await prisma.user.create({
          data: {
            address: lowerCase(user),
            upline: lowerCase(referrer),
            blockNumber: Number(blockNumber),
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const handler: NextApiHandler = async (_, res) => {
  initCrawler();
  return res.send("OK");
};

export default handler;
