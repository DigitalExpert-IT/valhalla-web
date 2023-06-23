import { NextApiHandler } from "next";
import { PrismaClient, User } from "@prisma/client";
import { lowerCase } from "utils";
import { MAX_DOWNLINES_LEVEL } from "constant/rank";
import _ from "lodash";

const prisma = new PrismaClient();

interface Downlines extends User {
  level: number;
}

const handler: NextApiHandler = async (req, res) => {
  const address = lowerCase(req.query.address as string);
  const firstUser = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  let result: Downlines[] = [
    {
      id: "root" as any,
      address,
      upline: "",
      blockNumber: firstUser?.blockNumber ?? 0,
      telegramUsername: firstUser?.telegramUsername ?? "",
      level: 0,
      rank: firstUser?.rank ?? 0,
    },
  ];

  let upperList = [address];

  for (let i = 0; i < MAX_DOWNLINES_LEVEL; i++) {
    const userList = await prisma.user.findMany({
      where: {
        upline: { in: upperList },
      },
    });

    const userLevelList = userList.map(e => ({ ...e, level: i + 1 }));

    upperList = userList.map(user => user.address);
    result = [...result, ...userLevelList];
  }

  return res.json(_.groupBy(result, "level"));
};

export default handler;
