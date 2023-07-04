import { NextApiHandler } from "next";
import { PrismaClient, User } from "@prisma/client";
import { lowerCase } from "utils";
import { MAX_DOWNLINES_LEVEL } from "constant/rank";

const prisma = new PrismaClient();

const getListLevel = async (address: string) => {
  const list = await prisma.$queryRaw`
  WITH RECURSIVE "hierarchy" AS (
    SELECT
        address,
        upline,
        rank,
        "telegramUsername",
        1 AS "level"
    FROM
        "User"
    WHERE
        upline = ${address}
    UNION
    ALL
    SELECT
        parent.address,
        parent.upline,
        parent.rank,
        parent."telegramUsername",
        "level" + 1
    FROM
        "User" parent
        JOIN "hierarchy" child ON parent.upline = child.address
    WHERE
        "level" < ${MAX_DOWNLINES_LEVEL}
)
SELECT
    "level",
    1 as "sumPotentialProfit",
    CAST(COUNT(*) as int) as totalUser
FROM
    "hierarchy"
GROUP BY
    "level"
ORDER BY
    "level" ASC
  `;

  return list;
};

// list level url
// http://localhost:3000/api/downlines/v2/tree/list-level/0x27ffb136b9ee2711BD39975b766Beda5992738Cf

const handler: NextApiHandler = async (req, res) => {
  const address = lowerCase(req.query.address);
  try {
    const listLevel = await getListLevel(address);
    return res.status(200).json(listLevel);
  } catch (e: any) {
    res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
};

export default handler;
