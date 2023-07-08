import { test, expect } from "@playwright/test";
import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

test("should get downline user tree at level 1", async () => {
  const userRoot = "0x458ae247679f92bed7cbd56df323121520ef02c2";
  const page = 1;
  const pageSize = 10;
  const level = 1;

  const getListUserInFirstLevel = await prisma.user.findMany({
    where: {
      upline: userRoot,
    },
  });

  const totalUserInGroup = getListUserInFirstLevel.length;

  const userList = await Axios.post(
    `http://localhost:3000/api/downlines/v2/tree/list-user/${userRoot}?page=${page}&limit=${pageSize}`,
    {
      level,
    }
  );
  expect(userList.data.level).toEqual(level);
  expect(userList.data.totalItem).toEqual(totalUserInGroup);
  expect(userList.data.totalPage).toEqual(
    Math.ceil(userList.data.totalPage / pageSize)
  );
});
