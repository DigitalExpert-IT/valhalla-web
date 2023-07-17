import {
  CardProfileBonus,
  CardProfileRankV2,
  CardProfileAddress,
  CardProfileBalanceV2,
} from "components/Card";
import axios from "axios";
import { t } from "i18next";
import { useMemo } from "react";
import { User } from "@prisma/client";
import { getWallet } from "lib/contractFactory";
import { useModal } from "@ebay/nice-modal-react";
import { ModalBindTelegram } from "components/Modal";
import { useMe } from "hooks";
import { getTelegramBindingSignatureMessage } from "utils";
import { Heading, Stack, Flex, Box } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { WidgetProfileMember } from "components/Widget/WidgetProfile";
import { useAddress } from "@thirdweb-dev/react";
import { useAccountMap } from "hooks/valhalla";
import { useSummary } from "hooks/user";
import { ZERO_ADDRESS } from "constant/address";

export const SectionProfileV2 = () => {
  const address = useAddress() ?? ZERO_ADDRESS;
  const {
    data: summaryData,
    isLoading: summaryLoading,
    error,
  } = useSummary(address);
  const accountMap = useAccountMap();
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
      if (!accountMap.data?.isRegistered) {
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
          display: "block",
          textAlign: "center",
          alignSelf: "center",
          color: "whiteAlpha.100",
          textTransform: "uppercase",
          content: `'${t("pages.profile.account")}'`,
          mt: { xl: "-36", lg: "-32", md: "-28", xs: "-70px", base: "-55px" },
          fontSize: { xl: "250", lg: "180", md: "130", xs: "75", base: "56" },
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
        gap={{ base: "2", lg: "8" }}
        zIndex={"1"}
      >
        <WidgetProfileMember
          label={"common.networkMembers"}
          value={accountMap.data?.downlineCount.toString() ?? "0"}
        />
        <WidgetProfileMember
          label={"common.directReferrals"}
          value={accountMap.data?.directDownlineCount.toString() ?? "0"}
        />
        <WidgetProfileMember
          label={"common.totalPotentialProfit"}
          isLoading={summaryLoading}
          value={`${summaryData?.totalPotentialProfit ?? 0} GNET`}
        />
        <WidgetProfileMember
          isLoading={
            isLoading ||
            telegramInvite.isFetching ||
            telegramInviteMutate.isLoading
          }
          label={"common.telegramOnlyMember"}
          cursor={!user?.telegramUsername ? "pointer" : "default"}
          value={
            user?.telegramUsername ? `@${user?.telegramUsername}` : "@username"
          }
          onClick={user?.telegramUsername ? () => null : createSignature}
        />
      </Flex>
    </Stack>
  );
};
