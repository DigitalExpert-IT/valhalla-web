import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  Card,
  CardBody,
  CardHeader,
  Container,
} from "@chakra-ui/react";
import { LayoutMainV2 } from "components";
import { FormShareToEarn } from "components/Form/FormShareToEarn";
import { SHARE_MEDIA } from "constant/pages/share";
import { useTranslation } from "react-i18next";

const ShareV2 = () => {
  const { t } = useTranslation();
  return (
    <LayoutMainV2>
      <Box bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)">
        <Box
          bgImage="url('/assets/project/pattern2.png')"
          backgroundSize="inherit"
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center"}
        >
          <Container
            minH="55vh"
            maxW="container.xl"
            overflowX="hidden"
            py={{ base: "20", md: "40" }}
          >
            <Heading
              mb={{ base: 10, md: 10, lg: 2 }}
              fontSize={{ base: "xl", md: "5xl" }}
              textAlign="center"
              textTransform="uppercase"
              _after={{
                content: `'${t("pages.shareToEarn.share")}'`,
                alignSelf: "center",
                display: "block",
                fontSize: { base: "56", md: "100", lg: "210" },
                mt: { base: "-45px", md: "-90px", lg: "-120px" },
                color: "whiteAlpha.100",
                textAlign: "center",
              }}
            >
              {t("pages.shareToEarn.title").toUpperCase()}
            </Heading>
            <Box textAlign="center" display={{ base: "block", md: "none" }}>
              <Text as="u">{t(`pages.share.subtitle`)}</Text>
              <Text fontSize="xs">{t(`pages.share.subDescription`)}</Text>
            </Box>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              gap={"5"}
              mt={"4rem"}
              zIndex="10"
            >
              {SHARE_MEDIA.map((item, idx) => (
                <Card
                  key={idx}
                  variant="filled"
                  backgroundColor={"#006BB4"}
                  borderRadius={"2xl"}
                >
                  <Box bg="#1D9BF0" p={5} borderRadius="2xl">
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
                            {t(
                              `pages.share.item.${item.mediaName}.titleDescription`
                            )}
                          </Text>
                        </Flex>
                      </Flex>
                    </CardHeader>
                    <CardBody
                      p={"unset"}
                      display={{ base: "none", md: "block" }}
                    >
                      <Text fontWeight={"700"} mt={5} mb={2}>
                        {t(`pages.share.item.${item.mediaName}.subtitle`)}
                      </Text>
                      <Text>
                        {t(
                          `pages.share.item.${item.mediaName}.subtitleDescription`
                        )}
                      </Text>
                    </CardBody>
                  </Box>
                  <Box p="2">
                    <FormShareToEarn mediaName={item.mediaName} />
                  </Box>
                </Card>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </LayoutMainV2>
  );
};

export default ShareV2;
