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
  Icon,
  Spinner,
  UnorderedList,
  Link,
  ListItem,
  Button,
  Input,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { CopiableText, LayoutMainV2 } from "components";
import { DATA_DAO } from "constant/dao";
import { useTranslation } from "react-i18next";
import { FaRegHandshake } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { AiOutlineDollarCircle, AiOutlineFilePdf } from "react-icons/ai";
import { useRouter } from "next/router";
import { useContractRead } from "@thirdweb-dev/react";
import { useDaoContract } from "hooks/property-dao";
import { prettyBn, shortenAddress } from "utils";
import Slider from "react-slick";
import dynamic from "next/dynamic";

const Countdown = dynamic(() => import("../../components/Countdown"), {
  ssr: false,
});

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

  const settings = {
    customPaging: (i: any) => {
      return (
        <Box>
          <Image
            src={DATA_DAO[id].imageCaraousel![i]?.picture}
            alt="nft-details"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Box>
      );
    },
    dots: true,
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const fractionPercen = (data?.sold * 100) / data?.maxLot;

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
            mb={{ base: "2rem", md: "8rem" }}
          >
            <Box
              w={{ xl: "50%", md: "100%", sm: "85%", lg: "50%" }}
              mb={{ base: "15rem", xs: "10rem", md: "5rem" }}
            >
              <Slider {...settings}>
                {DATA_DAO[id].imageCaraousel!.map((item, idx) => (
                  <Box key={idx}>
                    <AspectRatio
                      maxW={{ base: "100%", md: "900px" }}
                      ratio={{ base: 1, md: 4 / 3 }}
                    >
                      <Image
                        rounded={"md"}
                        src={item.picture}
                        alt="nft-detail"
                      />
                    </AspectRatio>
                  </Box>
                ))}
              </Slider>
            </Box>
            <Stack spacing={{ base: "0.5rem" }} flex={1}>
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
              <Box maxW={{ base: "100%", md: "80%" }} pt="4rem">
                <Stack direction="row" flexWrap="wrap">
                  <Box minW={"40%"} maxW={"40%"} mb={8}>
                    <Text fontWeight="bold">
                      {t("pages.daoBali.fractionSold")}
                    </Text>
                    <LoaderSuspense
                      component={
                        <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                          {data?.sold.toString()}
                        </Text>
                      }
                      data={data?.sold}
                    />
                    <LoaderSuspense
                      component={
                        <Text fontWeight="bold">{`${fractionPercen.toFixed(
                          2
                        )}% (from ${data?.maxLot})`}</Text>
                      }
                      data={data?.maxLot}
                    />
                  </Box>
                  <Box minW={"40%"} maxW={"40%"} mb={8}>
                    <Text fontWeight="bold">
                      {t("pages.daoBali.appreciation")}
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                      21%
                    </Text>
                    <Text fontWeight="bold">/year</Text>
                  </Box>
                  <Box minW={"40%"} maxW={"40%"} mb={8}>
                    <Text fontWeight="bold">{t("pages.daoBali.price")}</Text>
                    <LoaderSuspense
                      component={
                        <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                          {prettyBn(data?.price, 6)} USDT
                        </Text>
                      }
                      data={prettyBn(data?.price, 6)}
                    />
                    <Text fontWeight="bold">/fraction</Text>
                  </Box>
                  <Box minW={"40%"} maxW={"40%"} mb={8}>
                    <Text fontWeight="bold">
                      {t("pages.daoBali.investment")}
                    </Text>
                    <LoaderSuspense
                      component={
                        <Text fontSize="2xl" fontWeight="bold" color="#FFC2C2">
                          {data?.maxLot === data?.sold
                            ? t("common.Completed")
                            : t("common.inProgres")}
                        </Text>
                      }
                      data={data?.maxLot || data?.sold}
                    />
                  </Box>
                </Stack>
              </Box>
              <Stack pt={"1rem"}>
                <Countdown
                  targetDate={new Date("2024-02-15T24:00:00.000Z")}
                  showExpired={<></>}
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
              justify={{ base: "center", md: "space-around" }}
              spacing="1rem"
            >
              <Box>
                <Text color="black" fontWeight="bold">
                  Total investment amount
                </Text>
                <Text color="gray.500">$650.000</Text>
              </Box>
              <Box>
                <Text color="black" fontWeight="bold">
                  Est.Return
                </Text>
                <Text color="gray.500">21% / year</Text>
              </Box>
              <Box>
                <Text color="black" fontWeight="bold">
                  Investing Period
                </Text>
                <Text color="gray.500">3 Months</Text>
              </Box>
              <Box>
                <Text color="black" fontWeight="bold">
                  Exit Date
                </Text>
                <Text color="gray.500">-</Text>
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
                <Text>{t("pages.daoBali.detailDaoDescription1")} </Text>
                <Text>{t("pages.daoBali.location")} </Text>
                <Text>{t("pages.daoBali.detailDaoDescription2")} </Text>
                <Stack>
                  <Text>Some Specs : </Text>
                  <UnorderedList paddingLeft={"2rem"}>
                    <ListItem>{t("pages.daoBali.1")}</ListItem>
                    <ListItem>{t("pages.daoBali.2")}</ListItem>
                    <ListItem>{t("pages.daoBali.3")}</ListItem>
                    <ListItem>{t("pages.daoBali.4")}</ListItem>
                    <ListItem>{t("pages.daoBali.5")}</ListItem>
                    <ListItem>{t("pages.daoBali.6")}</ListItem>
                    <ListItem>{t("pages.daoBali.7")}</ListItem>
                    <ListItem>{t("pages.daoBali.8")}</ListItem>
                    <ListItem>{t("pages.daoBali.9")}</ListItem>
                    <ListItem>{t("pages.daoBali.10")}</ListItem>
                    <ListItem>{t("pages.daoBali.11")}</ListItem>
                    <ListItem>{t("pages.daoBali.12")}</ListItem>
                    <ListItem>{t("pages.daoBali.13")}</ListItem>
                    <ListItem>{t("pages.daoBali.14")}</ListItem>
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
                  label={"Income: Rental"}
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
                  label={"State: Constructed"}
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
                  label={"Exit Term: Long"}
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
                {/*remember this must be changed while had more than 1 property*/}
                {/* <Link
                  href={
                    "https://drive.google.com/file/d/1w_3KRsoqy7Mf8KhJ5BFO0aKR7YjjoH24/view?usp=sharing"
                  }
                  target="_blank"
                >
                  <Tooltip
                    fontWeight={"600"}
                    backgroundColor={"white"}
                    label={"Real Estate Document"}
                    shouldWrapChildren
                    placement="top"
                  >
                    <Icon
                      as={AiOutlineFilePdf}
                      color="black"
                      w="62px"
                      h="62px"
                      bg="white"
                      p="3"
                      mx="1rem"
                      rounded="lg"
                    />
                  </Tooltip>
                </Link> */}
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

// move this to helper if it used widely
interface LoaderSuspenseProps {
  component: React.ReactElement;
  data: any;
}

const LoaderSuspense = (props: LoaderSuspenseProps) => {
  const { component, data } = props;
  return data ? component : <Spinner />;
};

export default Detail;
