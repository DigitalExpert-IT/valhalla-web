import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Text,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import { LayoutMain } from "components";
import { SHARE_MEDIA } from "constant/pages/share";
import { useTranslation } from "react-i18next";

const Share = () => {
  const { t } = useTranslation();
  return (
    <LayoutMain>
      <Heading textAlign={"center"}>
        {t("pages.shareToEarn.title").toUpperCase()}
      </Heading>

      <Grid templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)"}} gap={"5"} mt={"4rem"}>
        {SHARE_MEDIA.map((item, idx) => (
          <Card
            key={idx}
            variant="gradient"
            colorScheme={"pink:purple:purple"}
            backgroundColor={"#6750A466"}
            borderRadius={"2xl"}
            p={10}
          >
            <CardHeader p={"unset"}>
              <Flex gap={3}>
                <Image
                  src={item.image}
                  alt={"ig"}
                  width={70}
                  height={70}
                  objectFit={"contain"}
                />
                <Flex direction={"column"} justify={"space-evenly"}>
                  <Heading size={"lg"}>
                    {item.mediaName.charAt(0).toUpperCase() +
                      item.mediaName.slice(1)}
                  </Heading>
                  <Text fontSize={"xs"}>
                    {t(`pages.share.item.${item.mediaName}.titleDescription`)}
                  </Text>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody p={"unset"}>
              <Text fontWeight={"700"} mt={5} mb={2}>
                {t(`pages.share.item.${item.mediaName}.subtitle`)}
              </Text>
              <Text>
                {t(`pages.share.item.${item.mediaName}.subtitleDescription`)}
              </Text>
              <Flex mt={3} gap={2}>
                <Box
                  backgroundColor={"#180240"}
                  p={2}
                  borderRadius={"2xl"}
                  w={"full"}
                  opacity={"70%"}
                >
                  <Input
                    padding={""}
                    type={"text"}
                    fontSize={"sm"}
                    backgroundColor={"transparent"}
                    placeholder={
                      t(`pages.share.placeholder`, { media: item.mediaName })!
                    }
                  />
                </Box>
                <Flex
                  backgroundColor={"#6B5BE7"}
                  alignItems={"center"}
                  borderRadius={"2xl"}
                  px={5}
                >
                  <Image src={"/assets/icon/send.png"} w={5} h={5} />
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </LayoutMain>
  );
};

export default Share;
