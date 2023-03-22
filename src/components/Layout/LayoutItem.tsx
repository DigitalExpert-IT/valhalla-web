import { Box, BoxProps } from "@chakra-ui/react";
import { ReactElement } from "react";

interface LayoutItemProps extends BoxProps {
  children: ReactElement[] | ReactElement;
  withoutContainer?: boolean;
}

export const LayoutItem: React.FC<LayoutItemProps> = props => {
  const { withoutContainer, children, ...rest } = props;
  return <Box {...rest}>{props.children}</Box>;
};
