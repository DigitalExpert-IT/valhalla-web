import {
  Box,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { CopiableText } from "components/CopiableText";
import { useTranslation } from "react-i18next";
import { BsSearch } from "react-icons/bs";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { shortenAddress } from "utils";

interface PropsType {
  address: string;
}

export const HeaderDashboard = (props: PropsType) => {
  const { address } = props;
  const { t } = useTranslation();

  return (
    <HStack
      position="sticky"
      top="0"
      left="0"
      zIndex="10"
      py="8"
      bgColor="#f6f7ff"
    >
      <FormControl flex={4} px="4">
        <InputGroup>
          <InputLeftElement pointerEvents="none" top="3px">
            <BsSearch size="20" color="#000" />
          </InputLeftElement>
          <Input
            variant="dashboard"
            type="search"
            placeholder={t("pages.dashboard.placeholder.search") ?? ""}
          />
        </InputGroup>
      </FormControl>
      <Stack
        direction="row"
        maxW="453px"
        minW="453px"
        spacing="2"
        align="center"
        justifyContent="center"
        rounded="full"
        pr="3"
        h="2rem"
        overflow="hidden"
        flex={1}
      >
        <Box mt="1">
          <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
        </Box>
        <CopiableText
          color="black"
          fontFamily="mono"
          display="block"
          value={address}
        >
          {shortenAddress(address)}
        </CopiableText>
      </Stack>
    </HStack>
  );
};
