import { NextApiHandler } from "next";
import { PrismaClient, User } from "@prisma/client";
import { lowerCase } from "utils";

const prisma = new PrismaClient();

type GroupDownline = {
  level: number;
  userList: User[];
  total: number;
};

const handler: NextApiHandler = async (req, res) => {
  const address = lowerCase(req.query.address as string);
  const rank = req.query.rank as string;
  const firstUser = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  let result: (User | GroupDownline)[] = [
    {
      id: "root" as any,
      address,
      upline: "",
      blockNumber: firstUser?.blockNumber ?? 0,
      telegramUsername: firstUser?.telegramUsername ?? "",
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

    const group = {
      level: i + 1,
      userList: userList,
      total: userList.length,
    };

    upperList = userList.map(user => user.address);
    result.push(group);
  }

  return res.json(result);
};

export default handler;
