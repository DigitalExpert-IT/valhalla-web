import React from "react"
import Jazzicon, { jsNumberForAddress } from "react-jazzicon"
import { shortenAddress } from "utils"
import { useWallet, useValhalla, useAsyncCall } from "hooks"
import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Text,
  BoxProps,
  ButtonProps,
  Stack,
} from "@chakra-ui/react"
import { CopiableText } from "components/CopiableText"

interface IConnectButton extends BoxProps {
  buttonprops?: ButtonProps
}

export const ConnectButton: React.FC<IConnectButton> = props => {
  const { t } = useTranslation()
  const { register } = useValhalla()
  const registerFn = useAsyncCall(register)
  const { isConnected, address, connect } = useWallet()

  const handleRegistration = () => {
    registerFn.exec("0x0")
  }

  if (isConnected) {
    return (
      <Button variant="connectWallet">
        <Box mr="2">
          <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
        </Box>
        <CopiableText display="block" value={address}>
          {shortenAddress(address)}
        </CopiableText>
      </Button>
    )
  }
  return (
    <Stack direction="row">
      <Box {...props}>
        <Button
          variant="Vregister"
          w="100%"
          onClick={handleRegistration}
          {...props.buttonprops}
        >
          <Text fontSize="sm">{t("wallet.register")}</Text>
        </Button>
      </Box>
      <Box {...props}>
        <Button
          variant="connectWallet"
          w="100%"
          onClick={connect}
          {...props.buttonprops}
        >
          <Text fontSize="sm">{t("wallet.connect")}</Text>
        </Button>
      </Box>
    </Stack>
  )
}
