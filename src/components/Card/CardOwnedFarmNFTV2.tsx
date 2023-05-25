import React from "react";
import { useAsyncCall } from "hooks";
import { OwnedNftType } from "hooks/useOwnedNFTList";
import { prettyBn } from "utils";
import { TextAnimation } from "components";
import { useTranslation } from "react-i18next";
import {
  Stack,
  Box,
  AspectRatio,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useContractWrite } from "@thirdweb-dev/react";
import { useNFTContract } from "hooks/useNFTContract";

export const CardOwnedFarmNFTV2 = (props: OwnedNftType) => {
  const { id, mintingPrice, cardId, percentage, tokenUri } = props;
  const { t } = useTranslation();
  const nft = useNFTContract();
  const farm = useContractWrite(nft.contract, "farm");
  const farmAsync = useAsyncCall(farm.mutateAsync);

  const handleFarm = async () => {
    await farmAsync.exec({ args: [id] });
  };

  return (
    <Box>
      <Box textAlign="center">
        <Heading>#NFT {id.toNumber()}</Heading>
      </Box>
      <Stack
        p="0.5"
        mt="5"
        bgGradient="linear(to-r, #FF00FF, blue.500)"
        borderRadius="xl"
      >
        <Box
          borderRadius="xl"
          bg="#6d02c9"
          px={{ base: 1.5, sm: 2, md: 5 }}
          py={5}
        >
          <Box rounded="xl" overflow="hidden" m="2">
            <AspectRatio w={{ base: "2xs", md: "xs" }} ratio={1}>
              <Box as="video" autoPlay loop muted rounded="xl">
                <source src={tokenUri} type="video/mp4" />
              </Box>
            </AspectRatio>
          </Box>
          <Stack my="5">
            <Stack direction="row" spacing={1} justify="space-between">
              <Text fontWeight="bold" fontSize="16px">
                Minting: {prettyBn(mintingPrice, 9)}
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                {percentage.toNumber() / 10 + "%"}
              </Text>
            </Stack>
            <Box>
              <Text
                fontWeight="bold"
                textTransform="capitalize"
                color="#FF00FF"
                fontSize="16px"
              >
                {t("common.globalNetworkFarm") +
                  " " +
                  cardId.add(1).toNumber() +
                  " " +
                  t("common.remainingFarm")}
              </Text>
            </Box>
          </Stack>
          <Button
            w="full"
            rounded="lg"
            size="sm"
            variant="gradient"
            colorScheme="purple:blue"
            color="white"
            onClick={handleFarm}
            isLoading={farmAsync.isLoading}
          >
            <TextAnimation mr="1">{0}</TextAnimation>
            Gnet Claim
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
