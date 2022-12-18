import React from "react"
import { Box, Button, Text, BoxProps, ButtonProps } from "@chakra-ui/react"

interface IConnectButton extends BoxProps {
  buttonprops?: ButtonProps
}

export const ConnectButton: React.FC<IConnectButton> = props => {
  return (
    <>
      <Box {...props}>
        <Button variant="Vregister" w="100%" {...props.buttonprops}>
          <Text fontSize="sm">Register</Text>
        </Button>
      </Box>
      <Box {...props}>
        <Button variant="connectWallet" w="100%" {...props.buttonprops}>
          <Text fontSize="sm">Connect Wallet</Text>
        </Button>
      </Box>
    </>
  )
}
