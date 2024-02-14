import {
  Box,
  Wrap,
  Text,
  HStack,
  Stack,
  Button,
  Input,
  Spinner,
  useNumberInput,
  useToast,
} from "@chakra-ui/react";
import { useContractRead } from "@thirdweb-dev/react";
import { useAsyncCall, useCountdown } from "hooks";
import { useDaoContract } from "hooks/property-dao";
import useDao from "hooks/property-dao/useDao";
import useClickConnectWallet from "hooks/useClickConnectWallet";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { prettyBn } from "utils";

interface ICountdown {
  targetDate: string | number | Date;
  showExpired: JSX.Element;
}

const Countdown: React.FC<ICountdown> = props => {
  const toast = useToast();
  const { targetDate, showExpired } = props;
  const { t } = useTranslation();
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const [id, setId] = useState<any>(0);
  const daoContract = useDaoContract();
  const { data, isLoading: loadingDao } = useContractRead(
    daoContract.contract,
    "getVilla",
    [id]
  );
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: data?.maxLot - data?.sold,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const { buy, isLoading: isLoadingDao } = useDao();
  const totalPrice = input.value * Number(prettyBn(data?.price, 6));

  const { showModalConnectWallet, loading, isAbleToTransaction } =
    useClickConnectWallet();
  const { exec, isLoading } = useAsyncCall(buy, t("common.succesBuyNft"));

  const buyVilla = () => {
    if (!isAbleToTransaction) return showModalConnectWallet();
    exec(id, input.value);
  };

  if (days + hours + minutes + seconds <= 0) {
    return (
      <>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing="1rem"
          pt="1rem"
        >
          <Stack
            direction="row"
            w={{ base: "100%", md: "20%" }}
            bgColor="white"
            border="1px"
            borderColor="black"
            rounded="xl"
            align="center"
            justify="center"
          >
            <Button variant="ghost" size="sm" color="black" {...dec}>
              -
            </Button>

            <Input
              textAlign="center"
              variant="unstyled"
              color="black"
              {...input}
              disabled
            />
            <Button variant="ghost" size="sm" color="black" {...inc}>
              +
            </Button>
          </Stack>
          <Button
            variant="solid"
            bgColor="whiteAlpha.900"
            rounded="lg"
            color="black"
            _hover={{ bg: "whiteAlpha.700" }}
            size="lg"
            w={{ base: "100%", md: "49%" }}
            isLoading={isLoading || isLoadingDao || loading}
            spinner={<Spinner color="#191272" />}
            onClick={buyVilla}
            disabled={data?.sold === data?.maxLot ?? false}
          >
            {data?.sold !== data?.maxLot
              ? `Buy ${totalPrice} USDT`
              : "Sold Out"}
          </Button>
        </Stack>
      </>
    );
  } else {
    return (
      <>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing="1rem"
          pt="1rem"
        >
          <Stack
            direction="row"
            w={{ base: "100%", md: "20%" }}
            bgColor="white"
            border="1px"
            borderColor="black"
            rounded="xl"
            align="center"
            justify="center"
          >
            <Button variant="ghost" size="sm" color="black" {...dec} disabled>
              -
            </Button>

            <Input
              textAlign="center"
              variant="unstyled"
              color="black"
              {...input}
              disabled
            />
            <Button variant="ghost" size="sm" color="black" {...inc} disabled>
              +
            </Button>
          </Stack>
          <Button
            variant="solid"
            bgColor="whiteAlpha.900"
            rounded="lg"
            color="black"
            _hover={{ bg: "whiteAlpha.700" }}
            size="lg"
            w={{ base: "100%", md: "49%" }}
            isLoading={isLoading || isLoadingDao || loading}
            spinner={<Spinner color="#191272" />}
            onClick={buyVilla}
            disabled={data?.sold === data?.maxLot ?? false}
          >
            {data?.sold !== data?.maxLot
              ? `Buy ${totalPrice} USDT`
              : "Sold Out"}
          </Button>
        </Stack>
        <HStack mb={1}>
          <Text fontWeight="bold" fontSize={{ xl: "lg", base: "sm" }}>
            {t("pages.daoBali.deadline")}
          </Text>
          <Text
            fontSize={{ xl: "2xl", base: "sm" }}
            fontWeight="bold"
            color="#FFC2C2"
          >
            {t("pages.daoBali.deadlineDate")}
          </Text>
        </HStack>
        <Box zIndex={3} mb="5rem">
          <Wrap spacing={"1rem"}>
            <Box
              mx={"1rem"}
              backgroundColor={"#34177B"}
              boxShadow={"0px 0px 7px rgb(145 83 246 / 60%)"}
              borderRadius={"lg"}
              maxH={"6rem"}
            >
              <Box
                display={"flex"}
                mt={1}
                justifyContent={"center"}
                w={"8rem"}
                fontWeight={"bold"}
                fontSize={"4xl"}
              >
                {leadingZero(days)}
              </Box>
              <Box textAlign={"center"}>DAYS</Box>
            </Box>
            <Text fontSize={"2xl"} fontWeight={"bold"} pt={"1.5rem"}>
              :
            </Text>
            <Box
              mx={"1rem"}
              backgroundColor={"#34177B"}
              boxShadow={"0px 0px 7px rgb(145 83 246 / 60%)"}
              borderRadius={"lg"}
              maxH={"6rem"}
            >
              <Box
                display={"flex"}
                mt={1}
                justifyContent={"center"}
                w={"8rem"}
                fontWeight={"bold"}
                fontSize={"4xl"}
              >
                {leadingZero(hours)}
              </Box>
              <Box textAlign={"center"}>HOURS</Box>
            </Box>
            <Text fontSize={"2xl"} fontWeight={"bold"} pt={"1.5rem"}>
              :
            </Text>
            <Box
              mx={"1rem"}
              backgroundColor={"#34177B"}
              boxShadow={"0px 0px 7px rgb(145 83 246 / 60%)"}
              borderRadius={"lg"}
              maxH={"6rem"}
            >
              <Box
                display={"flex"}
                mt={1}
                justifyContent={"center"}
                w={"8rem"}
                fontWeight={"bold"}
                fontSize={"4xl"}
              >
                {leadingZero(minutes)}
              </Box>
              <Box textAlign={"center"}>MINUTES</Box>
            </Box>
            <Text fontSize={"2xl"} fontWeight={"bold"} pt={"1.5rem"}>
              :
            </Text>
            <Box
              mx={"1rem"}
              backgroundColor={"#34177B"}
              boxShadow={"0px 0px 7px rgb(145 83 246 / 60%)"}
              borderRadius={"lg"}
              maxH={"6rem"}
            >
              <Box
                display={"flex"}
                mt={1}
                justifyContent={"center"}
                w={"8rem"}
                fontWeight={"bold"}
                fontSize={"4xl"}
              >
                {leadingZero(seconds)}
              </Box>
              <Box textAlign={"center"} mb={"1rem"}>
                SECONDS
              </Box>
            </Box>
          </Wrap>
        </Box>
      </>
    );
  }
};

const leadingZero = (number: number) => {
  if (number >= 100) {
    return number;
  } else {
    return ("0" + number).slice(-2);
  }
};

interface LoaderSuspenseProps {
  component: React.ReactElement;
  data: any;
}

const LoaderSuspense = (props: LoaderSuspenseProps) => {
  const { component, data } = props;
  return data ? component : <Spinner />;
};

export default Countdown;
