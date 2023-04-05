import {
  SimpleGrid,
  Heading,
  Stack,
  GridItem,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useModal } from "@ebay/nice-modal-react";
import { User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  CardProfileBalanceV2,
  CardProfileRankV2,
  CardProfileAddress,
  CardProfileBonus,
} from "components/Card";
import { ModalBindTelegram } from "components/Modal";
import { WidgetProfileMember } from "components/Widget/WidgetProfile";
import { useMe, useValhalla, useWallet } from "hooks";
import { t } from "i18next";
import { getWallet } from "lib/contractFactory";
import { useMemo } from "react";
import { getTelegramBindingSignatureMessage } from "utils";

export const SectionProfileV2 = () => {
  const { account } = useValhalla();
  const { address } = useWallet();
  const { data, isLoading } = useMe();
  const user = useMemo<User>(() => {
    const convert = data
      ?.filter(e => e.address === address.toLowerCase())
      .reduce((acc, cv) => ({ ...cv }), {});
    return convert as User;
  }, [data]);

  const bindTelegramModal = useModal(ModalBindTelegram);
  const telegramInvite = useQuery<{ type: string }>({
    queryKey: [`/telegram/invite/${address}`],
    enabled: false,
  });
  const telegramInviteMutate = useMutation({
    mutationFn: async (body: { signature: string; username: string }) => {
      const { data } = await axios.post(
        `/api/telegram/invite/${address}`,
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
      if (!account.isRegistered) {
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
    <Stack maxW="container.xl" mx={{ base: "4", lg: "auto" }}>
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        _after={{
          content: `'${t("pages.profile.account")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { xl: "250", lg: "180", md: "130", xs: "75", base: "56" },
          mt: { xl: "-36", lg: "-32", md: "-28", xs: "-70px", base: "-55px" },
          color: "whiteAlpha.100",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {t("pages.profile.header")}
      </Heading>

      <Flex direction="column" gap="10" p="2">
        <Stack
          w="100%"
          direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
          spacing="10"
        >
          <Box flex="1" minW={{ base: "100%", md: "35%" }}>
            <CardProfileRankV2 />
          </Box>
          <Box w="100%">
            <CardProfileBalanceV2 />
          </Box>
        </Stack>
        <Stack
          w="100%"
          direction={{
            base: "column-reverse",
            md: "column-reverse",
            lg: "row",
            xl: "row",
          }}
          spacing="10"
        >
          <Box flex="1" minW={{ base: "100%", md: "35%" }}>
            <CardProfileAddress />
          </Box>
          <Box w="100%">
            <CardProfileBonus />
          </Box>
        </Stack>
      </Flex>

      <Flex
        py={"6"}
        justify={{ base: "center", xl: "space-between" }}
        wrap={"wrap"}
        gap={{ base: "4", lg: "8" }}
        zIndex={"1"}
      >
        <WidgetProfileMember
          label={"common.networkMembers"}
          value={account.downlineCount.toString()}
        />
        <WidgetProfileMember
          label={"common.directReferrals"}
          value={account.directDownlineCount.toString()}
        />
        <WidgetProfileMember
          label={"common.telegramOnlyMember"}
          value={
            user?.telegramUsername ? `@${user?.telegramUsername}` : "@userName"
          }
          cursor={!user?.telegramUsername ? "pointer" : "default"}
          onClick={user?.telegramUsername ? () => null : createSignature}
          isLoading={isLoading}
        />
      </Flex>
    </Stack>
  );
};
