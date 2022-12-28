import { Telegraf } from "telegraf";

declare module "telegraf" {
  interface Telegraf extends Telegraf {
    initiated: boolean;
  }
}
