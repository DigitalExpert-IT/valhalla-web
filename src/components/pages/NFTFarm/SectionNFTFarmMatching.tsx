import React from "react";
import { NFTMATHCING } from "constant/pages/nftFarming";
import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Box,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";

export const SectionNFTFarmMatching = () => {
  return (
    <Box>
      <Box textAlign="center" mb="10" mt="60">
        <Heading>NFT Farm Matching Requirement</Heading>
      </Box>
      <Accordion allowToggle p="2">
        {NFTMATHCING.map((item, idx) => (
          <AccordionItem
            rounded="xl"
            border="none"
            p="5"
            background="valhalla.900"
            key={idx}
            mb="2"
          >
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                textTransform="capitalize"
                fontWeight="bold"
              >
                {item.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel bgColor="valhalla.800">
              {item.content.map((obj, idx) => (
                <HStack justify="space-between" key={idx} spacing={5}>
                  <Text color={idx % 2 ? "blue.400" : ""}>{obj.name}</Text>
                  <Text color={idx % 2 ? "blue.400" : ""}>
                    {obj.description}
                  </Text>
                </HStack>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};
