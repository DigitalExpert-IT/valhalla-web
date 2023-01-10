import { Box, Flex, Grid, Heading, Image, Input, Text } from "@chakra-ui/react";
import { LayoutMain } from "components";
import { Trans, useTranslation } from "react-i18next";

const Share = () => {
  const { t } = useTranslation();

  return (
    <LayoutMain>
      <Heading textAlign={"center"}>
        {t("pages.shareToEarn.title").toUpperCase()}
      </Heading>

      <Grid templateColumns="repeat(2, 1fr)" gap={"5"} mt={"4rem"}>
        <Box backgroundColor={"#6750A4"} p={"2rem"} borderRadius={"1rem"}>
          <Flex gap={3}>
            <Image
              src={"/assets/icon/instagram.png"}
              alt={"ig"}
              width={70}
              height={70}
              objectFit={"contain"}
            />
            <Box>
              <Heading>Instagram</Heading>
              <Text fontSize={"sm"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Text>
            </Box>
          </Flex>
          <Box mt={"5"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris
          </Box>
          <Flex mt={3} gap={2}>
            <Box backgroundColor={"#180240"} p={2} borderRadius={"2xl"} w={"full"} opacity={"70%"}>
              <Input
                padding={""}
                type={"text"}
                fontSize={"sm"}
                backgroundColor={"transparent"}
                placeholder={"Paste your twitter post link here"}
              />
            </Box>
            <Flex backgroundColor={"#6B5BE7"} alignItems={"center"} borderRadius={"2xl"} px={5}>
                <Image src={"/assets/icon/send.png"} w={5} h={5} />
            </Flex>
          </Flex>
        </Box>
        <Box backgroundColor={"#6750A4"} p={"2rem"} borderRadius={"1rem"}>
          <Flex gap={3}>
            <Image
              src={"/assets/icon/instagram.png"}
              alt={"ig"}
              width={70}
              height={70}
              objectFit={"contain"}
            />
            <Box>
              <Heading>Instagram</Heading>
              <Text fontSize={"sm"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Text>
            </Box>
          </Flex>
          <Box mt={"5"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris
          </Box>
          <Flex mt={3} gap={2}>
            <Box backgroundColor={"#180240"} p={2} borderRadius={"2xl"} w={"full"} opacity={"70%"}>
              <Input
                padding={""}
                type={"text"}
                fontSize={"sm"}
                backgroundColor={"transparent"}
                placeholder={"Paste your twitter post link here"}
              />
            </Box>
            <Flex backgroundColor={"#6B5BE7"} alignItems={"center"} borderRadius={"2xl"} px={5}>
                <Image src={"/assets/icon/send.png"} w={5} h={5} />
            </Flex>
          </Flex>
        </Box>        <Box backgroundColor={"#6750A4"} p={"2rem"} borderRadius={"1rem"}>
          <Flex gap={3}>
            <Image
              src={"/assets/icon/instagram.png"}
              alt={"ig"}
              width={70}
              height={70}
              objectFit={"contain"}
            />
            <Box>
              <Heading>Instagram</Heading>
              <Text fontSize={"sm"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Text>
            </Box>
          </Flex>
          <Box mt={"5"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris
          </Box>
          <Flex mt={3} gap={2}>
            <Box backgroundColor={"#180240"} p={2} borderRadius={"2xl"} w={"full"} opacity={"70%"}>
              <Input
                padding={""}
                type={"text"}
                fontSize={"sm"}
                backgroundColor={"transparent"}
                placeholder={"Paste your twitter post link here"}
              />
            </Box>
            <Flex backgroundColor={"#6B5BE7"} alignItems={"center"} borderRadius={"2xl"} px={5}>
                <Image src={"/assets/icon/send.png"} w={5} h={5} />
            </Flex>
          </Flex>
        </Box>        <Box backgroundColor={"#6750A4"} p={"2rem"} borderRadius={"1rem"}>
          <Flex gap={3}>
            <Image
              src={"/assets/icon/instagram.png"}
              alt={"ig"}
              width={70}
              height={70}
              objectFit={"contain"}
            />
            <Box>
              <Heading>Instagram</Heading>
              <Text fontSize={"sm"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Text>
            </Box>
          </Flex>
          <Box mt={"5"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris
          </Box>
          <Flex mt={3} gap={2}>
            <Box backgroundColor={"#180240"} p={2} borderRadius={"2xl"} w={"full"} opacity={"70%"}>
              <Input
                padding={""}
                type={"text"}
                fontSize={"sm"}
                backgroundColor={"transparent"}
                placeholder={"Paste your twitter post link here"}
              />
            </Box>
            <Flex backgroundColor={"#6B5BE7"} alignItems={"center"} borderRadius={"2xl"} px={5}>
                <Image src={"/assets/icon/send.png"} w={5} h={5} />
            </Flex>
          </Flex>
        </Box>        <Box backgroundColor={"#6750A4"} p={"2rem"} borderRadius={"1rem"}>
          <Flex gap={3}>
            <Image
              src={"/assets/icon/instagram.png"}
              alt={"ig"}
              width={70}
              height={70}
              objectFit={"contain"}
            />
            <Box>
              <Heading>Instagram</Heading>
              <Text fontSize={"sm"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Text>
            </Box>
          </Flex>
          <Box mt={"5"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris
          </Box>
          <Flex mt={3} gap={2}>
            <Box backgroundColor={"#180240"} p={2} borderRadius={"2xl"} w={"full"} opacity={"70%"}>
              <Input
                padding={""}
                type={"text"}
                fontSize={"sm"}
                backgroundColor={"transparent"}
                placeholder={"Paste your twitter post link here"}
              />
            </Box>
            <Flex backgroundColor={"#6B5BE7"} alignItems={"center"} borderRadius={"2xl"} px={5}>
                <Image src={"/assets/icon/send.png"} w={5} h={5} />
            </Flex>
          </Flex>
        </Box>
      </Grid>
    </LayoutMain>
  );
};

export default Share;
