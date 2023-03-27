import {
  Box,
  Stack,
  Button,
  BoxProps,
  StackProps,
  ButtonProps,
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
  const buttonTemplate = {
    bg: "#8E59FF",
    rounded: "none",
    borderBottom: "1px solid",
    borderBottomColor: "blackAlpha.500",
    _active: {
      bg: "#311769",
      opacity: 1,
      _hover: {
        bg: "#311769",
      },
    },
    _hover: {
      bg: "#421f8d",
    },
    color: "white",
    opacity: 1,
  };

  return (
    <Button
      isActive={active === activeId}
      isDisabled={active === activeId}
      onClick={() => setActive(activeId)}
      {...buttonTemplate}
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
  const { whenActive, ...rest } = props;
  const [active] = useContext(TabClubContext);

  return (
    <Box {...rest}>{active === props.whenActive ? props.children : null}</Box>
  );
};
