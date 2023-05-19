import { NextApiHandler } from "next";
import { PrismaClient, User } from "@prisma/client";
import { lowerCase } from "utils";
import _ from "lodash";

const prisma = new PrismaClient();

interface Downlines extends User {
  level: number;
}

const handler: NextApiHandler = async (req, res) => {
  const address = lowerCase(req.query.address as string);
  const rank = req.query.rank as string;
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
    },
  ];

  const maxDownline = [0, 10, 20, 40, 60, 80, 100];
  let upperList = [address];

  for (let i = 0; i < maxDownline[+rank]; i++) {
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
