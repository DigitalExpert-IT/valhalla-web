import { BULL_IMAGE_MAP } from "constant/image";
import { nftBullRunName } from "constant/pages/nftBullRun";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id as "0";
  const image = BULL_IMAGE_MAP[id];
  const result = {
    name: nftBullRunName[id],
    description: "NFT Bull Run",
    external_url: "https://globalnetwork.finance/api/erc1155/bull-run",
    image,
    attributes: [],
  };

  if (!image) {
    return res.status(404).send("404");
  }

  return res.send(result);
};

export default handler;
