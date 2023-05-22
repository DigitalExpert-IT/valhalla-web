import {
  Tr,
  Th,
  Td,
  Box,
  Text,
  Tbody,
  Tfoot,
  Thead,
  Input,
  Stack,
  Table,
  Heading,
  ListItem,
  FormControl,
  TableCaption,
  UnorderedList,
  TableContainer,
} from "@chakra-ui/react";
import { CopiableText, Sidebar } from "components";
import { LayoutDashboard } from "components/Layout/LayoutDashboard";
import { useWallet } from "hooks";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { shortenAddress } from "utils";

const TableUser = () => {
  return (
    <TableContainer>
      <Table variant="simple" color="gray.800">
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

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
    <LayoutDashboard>
      <Stack direction={"row"} flex={4} bg="gray.100" p="8">
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

          <Stack>
            <TableUser></TableUser>
          </Stack>
        </Box>
        <Stack flex={1} alignItems="center" color="gray.800">
          <UserAddress />
          <Stack bg="white" w="full" p="10" h="100vh">
            <Stack bg="gray.100" w="full" p="5" rounded="lg">
              <Heading>Market Progress</Heading>
              <Box bg="gray.400" p="1" rounded="md">
                <Text>Market Progress</Text>
              </Box>
            </Stack>
            <Stack bg="gray.100" w="full" p="5" rounded="lg">
              <Heading>Best Network</Heading>
              <Box bg="gray.400" p="1" rounded="md">
                <Text>Market Progress</Text>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </LayoutDashboard>
  );
};

export default Dashboard;
