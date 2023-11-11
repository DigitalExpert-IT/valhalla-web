import Link from "next/link";
import Image from "next/image";
import {
  Heading,
  Text,
  Box,
  HStack,
  Button,
  Flex,
  Stack,
  Icon,
  VStack,
  AspectRatio,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";
import { AiOutlineArrowDown } from "react-icons/ai";
import { LazyVideo } from "components/LazyVideo";
import { useAccountMap } from "hooks/valhalla";
import { ButtonConnectWrapper } from "components/Button";
import { useScreen } from "hooks/useScreen";

export const SectionHeaderV2 = () => {
  const { t } = useTranslation();
  const accountMap = useAccountMap();
  const { isMobileScreen } = useScreen();

  return (
    <Flex h="100vh" pos="relative" align="center" justify="center" gap="10">
      <Image
        src="https://res.cloudinary.com/bangyosh-dev/image/upload/v1685874722/global-network/bgHeader_home_fq0gqx.png"
        alt="img-header"
        loading="lazy"
        sizes="100vw"
        style={{ objectFit: "cover" }}
        priority={false}
        z-index="0"
        fill
      />
      <Box
        display={{
          base: "none",
          lg: "block",
        }}
        minW="30%"
        rounded="xl"
        overflow="hidden"
      >
        <AspectRatio w={{ base: "none", md: "md", xl: " xl" }} ratio={1}>
          <LazyVideo
            src="https://ik.imagekit.io/msxxxaegj/video_gn/LOGO_I%CC%87NTRO.mp4?updatedAt=1686299614129"
            objectFit="cover"
          />
        </AspectRatio>
      </Box>
      <Stack
        maxW={"xl"}
        textAlign={{ base: "center", lg: "left" }}
        fontWeight="black"
        zIndex={1}
      >
        <Heading
          fontWeight="black"
          textShadow={{ base: "0px 4px 4px rgba(0, 0, 0, 0.25)", md: "none" }}
          fontSize={{ base: "4xl", xs: "5xl", md: "5xl", lg: "7xl" }}
          lineHeight="101%"
          bgGradient="linear(to-r, #9C29FF, #ffffff)"
          bgClip="text"
        >
          <Trans i18nKey="pages.home.headerv2.title" />
        </Heading>
        <Text
          fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
          fontWeight={"normal"}
          lineHeight="130%"
        >
          <Trans
            i18nKey="pages.home.headerv2.subtitle"
            components={{
              strong: (
                <Text
                  as="strong"
                  fontSize={{ base: "4xl", md: "5xl", lg: "7xl" }}
                />
              ),
            }}
          />
        </Text>
        <Box
          display={{ md: "flex" }}
          alignSelf={isMobileScreen ? "center" : "left"}
        >
          <Box>
            <ChakraLink href={"https://t.me/globalnetworkweb3"} isExternal>
              <Image
                src={"/assets/icon/telegram-button.png"}
                alt="telegram community"
                width={isMobileScreen ? 250 : 300}
                height={200}
              />
            </ChakraLink>
          </Box>
          <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
            {accountMap?.data?.isRegistered ? null : (
              <ButtonConnectWrapper>
                <Link href="/register">
                  <Button
                    variant={"outline"}
                    fontWeight={"thin"}
                    border={"2px"}
                    borderColor={"white"}
                  >
                    {t("common.register").toUpperCase()}
                  </Button>
                </Link>
              </ButtonConnectWrapper>
            )}
          </Box>
        </Box>
      </Stack>
      <VStack
        pb={"4"}
        textAlign={"center"}
        display={{ lg: "none" }}
        position={"absolute"}
        bottom={"0"}
        right={"0"}
        left={"0"}
      >
        <Text>{t("common.discover")}</Text>
        <Icon textColor={"white"} fontSize={"2xl"}>
          <AiOutlineArrowDown />
        </Icon>
      </VStack>
    </Flex>
  );
};
