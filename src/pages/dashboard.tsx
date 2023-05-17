import {
  Box,
  FormControl,
  Input,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { CopiableText } from "components";
import { DASHBOARD_CATEGORY } from "constant/pages/dashboard";
import { useWallet } from "hooks";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { shortenAddress } from "utils";

const UserAddress = () => {
  const { address } = useWallet();
  return (
    <Stack spacing="4" direction="row" align="center">
      <Stack
        direction="row"
        spacing="2"
        align="center"
        rounded="full"
        pr="3"
        h="2rem"
        overflow="hidden"
      >
        <Box mt="1">
          <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
        </Box>
        <CopiableText fontFamily="mono" display="block" value={address}>
          {shortenAddress(address)}
        </CopiableText>
      </Stack>
    </Stack>
  );
};

const Dashboard = () => {
  return (
    <Stack direction={"row"} spacing={0} w="full" h="100vh">
      <Stack flex={1}>
        <UnorderedList>
          {DASHBOARD_CATEGORY.map((kategoryItem, ctgrIdx) => (
            <ListItem key={ctgrIdx}>
              <Text>{kategoryItem.name}</Text>
              <UnorderedList>
                {kategoryItem.menus.map((menu, mIdx) => (
                  <ListItem key={mIdx}>{menu.name}</ListItem>
                ))}
              </UnorderedList>
            </ListItem>
          ))}
        </UnorderedList>
      </Stack>
      <Stack direction={"row"} flex={4} bg="gray.100" p="1rem">
        <Box flex={2}>
          <FormControl>
            <Input type="search" bg="white" boxShadow={"md"} />
          </FormControl>
          <Box bg="purple.500" p="10" mt="5" rounded="md">
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem, molestiae rerum. Eos quod quo sint explicabo unde?
              Veritatis, vitae. Suscipit cum aut amet saepe maiores fugit in
              earum doloribus est.
            </Text>
          </Box>
        </Box>
        <Stack flex={1} alignItems="center" color="gray.800">
          <UserAddress />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
