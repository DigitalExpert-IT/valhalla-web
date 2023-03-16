import axios from "axios";
import Link from "next/link";
import {
  Heading,
  Text,
  Box,
  HStack,
  Button,
  useMediaQuery,
  Flex,
  Center,
  Image,
  Stack,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";
import { useModal } from "@ebay/nice-modal-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useValhalla, useWallet } from "hooks";
import { WidgetMainHeader, ModalBindTelegram } from "components";
import { HEADER_IMAGE_DATA } from "constant/pages/home";
import { getWallet } from "lib/contractFactory";
import { getTelegramBindingSignatureMessage, shortenAddress } from "utils";
import { GNET_CONTRACT } from "constant/address";
import { AiOutlineArrowDown } from "react-icons/ai";
import { IoCopyOutline } from "react-icons/io5";
import { CopiableText } from "components/CopiableText";
import { IconBase } from "react-icons";

const ContractGnet = GNET_CONTRACT[process.env.NEXT_PUBLIC_CHAIN_ID as "0x29a"];

export const SectionHeader = () => {
  const { t } = useTranslation();
  const [widthMob] = useMediaQuery("(max-width: 500px)");
  const valhalla = useValhalla();
  const wallet = useWallet();
  const bindTelegramModal = useModal(ModalBindTelegram);
  const telegramInvite = useQuery<{ type: string }>({
    queryKey: [`/telegram/invite/${wallet.address}`],
    enabled: false,
  });
  const telegramInviteMutate = useMutation({
    mutationFn: async (body: { signature: string; username: string }) => {
      const { data } = await axios.post(
        `/api/telegram/invite/${wallet.address}`,
        body
      );
      return data;
    },
  });

  const createSignature = async () => {
    try {
      const linkToTelegram = document.createElement("a");
      linkToTelegram.href = process.env.NEXT_PUBLIC_TELEGRAM_INVITE_LINK || "";
      linkToTelegram.target = "_blank";
      const { data } = await telegramInvite.refetch();
      if (!data) return;
      if (!valhalla.account.isRegistered) {
        linkToTelegram.click();
        return;
      }

      if (data.type === "redirect") {
        linkToTelegram.click();
        return;
      }

      if (data.type === "request_bind") {
        const username = (await bindTelegramModal.show()) as string;
        const wallet = await getWallet();
        const signer = wallet.getSigner();
        const signature = await signer.signMessage(
          getTelegramBindingSignatureMessage(username)
        );
        await telegramInviteMutate.mutateAsync({ signature, username });
        window.open(process.env.NEXT_PUBLIC_TELEGRAM_INVITE_LINK, "_blank");
      }
    } catch (error) {
      window.open(process.env.NEXT_PUBLIC_TELEGRAM_INVITE_LINK, "_blank");
    }
  };

  return (
    <Box h={{ base: "100vh", lg: "fit-content" }}>
      <Flex w={"full"}>
        <Image
          position={"absolute"}
          top="0"
          left="0"
          right="0"
          zIndex={"hide"}
          objectFit="cover"
          w="full"
          h={{
            base: "100vh",
            lg: "45rem",
            "2xl": "43rem",
          }}
          src={"/images/bgHeader_home.png"}
          alt={"/images/bgHeader_home.png"}
        />
        <Box
          minW={"50%"}
          display={{
            base: "none",
            lg: "block",
          }}
        >
          <Center h={"full"} bg={"blackAlpha.300"}>
            <Text>BACKGROUND VIDEO</Text>
          </Center>
        </Box>
        <Box
          mt={{ base: "30vh", md: "20vh", lg: "0" }}
          px={{ base: "4", lg: "16" }}
          pt={{ base: "0", lg: "16" }}
          mx={{ base: "auto", lg: "0" }}
          ml={{ lg: "auto" }}
        >
          <Stack maxW={"sm"} textAlign={{ base: "center", lg: "left" }}>
            <Heading
              as="h1"
              mt="4"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              bgGradient="linear(to-r, brand.500, brand.100, white)"
              bgClip="text"
            >
              <Trans i18nKey="pages.home.header.title" />
            </Heading>
            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              noOfLines={2}
            >
              <Trans
                i18nKey="pages.home.header.subtitle"
                components={{
                  strong: (
                    <Text
                      as="strong"
                      fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                    />
                  ),
                }}
              />
            </Text>
          </Stack>
          <HStack
            justify={{ base: "center", lg: "start" }}
            mt="6"
            spacing={{ base: "2", sm: "4" }}
          >
            {valhalla.account.isRegistered ? null : (
              <Link href="/register">
                <Button colorScheme="white" variant={"outline"}>
                  {t("common.register")}
                </Button>
              </Link>
            )}
          </HStack>
        </Box>
      </Flex>
      <VStack
        pb={"4"}
        textAlign={"center"}
        display={{ lg: "none" }}
        mt={"25vh"}
      >
        <Text>Discrol</Text>
        <Icon textColor={"white"} fontSize={"2xl"}>
          <AiOutlineArrowDown />
        </Icon>
      </VStack>
    </Box>
  );
};
