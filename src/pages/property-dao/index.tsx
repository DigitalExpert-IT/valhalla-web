import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { LayoutMainV2, TableSponsorBonus } from "components";
import { SectionDao, SectionOwnedDao } from "components/pages";
import { useAsyncCall, useScreen } from "hooks";
import useDao from "hooks/property-dao/useDao";
import { t } from "i18next";

const Dao = () => {
  const { isMobileScreen } = useScreen();
  const { sponsorReferral, claimSponsorReward } = useDao();

  const { exec, isLoading } = useAsyncCall(claimSponsorReward);

  return (
    <LayoutMainV2>
      <Box bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)">
        <Box
          px={{ base: "1rem", md: "2rem", lg: "1rem", xl: "5rem" }}
          py={{ base: "5rem", md: "8rem" }}
          bgImage={"/assets/property-dao/property-dao-detail_bg.png"}
          bgPos={"center"}
          bgSize={"100%"}
          bgRepeat={"no-repeat"}
        >
          {/* <ModalAnnouncement isComingSoon={true} /> */}
          <SectionDao />
          <TableSponsorBonus />
          <Box display="flex" justifyContent="center" mt="2rem">
            <Box
              display="flex"
              w={{ base: "100%", md: "41.5%" }}
              flexDir={{ base: "column", md: "column", lg: "row", xl: "row" }}
              backgroundColor="rgba(19, 8, 65, 0.5)"
              borderColor="rgba(19, 8, 65, 0.5)"
              rounded="md"
              justifyContent="space-between"
              p={5}
              textAlign="center"
              alignItems="center"
            >
              <Text
                fontWeight="400"
                fontSize={{ base: "10px", md: "sm", xl: "lg" }}
                mx="6"
                my="3"
                textTransform="uppercase"
              >
                {t("pages.dao.sponsorLabel")}
              </Text>
              <Button
                variant="gradient"
                color={"white"}
                colorScheme="purple:blue"
                borderRadius={10}
                w={{ base: "6xs" }}
                fontFamily={"Poppins"}
                fontSize={isMobileScreen ? 10 : 20}
                isLoading={isLoading}
                onClick={exec}
              >
                {sponsorReferral + " " + "USDT" + " " + t("common.claim")}
              </Button>
            </Box>
          </Box>
          <SectionOwnedDao />
        </Box>
      </Box>
    </LayoutMainV2>
  );
};

export default Dao;
