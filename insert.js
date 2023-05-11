const { config } = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
// const 

config();

const db = new PrismaClient();

const sleep = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, 200);
  });

const run = async () => {
  const dataString = fs.readFileSync("./transaction.json", {
    encoding: "utf-8",
  });
  const dataObj = JSON.parse(dataString);
  for (let i = 0; i < dataObj.length; i++) {
    const item = dataObj[i];
    await db.nftTransaction.create({
      data: {
        tokenId: "" + item.tokenId,
        from: item.from.toLowerCase(),
        to: item.to.toLowerCase(),
      },
    });
    await sleep();
  }

  console.log("insert success");
};

run().then().catch(console.log);
