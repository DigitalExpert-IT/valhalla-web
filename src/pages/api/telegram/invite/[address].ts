import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { getValhallaContract } from "lib/contractFactory";
import { utils } from "ethers";
import { getTelegramBindingSignatureMessage, lowerCase } from "utils";

const prisma = new PrismaClient();
let bot = {} as Telegraf<Context<Update>>;

const init = async () => {
  if (bot.initiated) return;
  bot = new Telegraf(process.env.TELEGRAM_TOKEN!);
  bot.initiated = true;

  bot.on("chat_join_request", async ctx => {
    const userId = ctx.update.chat_join_request.from.id;
    const username = ctx.update.chat_join_request.from.username;
    const user = await prisma.user.findUnique({
      where: {
        telegramUsername: username,
      },
    });
    if (user) {
      ctx.approveChatJoinRequest(userId);
      ctx.sendMessage(`welcoming @${username} with address ${user.address}`);
    }
  });

  bot.launch();
};

const handler: NextApiHandler = async (req, res) => {
  init();
  const address = lowerCase(req.query.address as string);
  const { username, signature } = req.body;
  const valhalla = await getValhallaContract();
  let user = await prisma.user.findFirst({ where: { address } });

  if (!user) {
    const accountMap = await valhalla.accountMap(address);
    user = await prisma.user.upsert({
      where: {
        address,
      },
      create: {
        address,
        upline: lowerCase(accountMap.referrer),
        blockNumber: 0,
      },
      update: {
        address,
        upline: lowerCase(accountMap.referrer),
        blockNumber: 0,
      },
    });
  }

  if (user.telegramUsername) {
    return res.json({ type: "redirect" });
  }

  switch (req.method) {
    case "GET": {
      return res.json({ type: "request_bind" });
    }
    case "POST": {
      if (!signature || !username) {
        return res.status(400).json({ message: "Invalid request" });
      }
      const verifiedAddress = utils.verifyMessage(
        getTelegramBindingSignatureMessage(username),
        signature
      );
      if (verifiedAddress.toLowerCase() !== address.toLowerCase()) {
        return res.status(401).json({ message: "Invalid Signature" });
      }
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: { telegramUsername: username.replace(/^\@/, "") },
      });
      return res.json({ message: "Binding Success" });
    }
    default: {
      res.status(501).send("NOT IMPLEMENTED");
    }
  }
};

export default handler;
