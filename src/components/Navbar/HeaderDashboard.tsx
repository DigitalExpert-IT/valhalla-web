import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import { CopiableText } from "components/CopiableText";
import { DashboardContext as Context } from "components/Layout/context/LayoutDashboardContext";
import { useScreen } from "hooks";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsSearch, BsList } from "react-icons/bs";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { shortenAddress } from "utils";

interface IPropsType {
  address: string;
  isShowSearch?: boolean;
  onSearchChange?: (e: any) => void;
}

interface ISearchComponent {
  isCollapsed: boolean;
  handleCollapse: () => void;
  onSearchChange: (e: any) => void;
}

const SearchComponent = (props: ISearchComponent) => {
  const { isCollapsed, handleCollapse, onSearchChange } = props;
  const { t } = useTranslation();
  const { isMobileScreen } = useScreen();

  const collapseTransition = {
    transitionDuration: "0.8s",
    transitionTimingFunction: "cubic-bezier(0.66, -0.06, 0.25, 1)",
    transitionDelay: "0s",
    transitionProperty: "all",
  };

  if (isMobileScreen)
    return (
      <Box overflow="hidden">
        <HStack justifyContent="end">
          <Button
            px="0"
            variant="unstyle"
            onClick={handleCollapse}
            transform={isCollapsed ? "translateX(50px)" : "translateX(0px)"}
            {...collapseTransition}
          >
            <BsSearch size="20" />
          </Button>
          <Input
            flex={isCollapsed ? "0" : "1"}
            variant="dashboard"
            type="search"
            borderBottom="1px"
            borderRadius="0"
            boxShadow="unset"
            background="dashboard.gray"
            onKeyUp={(e: any) => onSearchChange(e.target.value)}
            placeholder={t("pages.dashboard.placeholder.search") ?? ""}
            transform={isCollapsed ? "translateX(248px)" : "translateX(0px)"}
            {...collapseTransition}
          />
        </HStack>
      </Box>
    );

  return (
    <FormControl flex={1} px="4">
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
  );
};

export const HeaderDashboard = (props: IPropsType) => {
  const { address, isShowSearch, onSearchChange } = props;
  const [isCollapsed, setCollapsed] = useState<boolean>(true);
  const { isMobileScreen } = useScreen();

  const DashboardContext = useContext(Context);
  const { onOpenSidebar } = DashboardContext;

  const handleCollapse = () => {
    setCollapsed(state => !state);
  };

  return (
    <Box
      position="sticky"
      top="0"
      left="0"
      zIndex="10"
      py={{ base: "6", sm: "8" }}
      px="2"
      bgColor="transparent"
      backdropFilter="auto"
      backdropBlur="8px"
      boxShadow={{ base: "sm", sm: "unset" }}
    >
      <HStack
        justifyContent={{ base: "center", sm: "start" }}
        pb={{ base: "0", sm: "8" }}
      >
        {isMobileScreen ? (
          <Link href="/" opacity={isCollapsed ? 1 : 0}>
            <AspectRatio w={179} ratio={6 / 1}>
              <Image src={"/assets/logo/gnLogo.png"} alt="logo-image" />
            </AspectRatio>
          </Link>
        ) : null}

        <HStack
          w="full"
          pos="absolute"
          right="2"
          justifyContent="end"
          mx={{ base: "unset", sm: "-8px" }}
          mt={{ base: "unset", sm: "6" }}
        >
          {isShowSearch && onSearchChange ? (
            <SearchComponent
              onSearchChange={onSearchChange}
              isCollapsed={isCollapsed}
              handleCollapse={handleCollapse}
            />
          ) : null}

          {isMobileScreen ? (
            <Button px="0" variant="unstyle" onClick={onOpenSidebar}>
              <BsList size="28" color="white" />
            </Button>
          ) : (
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
                color="white"
                fontFamily="mono"
                display="block"
                value={address}
              >
                {shortenAddress(address)}
              </CopiableText>
            </Stack>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};
