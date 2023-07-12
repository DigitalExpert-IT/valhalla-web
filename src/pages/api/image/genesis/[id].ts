import { CARD_IMAGE_GENESIS_MAP } from "constant/image";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id;
  const image = CARD_IMAGE_GENESIS_MAP[id as "0"];
  if (!image) {
    return res.status(404).send("404");
  }

  return res.json({
    name: "NFT Genesis",
    description:
      "automatically receive a generous 2% share of the marketing revenues generated from subsequent NFT Farm sales.",
    image: "https://globalnetwork.finance/images/nft-genesis.png",
    animation_url: image,
  });
};

export default handler;
