import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";

const TabClubContext = createContext<any>({});

export const TabClub: React.FC<StackProps> = props => {
  const [active, setActive] = useState(0);
  return (
    <TabClubContext.Provider value={[active, setActive]}>
      <Stack direction={"row"} {...props}>
        {props.children}
      </Stack>
    </TabClubContext.Provider>
  );
};

export const TabClubList: React.FC<StackProps> = props => {
  return <Stack {...props}>{props.children}</Stack>;
};

interface TabClubTriggerProps extends ButtonProps {
  activeId: number;
}

export const TabClubTrigger: React.FC<TabClubTriggerProps> = props => {
  const { activeId, ...res } = props;
  const [active, setActive] = useContext(TabClubContext);

  return (
    <Button
      rounded="none"
      bg={"#8E59FF"}
      isActive={active === activeId}
      isDisabled={active === activeId}
      borderBottom="1px solid"
      borderBottomColor={"blackAlpha.500"}
      _active={{
        bg: "#311769",
        opacity: 1,
        _hover: {
          bg: "#311769",
        },
      }}
      color="white"
      opacity={1}
      onClick={() => setActive(activeId)}
      {...res}
    >
      {props.children}
    </Button>
  );
};

export const TabClubPanelList: React.FC<BoxProps> = props => {
  return <Box {...props}>{props.children}</Box>;
};
interface TabClubPanelItemProps extends BoxProps {
  whenActive: number;
}

export const TabClubPanelItem: React.FC<TabClubPanelItemProps> = props => {
  const [active] = useContext(TabClubContext);

  return (
    <Box {...props}>{active === props.whenActive ? props.children : null}</Box>
  );
};
