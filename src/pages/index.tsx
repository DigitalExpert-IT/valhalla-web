import { Container, Button, Box, Heading } from "@chakra-ui/react";
import { ConnectWalletButton } from "components";
import { WorldRankBonusList } from "components/landingPage/WorldRankBonusList";
import { useValhalla, useAsyncCall } from "hooks";

export default function Home() {
  const { register } = useValhalla();
  const registerFn = useAsyncCall(register);

  const handleRegistration = () => {
    registerFn.exec("0x0");
  };

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
          WORLD RANK GNT BONUS
        </Heading>
        <WorldRankBonusList />
      </Box>
    </Container>
  );
}
