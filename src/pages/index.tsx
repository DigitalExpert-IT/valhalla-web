import { Container, Button, Box, Heading } from "@chakra-ui/react"
import { ConnectWalletButton } from "components"
import { WorldRankBonusList } from "components/landingPage/WorldRankBonusList"
import { useValhalla, useAsyncCall } from "hooks"
import { useTranslation } from "react-i18next"

export default function Home() {
  const { register } = useValhalla()
  const registerFn = useAsyncCall(register)

  const handleRegistration = () => {
    registerFn.exec("0x0")
  }

  const { t } = useTranslation()

  return (
    <Container maxW={"container.lg"}>
      <ConnectWalletButton />
      <Button onClick={handleRegistration}>Register</Button>
      <Box>
        <Heading
          background={
            "linear-gradient(90.75deg, #09F0EC 11.6%, #45ED61 87.18%)"
          }
          bgClip={"text"}
          textAlign={"center"}
          py={"4rem"}
        >
          {t("common.worldRankBonusGnet")}
        </Heading>
        <WorldRankBonusList />
      </Box>
    </Container>
  )
}
