import {
  Box,
  BoxProps,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  forwardRef,
} from "@chakra-ui/react";
import { CopiableText } from "components/CopiableText";
import { useTranslation } from "react-i18next";
import { BsSearch } from "react-icons/bs";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { shortenAddress } from "utils";

interface PropsType extends BoxProps {
  address: string;
  isShowSearch?: boolean;
  onSearchChange?: (e: any) => void;
}

const Wrapper = forwardRef<BoxProps, "div">((props, ref) => (
  <Box
    position="sticky"
    top="0"
    left="0"
    zIndex="10"
    py="8"
    px="2"
    bgColor="dashboard.gray"
    ref={ref}
    {...props}
  />
));

export const HeaderDashboard = (props: PropsType) => {
  const { address, isShowSearch, onSearchChange } = props;
  const { t } = useTranslation();

  return (
    <Wrapper {...props}>
      <HStack>
        {isShowSearch && onSearchChange ? (
          <FormControl flex={4} px="4">
            <InputGroup>
              <InputLeftElement pointerEvents="none" top="3px">
                <BsSearch size="20" color="#000" />
              </InputLeftElement>
              <Input
                variant="dashboard"
                type="search"
                onKeyUp={(e: any) => onSearchChange(e.target.value)}
                placeholder={t("pages.dashboard.placeholder.search") ?? ""}
              />
            </InputGroup>
          </FormControl>
        ) : null}
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
    </Wrapper>
  );
};
