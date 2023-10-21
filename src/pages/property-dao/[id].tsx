import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  Badge,
  Stack,
  Avatar,
  AspectRatio,
  Button,
  IconButton,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { CopiableText, LayoutMainV2 } from "components";
import { DATA_DAO } from "constant/dao";
import { useTranslation } from "react-i18next";
import { BsBookmark } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import useDao from "hooks/property-dao/useDao";
import { useAsyncCall } from "hooks";
import { useRouter } from "next/router";
import { useContractRead } from "@thirdweb-dev/react";
import { useDaoContract } from "hooks/property-dao";
import { prettyBn, shortenAddress } from "utils";

const Detail = () => {
  const { t } = useTranslation();
  const [id, setId] = useState<any>(0);
  const router = useRouter();
  const daoContract = useDaoContract();
  const getVilla = useContractRead(daoContract.contract, "getVilla", [id]);

  useEffect(() => {
    if (router.isReady) {
      setId(Number(router.query.id) as number);
    }
  }, [router.isReady]);

  const { buy, isLoading: isLoadingDao } = useDao();
  const { exec, isLoading } = useAsyncCall(buy, t("common.succesBuyNft"));

  const buyVilla = () => {
    exec(id, 1);
  };

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
          <Stack
            direction={{ base: "column", md: "column", lg: "row" }}
            pt="2rem"
            spacing="3rem"
          >
            <Box flex={0.9}>
              <AspectRatio
                maxW={{ base: "100%", md: "900px" }}
                ratio={{ base: 1, md: 4 / 3 }}
              >
                <Image
                  rounded={"md"}
                  src={DATA_DAO[id].image}
                  alt="nft-detail"
                />
              </AspectRatio>
            </Box>
            <Stack
              spacing={{ base: "0.5rem", md: "1rem" }}
              flex={1}
              justifyContent={"space-between"}
            >
              <Box>
                <Heading size={{ base: "xl", md: "xl", lg: "xl", xl: "3xl" }}>
                  {DATA_DAO[id].name}
                </Heading>
              </Box>
              <Box>
                <Badge
                  textTransform="capitalize"
                  rounded="full"
                  color="black"
                  bg="gray.300"
                  alignItems="center"
                  alignContent="center"
                  justifyItems="center"
                >
                  <Avatar
                    src={DATA_DAO[id].countryImage}
                    name="country-flag"
                    size="xs"
                    mt="-1"
                    mr="2"
                  />
                  {DATA_DAO[id].country}
                </Badge>
              </Box>
              <Box maxW={{ base: "100%", md: "80%" }} pt="1rem">
                <Stack direction="row" flexWrap="wrap">
                  <Box minW={"40%"} maxW={"40%"} mb={8}>
                    <Text fontWeight="bold">Fraction sold</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                      5900
                    </Text>
                    <Text fontWeight="bold">100% (5900)</Text>
                  </Box>
                  <Box minW={"40%"} maxW={"40%"} mb={8}>
                    <Text fontWeight="bold">Est.Return</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                      22%
                    </Text>
                    <Text fontWeight="bold">/year</Text>
                  </Box>
                  <Box minW={"40%"} maxW={"40%"} mb={8}>
                    <Text fontWeight="bold">Price</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                      {prettyBn(getVilla?.data?.price, 6)} USDT
                    </Text>
                    <Text fontWeight="bold">/fraction</Text>
                  </Box>
                  <Box minW={"40%"} maxW={"40%"} mb={8}>
                    <Text fontWeight="bold">Investment has been</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                      Completed
                    </Text>
                  </Box>
                </Stack>
              </Box>
              <Stack direction="row" spacing="1rem" pt="1rem">
                <Button
                  variant="solid"
                  bgColor="white"
                  rounded="lg"
                  color="black"
                  _hover={{ bg: "gray.600" }}
                  _disabled={{ color: "gray.200" }}
                  size="lg"
                  w={{ base: "100%", md: "49%" }}
                  isLoading={isLoading || isLoadingDao}
                  spinner={<Spinner color="#191272" />}
                  onClick={buyVilla}
                >
                  Buy
                </Button>
                <IconButton
                  icon={<BsBookmark />}
                  aria-label="bookmark"
                  size="lg"
                  _hover={{ bg: "gray.600" }}
                  variant="solid"
                  bg="white"
                  color="black"
                  rounded="md"
                />
              </Stack>
            </Stack>
          </Stack>

          {/* white belt component */}
          <Stack
            bgColor="white"
            direction="row"
            w="100%"
            rounded="lg"
            my="2rem"
            p={{ base: 2, md: 8, lg: 2, xl: 8 }}
            justify="space-between"
            border="2px"
            borderColor="black"
            spacing={{ base: "2rem", md: "1rem" }}
          >
            <Stack
              flex={1}
              direction={{ base: "column", md: "column", lg: "row" }}
              justify={{ base: "center", md: "space-between" }}
              spacing="1rem"
            >
              <Box>
                <Text color="black" fontWeight="bold">
                  Total investment amount
                </Text>
                <Text color="gray.500">$295.000,00</Text>
              </Box>
              <Box>
                <Text color="black" fontWeight="bold">
                  Est.Return
                </Text>
                <Text color="gray.500">22% / year</Text>
              </Box>
              <Box>
                <Text color="black" fontWeight="bold">
                  Avg Return on the Platform
                </Text>
                <Text color="gray.500">-</Text>
              </Box>
            </Stack>
            <Stack
              flex={1}
              direction={{ base: "column", md: "column", lg: "row" }}
              justify={{ base: "center", md: "space-around" }}
              spacing="1rem"
            >
              <Box>
                <Text color="black" fontWeight="bold">
                  Investing Period
                </Text>
                <Text color="gray.500">10 Months</Text>
              </Box>
              <Box>
                <Text color="black" fontWeight="bold">
                  Exit Date
                </Text>
                <Text color="gray.500">6/20/2024</Text>
              </Box>
              <Box>
                <Text color="black" fontWeight="bold">
                  Exit Type
                </Text>
                <Text color="gray.500">USDT</Text>
              </Box>
            </Stack>
          </Stack>
          {/* end white belt*/}

          {/*Description*/}
          <Stack direction={{ base: "column", md: "row" }} spacing="2rem">
            <Box flex={1}>
              <Heading fontWeight="bold" mb="2rem">
                Description
              </Heading>
              <Text>{t("pages.dao.detailDaoDescription")} </Text>
            </Box>
            <Box flex={1}>
              <Heading fontWeight="bold" mb="2rem">
                Details
              </Heading>
              <Box display="flex">
                <Icon
                  as={FaRegHandshake}
                  color="black"
                  w="62px"
                  h="62px"
                  bg="white"
                  p="3"
                  rounded="lg"
                />
                <Icon
                  as={BiHome}
                  color="black"
                  w="62px"
                  h="62px"
                  bg="white"
                  p="3"
                  mx="1rem"
                  rounded="lg"
                />
                <Icon
                  as={AiOutlineDollarCircle}
                  color="black"
                  w="62px"
                  h="62px"
                  bg="white"
                  p="3"
                  rounded="lg"
                />
              </Box>
              <Box mt="2rem">
                <Stack direction="row" justify="space-between" align="center">
                  <Text fontWeight="bold" fontSize="lg">
                    Contract Address
                  </Text>
                  <CopiableText value={`${daoContract.contract?.getAddress()}`}>
                    {shortenAddress(`${daoContract.contract?.getAddress()}`)}
                  </CopiableText>
                </Stack>
                <Stack
                  direction="row"
                  justify="space-between"
                  my="2rem"
                  align="center"
                >
                  <Text fontWeight="bold" fontSize="lg">
                    NFT-ID
                  </Text>
                  <Text>{getVilla?.data?.id.toString()}</Text>
                </Stack>
                <Stack direction="row" justify="space-between" align="center">
                  <Text fontWeight="bold" fontSize="lg">
                    Blockchain
                  </Text>
                  <Text>Polygon</Text>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </LayoutMainV2>
  );
};
export default Detail;
