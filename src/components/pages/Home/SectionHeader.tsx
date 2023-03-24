import axios from "axios";
import Link from "next/link";
import {
  Heading,
  Text,
  Box,
  HStack,
  Button,
  useMediaQuery,
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
import { IoCopyOutline } from "react-icons/io5";
import { CopiableText } from "components/CopiableText";

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
    <WidgetMainHeader pt={{ base: 0, md: "16" }} imageData={HEADER_IMAGE_DATA}>
      <Box px={{ base: "4", lg: "16" }} py={{ base: "0", lg: "16" }}>
        <Heading textAlign={{ base: "center", lg: "initial" }} as="h1">
          <Trans
            i18nKey="pages.home.header.title"
            components={{
              strong: <Text as="span" color="secondary.500" />,
            }}
          />
        </Heading>
        <Text
          textAlign={{ base: "center", lg: "justify" }}
          mt="4"
          fontSize="lg"
        >
          <Trans i18nKey="pages.home.header.subtitle" />
        </Text>
        <HStack
          direction="row"
          bg="brand.300"
          mt="5"
          p="2"
          rounded="lg"
          opacity="0.7"
          justify="center"
        >
          <Text textTransform="uppercase" fontWeight="bold">
            {t("common.contractGnet")}
          </Text>
          <CopiableText
            display="inline-flex"
            alignItems={"center"}
            gap={2}
            value={ContractGnet}
          >
            {/* {widthMob
              ? shortenAddress(ContractGnet)
              : ContractGnet.toUpperCase()} */}
            <IoCopyOutline />
          </CopiableText>
        </HStack>
        <HStack justify={{ base: "center", lg: "start" }} mt="6" spacing="4">
          {valhalla.account.isRegistered ? null : (
            <Link href="/register">
              <Button colorScheme="brand">{t("common.register")}</Button>
            </Link>
          )}
          <Button
            isLoading={
              telegramInvite.isFetching || telegramInviteMutate.isLoading
            }
            onClick={createSignature}
            colorScheme="brand"
          >
            {t("common.telegram")}
          </Button>
        </HStack>
      </Box>
    </WidgetMainHeader>
  );
};
