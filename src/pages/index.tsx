import { Heading } from "@chakra-ui/react";
import { Main } from "components";
import { useValhalla, useAsyncCall } from "hooks";

export default function Home() {
  const { register } = useValhalla();
  const registerFn = useAsyncCall(register);

  const handleRegistration = () => {
    registerFn.exec("0x0");
  };

  return (
    <Main>
      <Heading>Hello</Heading>
    </Main>
  );
}
