import { Container, Button } from "@chakra-ui/react";
import { ConnectWalletButton } from "components";
import { useValhalla, useAsyncCall } from "hooks";

export default function Home() {
  const { register } = useValhalla();
  const registerFn = useAsyncCall(register);

  const handleRegistration = () => {
    registerFn.exec("0x0");
  };

  return (
    <Container>
      <ConnectWalletButton />
      <Button onClick={handleRegistration}>Register</Button>
    </Container>
  );
}
