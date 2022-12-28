import { Telegraf } from "telegraf";
declare module globalThis {
  var ethereum: any;
}

declare module "telegraf" {
  interface Telegraf extends Telegraf {
    initiated: boolean;
  }
}
