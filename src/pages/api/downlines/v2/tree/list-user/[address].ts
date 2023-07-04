import { NextApiHandler } from "next";
import { PrismaClient, User } from "@prisma/client";
import { lowerCase } from "utils";
import { MAX_DOWNLINES_LEVEL } from "constant/rank";

const prisma = new PrismaClient();

const getUserListUserPerLevel = async (
  address: string,
  level: number,
  offset: number,
  limit: number
) => {
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
    "address","upline","rank", "telegramUsername"
FROM
    "hierarchy"
WHERE "level" = ${level}
GROUP BY "level", "address", "upline", "rank","telegramUsername"
OFFSET ${offset} FETCH NEXT ${limit} ROWS ONLY
`;

  return list;
};

const getPagesFromListUser = async (
  address: string,
  level: number,
  limit: number
) => {
  const list: [{ totalItem: number; totalPage: number }] =
    await prisma.$queryRaw`
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
    CAST(COUNT(*)as int) as "totalItem", 
    CEIL(CAST(COUNT(*)  as float) / ${limit}) as "totalPage" 
  FROM
      "hierarchy"
  WHERE "level" = ${level}
  `;

  return list.at(0);
};

/**
 *
 * url /api/downlines/v2/tree/list-user/0x27ffb136b9ee2711BD39975b766Beda5992738Cf?page=1&limit=10&level=1
 */

const handler: NextApiHandler = async (req, res) => {
  const address = lowerCase(req.query.address);
  const level = req.query.level ? Number(req.query.level) : 1;
  const page = req.query.page;
  const limit = req.query.limit;

  const isLimitNumOrNan = Number(limit) < 1 || !Number(limit);
  const isPageNumOrNan = Number(page) < 1 || !Number(page);

  const pageSize = isLimitNumOrNan ? 5 : Number(limit);
  const offset = pageSize * (isPageNumOrNan ? 0 : Number(page) - 1);

  try {
    const getUser = await getUserListUserPerLevel(
      address,
      level,
      offset,
      pageSize
    );

    const getPage = await getPagesFromListUser(address, level, pageSize);
    return res.status(200).json({
      totalItem: getPage?.totalItem,
      totalPage: getPage?.totalPage,
      items: getUser,
    });
  } catch (e: any) {
    return res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
};

export default handler;
