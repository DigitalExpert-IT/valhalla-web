import { ButtonProps } from "@chakra-ui/react";
import { ConnectWallet, useWallet } from "@thirdweb-dev/react";

type Props = ButtonProps & {
  children?: React.ReactElement;
};

export const ButtonConnectWrapper = (props: Props) => {
  const wallet = useWallet();

  if (wallet) return props.children ?? null;

  return <ConnectWallet theme="dark" />;
};
