import { NextApiHandler } from "next";
import { PrismaClient, User } from "@prisma/client";
import { lowerCase } from "utils";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const address = lowerCase(req.query.address as string);
  let result: User[] = [
    { id: "root" as any, address, upline: "", blockNumber: 0 },
  ];
  let upperList = [address];
  for (let i = 0; i < 100; i++) {
    const userList = await prisma.user.findMany({
      where: {
        upline: { in: upperList },
      },
    });
    upperList = userList.map(user => user.address);
    result = [...result, ...userList];
  }

  return res.json(result);
};

export default handler;
