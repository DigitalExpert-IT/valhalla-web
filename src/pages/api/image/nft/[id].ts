import { CARD_IMAGE_MAP } from "constant/image";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id;
  const image = CARD_IMAGE_MAP[id as "0"];
  if (!image) {
    return res.status(404).send("404");
  }

  return res.redirect(image);
};

export default handler;
