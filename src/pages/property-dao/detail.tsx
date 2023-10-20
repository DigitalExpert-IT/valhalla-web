import React from "react";
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
} from "@chakra-ui/react";
import { BsBookmark } from "react-icons/bs";
import { LayoutMainV2 } from "components";
import { useTranslation } from "react-i18next";
import { FaRegHandshake } from "react-icons/fa";

const Detail = () => {
  const { t } = useTranslation();
  return (
    <LayoutMainV2>
      <Box
        px={{ base: "1rem", md: "2rem", lg: "1rem", xl: "5rem" }}
        py={{ base: "5rem", md: "8rem" }}
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
                src="/assets/property-dao/detail-nft.jpg"
                alt="nft-detail"
              />
            </AspectRatio>
          </Box>
          <Stack spacing={{ base: "0.5rem", md: "1rem" }} flex={1}>
            <Box>
              <Heading size={{ base: "xl", md: "xl", lg: "xl", xl: "3xl" }}>
                Semidetached Villa in Bodrum
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
                  src="https://cdn.britannica.com/82/4782-050-8129909C/Flag-Turkey.jpg"
                  name="country-flag"
                  size="xs"
                  mt="-1"
                  mr="2"
                />
                Turkey
              </Badge>
            </Box>
            <Box maxW="80%" pt={{ base: "1rem", md: "4rem" }}>
              <Stack direction="row" justify="space-between" align="center">
                <Box>
                  <Text fontWeight="bold">Fraction sold</Text>
                  <Text fontSize="2xl" fontWeight="bold" color="tomato">
                    5900
                  </Text>
                  <Text>100% (5900)</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Est.Return</Text>
                  <Text fontSize="2xl" fontWeight="bold" color="tomato">
                    22%
                  </Text>
                  <Text>/year</Text>
                </Box>
              </Stack>
              <Stack
                direction="row"
                justify="space-between"
                mt={{ base: "1rem", md: "2rem" }}
                align="center"
              >
                <Box>
                  <Text fontWeight="bold">Investment has been</Text>
                  <Text fontSize="2xl" fontWeight="bold" color="tomato">
                    Completed
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Price</Text>
                  <Text fontSize="2xl" fontWeight="bold" color="tomato">
                    $50.00
                  </Text>
                  <Text>/fraction</Text>
                </Box>
              </Stack>
            </Box>
            <Stack
              direction="row"
              spacing="1rem"
              pt={{ base: "2rem", md: "4rem" }}
            >
              <Button
                variant="solid"
                bgColor="white"
                rounded="lg"
                color="black"
                _hover={{ bg: "gray.600" }}
                size="lg"
                w="30%"
              >
                Sold Out
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
                as={FaRegHandshake}
                color="black"
                w="62px"
                h="62px"
                bg="white"
                p="3"
                mx="2rem"
                rounded="lg"
              />
              <Icon
                as={FaRegHandshake}
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
                <Text isTruncated="true">0xef0.....40dbb</Text>
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
                <Text>1</Text>
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
    </LayoutMainV2>
  );
};
export default Detail;
