import React, { useRef } from "react";
import { NFTMATHCING } from "constant/pages/nftFarming";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Box,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

export const AccordionNFTFarm = () => {
  return (
    <Accordion allowToggle pb="10rem">
      {NFTMATHCING.map((item, idx) => (
        <AccordionItem border="none" key={idx}>
          <AccordionButton
            borderBottom="1px solid"
            borderBottomColor="blackAlpha.500"
            bg="#8E59FF"
            _expanded={{
              bg: "#311769",
              borderBottom: "1px solid",
              borderBottomColor: "blackAlpha.100",
            }}
            _hover={{
              bg: "#421f8d",
            }}
          >
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
          <AccordionPanel bgColor="#311769BF">
            {item.content.map((obj, idx) => (
              <Stack key={idx} spacing={5}>
                <Text>{obj.name + obj.description}</Text>
              </Stack>
            ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const SectionNFTFarmMatching = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Box textAlign="center" mb="10" mt="60">
        <Heading textTransform="capitalize">
          {t("pages.nftFarming.farmMathcingRequirement")}
        </Heading>
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
                <Stack
                  direction={{ base: "column", md: "row" }}
                  justify={{ base: "none", md: "space-between" }}
                  textAlign={{ base: "center", md: "left" }}
                  key={idx}
                  spacing={5}
                >
                  <Text color={idx % 2 ? "blue.400" : ""}>{obj.name}</Text>
                  <Text color={idx % 2 ? "blue.400" : ""}>
                    {obj.description}
                  </Text>
                </Stack>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};
