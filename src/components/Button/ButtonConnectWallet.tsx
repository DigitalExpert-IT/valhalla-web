import { Button, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useAccountMap } from "hooks/valhalla";

type Props = {
  direction?: "row" | "column";
};

export const ButtonConnectWallet = (props: Props) => {
  const router = useRouter();
  const accountMap = useAccountMap();
  const { t } = useTranslation();

  const handleNavigate = () => {
    router.push("/register");
  };

  return (
    <Stack spacing="4" direction={props.direction ?? "row"} align="center">
      {accountMap.data?.isRegistered ? null : (
        <Button
          isLoading={accountMap.isLoading && !accountMap.isFetched}
          px="6"
          onClick={handleNavigate}
          variant={"gradient"}
          colorScheme={"purple.300:purple"}
          fontWeight={"thin"}
        >
          {t("common.register")}
        </Button>
      )}
      <ConnectWallet theme="dark" className="button-connect-wallet" />
    </Stack>
  );
};
