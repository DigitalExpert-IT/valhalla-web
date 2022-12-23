import { Button, ButtonProps } from "@chakra-ui/react";
import { useWallet, useAsyncCall } from "hooks";
import { useTranslation } from "react-i18next";

type Props = ButtonProps & {
  children: React.ReactElement;
};

export const ButtonConnectWrapper = (props: Props) => {
  const { children, ...rest } = props;
  const { isConnected, connect } = useWallet();
  const { t } = useTranslation();
  const connectAsync = useAsyncCall(connect);

  if (isConnected) return props.children;

  return (
    <Button
      {...rest}
      isLoading={connectAsync.isLoading}
      onClick={connectAsync.exec}
    >
      {t("common.connectWallet")}
    </Button>
  );
};
