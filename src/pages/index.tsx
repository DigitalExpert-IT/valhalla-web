import { Button } from "@chakra-ui/react"
import { ConnectWalletButton } from "components"
import { Main } from "components/layout"
import { useValhalla, useAsyncCall } from "hooks"

export default function Home() {
  const { register } = useValhalla()
  const registerFn = useAsyncCall(register)

  const handleRegistration = () => {
    registerFn.exec("0x0")
  }

  return (
    <Main>
      <ConnectWalletButton />
      <Button onClick={handleRegistration}>Register</Button>
    </Main>
  )
}
