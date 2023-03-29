import { Heading, Image, Stack } from "@chakra-ui/react";
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
    <CardProfileV2 py={"4"}>
      <Stack
        flexDir={{ base: "row", lg: "column" }}
        gap={{ base: "4", sm: "8", lg: "0" }}
        justify={"center"}
        placeItems={"center"}
      >
        <Image
          src={imageUrl}
          alt="rank-image"
          mx={{ base: "0", lg: "auto" }}
          h={{ base: "24", lg: "36" }}
        />
        <Heading mt={"4"} textAlign={{ base: "start", lg: "center" }}>
          {rankMap[account.rank]}
        </Heading>
      </Stack>
    </CardProfileV2>
  );
};
