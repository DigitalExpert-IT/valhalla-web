import { NextApiHandler } from "next";
import { CARD_IMAGE_ASSET, CARD_IMAGE_MAP } from "constant/image";

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id;
  const animation = CARD_IMAGE_MAP[id as "0"];
  const image = CARD_IMAGE_ASSET[id as "0"];
  if (!animation || !image) {
    return res
      .status(404)
      .json({ status: 404, message: "The requested URL was not found." });
  }
  const imageTemplate = {
    name: `Farm ${Number(id) + 1}`,
    description: `NFT Network Farm ${Number(id) + 1}`,
    external_url: `https://globalnetwork.finance/api/image/${id}`,
    image: image,
    animation_url: animation,
    attributes: [
      {
        trait_type: "Farm Type",
        value: Number(id) + 1,
      },
      {
        trait_type: "Type",
        value: "Farming",
      },
    ],
  };

  return res.status(200).json(imageTemplate);
};

export default handler;
