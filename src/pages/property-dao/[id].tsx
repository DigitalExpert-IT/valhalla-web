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
  Icon,
  Spinner,
  UnorderedList,
  Link,
  ListItem,
  Input,
  useNumberInput,
  Tooltip,
} from "@chakra-ui/react";
import { CopiableText, LayoutMainV2 } from "components";
import { DATA_DAO } from "constant/dao";
import { useTranslation } from "react-i18next";
import { FaRegHandshake } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import useDao from "hooks/property-dao/useDao";
import { useAsyncCall } from "hooks";
import { useRouter } from "next/router";
import { useContractRead } from "@thirdweb-dev/react";
import { useDaoContract } from "hooks/property-dao";
import { prettyBn, shortenAddress } from "utils";
import Slider from "react-slick";
import useClickConnectWallet from "hooks/useClickConnectWallet";

const Detail = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [id, setId] = useState<any>(0);
  const daoContract = useDaoContract();
  const { data, isLoading: loadingDao } = useContractRead(
    daoContract.contract,
    "getVilla",
    [id]
  );

  useEffect(() => {
    if (router.isReady) {
      setId(Number(router.query.id) as number);
    }
  }, [router.isReady]);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: data?.maxLot - data?.sold,
      precision: 0,
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const totalPrice = input.value * Number(prettyBn(data?.price, 6));

  const { buy, isLoading: isLoadingDao } = useDao();
  const { showModalConnectWallet, loading, isAbleToTransaction } =
    useClickConnectWallet();
  const { exec, isLoading } = useAsyncCall(buy, t("common.succesBuyNft"));

  const buyVilla = () => {
    if (!isAbleToTransaction) return showModalConnectWallet();
    exec(id, input.value);
  };

  const settings = {
    customPaging: () => {
      return (
        <Box>
          <Image src={DATA_DAO[id].image} alt="nft-details" w="500%" />
        </Box>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
            <Box w={{ xl: "50%", md: "100%", sm: "85%" }}>
              <Slider {...settings}>
                <Box>
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
                <Box>
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
              </Slider>
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
                    <Text fontWeight="bold">{t("pages.dao.fractionSold")}</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                      {data?.sold.toString()}
                    </Text>
                    <Text fontWeight="bold">
                      100% ({data?.maxLot.toString()})
                    </Text>
                  </Box>
                  <Box minW={"40%"} maxW={"40%"} mb={8}>
                    <Text fontWeight="bold">{t("pages.dao.appreciation")}</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                      90%
                    </Text>
                    <Text fontWeight="bold">/year</Text>
                  </Box>
                  <Box minW={"40%"} maxW={"40%"} mb={8}>
                    <Text fontWeight="bold">{t("pages.dao.price")}</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                      {prettyBn(data?.price, 6)} USDT
                    </Text>
                    <Text fontWeight="bold">/fraction</Text>
                  </Box>
                  <Box minW={"40%"} maxW={"40%"} mb={8}>
                    <Text fontWeight="bold">{t("pages.dao.investment")}</Text>
                    {loadingDao ? (
                      <Spinner />
                    ) : (
                      <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                        {data?.maxLot === data?.sold
                          ? t("common.Completed")
                          : t("common.inProgres")}
                      </Text>
                    )}
                  </Box>
                </Stack>
              </Box>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing="1rem"
                pt="1rem"
              >
                <Stack
                  direction="row"
                  w={{ base: "100%", md: "20%" }}
                  bgColor="white"
                  border="1px"
                  borderColor="black"
                  rounded="xl"
                  align="center"
                  justify="center"
                >
                  <Button variant="ghost" size="sm" color="black" {...dec}>
                    -
                  </Button>

                  <Input
                    textAlign="center"
                    variant="unstyled"
                    color="black"
                    {...input}
                  />
                  <Button variant="ghost" size="sm" color="black" {...inc}>
                    +
                  </Button>
                </Stack>
                <Button
                  variant="solid"
                  bgColor="whiteAlpha.900"
                  rounded="lg"
                  color="black"
                  _hover={{ bg: "whiteAlpha.700" }}
                  size="lg"
                  w={{ base: "100%", md: "49%" }}
                  isLoading={isLoading || isLoadingDao || loading}
                  spinner={<Spinner color="#191272" />}
                  onClick={buyVilla}
                  disabled={data?.sold === data?.maxLot ?? false}
                >
                  {data?.sold !== data?.maxLot
                    ? `Buy ${totalPrice} USDT`
                    : "Sold Out"}
                </Button>
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
              justify={{ base: "center", md: "space-around" }}
              spacing="1rem"
            >
              <Box>
                <Text color="black" fontWeight="bold">
                  Total investment amount
                </Text>
                <Text color="gray.500">$600.000,00</Text>
              </Box>
              <Box>
                <Text color="black" fontWeight="bold">
                  Est.Appreciation
                </Text>
                <Text color="gray.500">90% / year</Text>
              </Box>
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
                <Text color="gray.500">30/08/2023</Text>
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
              <Stack rowGap={5}>
                <Text>{t("pages.dao.detailDaoDescription1")} </Text>
                <Text>{t("pages.dao.location")} </Text>
                <Text>{t("pages.dao.detailDaoDescription2")} </Text>
                <Stack>
                  <Text>Some Specs : </Text>
                  <UnorderedList paddingLeft={"2rem"}>
                    <ListItem>{t("pages.dao.1")}</ListItem>
                    <ListItem>{t("pages.dao.2")}</ListItem>
                    <ListItem>{t("pages.dao.3")}</ListItem>
                    <ListItem>{t("pages.dao.4")}</ListItem>
                    <ListItem>{t("pages.dao.5")}</ListItem>
                    <ListItem>{t("pages.dao.6")}</ListItem>
                    <ListItem>{t("pages.dao.7")}</ListItem>
                    <ListItem>{t("pages.dao.8")}</ListItem>
                    <ListItem>{t("pages.dao.9")}</ListItem>
                    <ListItem>{t("pages.dao.10")}</ListItem>
                    <ListItem>{t("pages.dao.11")}</ListItem>
                  </UnorderedList>
                  {/* <Text>
                    Need more information? Reach us by our contact form{" "}
                    <Link
                      color={"#70FF75"}
                      href="https://goldenrealestate.com.tr/property/serina-bodrum/"
                    >
                      here.
                    </Link>
                  </Text> */}
                </Stack>
              </Stack>
            </Box>
            <Box flex={1}>
              <Heading fontWeight="bold" mb="2rem">
                Details
              </Heading>
              <Box display="flex">
                <Tooltip
                  fontWeight={"600"}
                  backgroundColor={"white"}
                  label={"Income: BuySell"}
                  shouldWrapChildren
                  placement="top"
                >
                  <Icon
                    as={FaRegHandshake}
                    color="black"
                    w="62px"
                    h="62px"
                    bg="white"
                    p="3"
                    rounded="lg"
                  />
                </Tooltip>
                <Tooltip
                  fontWeight={"600"}
                  backgroundColor={"white"}
                  label={"State: Under Constructed"}
                  shouldWrapChildren
                  placement="top"
                >
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
                </Tooltip>
                <Tooltip
                  fontWeight={"600"}
                  backgroundColor={"white"}
                  label={"Exit Term: Short"}
                  shouldWrapChildren
                  placement="top"
                >
                  <Icon
                    as={AiOutlineDollarCircle}
                    color="black"
                    w="62px"
                    h="62px"
                    bg="white"
                    p="3"
                    rounded="lg"
                  />
                </Tooltip>
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
                  <Text>{data?.id.toString()}</Text>
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
