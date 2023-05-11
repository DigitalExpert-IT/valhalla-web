const { config } = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

config();

const db = new PrismaClient();

const run = async () => {
  const dataString = fs.readFileSync("./transaction.json", {
    encoding: "utf-8",
  });
  const dataObj = JSON.parse(dataString);
  await db.nftTransaction.createMany({
    data: dataObj.map(item => ({
      tokenId: ''+item.tokenId,
      from: item.from,
      to: item.to,
    })),
  });

  console.log("insert success");
};

run().then().catch(console.log);
