import { Heading, Image } from "@chakra-ui/react";
import { rankMap } from "constant/rank";
import { useValhalla } from "hooks";
import { lowerCase } from "lodash";
import React from "react";
import { CardProfileV2 } from "./CardProfileV2";

export const CardProfileRankV2 = () => {
  const { account } = useValhalla();
  const imageUrl = `/assets/rank/${lowerCase(rankMap[account.rank]).replace(
    /\s/,
    "-"
  )}.svg`;
  return (
    <CardProfileV2>
      <Image src={imageUrl} alt="rank-image" mx="auto" h="52" />
      <Heading mt={"4"} textAlign={"center"}>
        {rankMap[account.rank]}
      </Heading>
    </CardProfileV2>
  );
};
