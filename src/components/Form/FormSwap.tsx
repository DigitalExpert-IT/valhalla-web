import {
  Box,
  Text,
  Icon,
  Stack,
  Button,
  SimpleGrid,
  AspectRatio,
  Image,
  HStack,
} from "@chakra-ui/react";
import { fromBn, toBn } from "evm-bn";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClipPathImage } from "./ClipPathImage";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { FormInput, FormSelect } from "components/FormUtils";
import { ButtonConnectWrapper } from "components/Button";
import { getGnetRate, getUsdtRate, prettyBn, shortenAddress } from "utils";
import { GNET_CONTRACT, SWAP_CONTRACT, USDT_CONTRACT } from "constant/address";
import { BigNumber } from "ethers";
import { IoCopyOutline } from "react-icons/io5";
import {
  useSwapContract,
  CURRENT_CHAIN_ID,
  useUSDTBalance,
  useGNETBalance,
  useUSDTContract,
  useAsyncCall,
  useGNETContract,
} from "hooks";
import _ from "lodash";
import { CopiableText } from "components/CopiableText";

interface ISwapToken {
  amountTop: string;
  amountBottom: string;
  currency: string;
}

interface IFieldCurrency {
  [key: string]: string;
}

export const FormSwap = () => {
  const addressSwap = SWAP_CONTRACT[CURRENT_CHAIN_ID];
  const addressGnet = GNET_CONTRACT[CURRENT_CHAIN_ID];
  const addressUsdt = USDT_CONTRACT[CURRENT_CHAIN_ID];
  const { t } = useTranslation();
  const [symbol, setSymbol] = useState(false);
  const {
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    reset,
    resetField,
  } = useForm<ISwapToken>();
  const watchCurrency = watch("currency");
  const watchAmountTop = watch("amountTop");

  const swap = useSwapContract();
  const gnet = useGNETContract();
  const usdt = useUSDTContract();
  const address = useAddress();

  const swapToUSDT = useContractWrite(swap.contract, "swapGnet");
  const approveUSDT = useContractWrite(usdt.contract, "approve");

  const swapToGNET = useContractWrite(swap.contract, "swapUsdt");
  const approveGNET = useContractWrite(gnet.contract, "approve");

  const { data: balanceGNET } = useGNETBalance();
  const { data: balanceUSDT } = useUSDTBalance();

  const approveGNETMutate = async (value: BigNumber) => {
    const allowance: BigNumber = await gnet.contract?.call("allowance", [
      address,
      addressSwap,
    ]);

    // getGnetRate to check how much USDT exchange with GNET
    const getRatio: BigNumber = await swap.contract?.call("getGnetRate", [
      value,
    ]);
    const poolBalance = await usdt.contract?.call("balanceOf", [addressSwap]);

    if (balanceGNET.lt(value)) {
      throw {
        code: "NotEnoughBalance",
      };
    }

    if (poolBalance.lt(getRatio)) {
      throw {
        code: "NotEnoughPool",
      };
    }

    if (allowance.lt(value)) {
      const approve = await approveGNET.mutateAsync({
        args: [addressSwap, value],
      });
      return approve.receipt;
    }
  };

  const approveUSDTMutate = async (value: BigNumber) => {
    const allowance: BigNumber = await usdt.contract?.call("allowance", [
      address,
      addressSwap,
    ]);
    // getUsdtRate to check how much gnet exchange with USDT
    const getRatio: BigNumber = await swap.contract?.call("getUsdtRate", [
      value,
    ]);
    const poolBalance = await gnet.contract?.call("balanceOf", [addressSwap]);

    if (balanceUSDT.lt(value)) {
      throw {
        code: "NotEnoughBalance",
      };
    }

    if (poolBalance.lt(getRatio)) {
      throw {
        code: "NotEnoughPool",
      };
    }

    if (allowance.lt(value)) {
      const approve = await approveUSDT.mutateAsync({
        args: [addressSwap, value],
      });
      return approve.receipt;
    }
  };

  const swapCurrency = async (data: { currency: string; amount: string }) => {
    const swapToGnet = data.currency === "GNET";

    if (swapToGnet) {
      const USDValue = toBn(data.amount, 6);
      await approveUSDTMutate(USDValue);

      const swap = await swapToGNET.mutateAsync({
        args: [USDValue],
      });
      const receipt = swap.receipt;
      return receipt;
    }
    // default swap to USDT
    const GNETValue = toBn(data.amount, 9);
    await approveGNETMutate(GNETValue);
    const swap = await swapToUSDT.mutateAsync({
      args: [GNETValue],
    });
    const receipt = swap.receipt;
    return receipt;
  };

  const { exec, isLoading: isSwapLoading } = useAsyncCall(
    swapCurrency,
    t("form.message.swapSucces")
  );

  const getTax = (val: BigNumber) => {
    const feePercentage = 500;
    // This percentage is to provide a swap tolerance range,
    // in order to avoid a lack of result from swaps
    const tolerancePercentage = 2;

    if (!val) return toBn("0");

    // tolerance 502 === 0.00502 or 0.502%
    // check div 1e5 shouldbe 509 / 1e5
    return val.mul(feePercentage + tolerancePercentage).div(1e5);
  };

  const inputMax = () => {
    const { currency } = getValues();
    let result;

    if (currency === "GNET") {
      if (!balanceUSDT || balanceUSDT.isZero())
        return setValue("amountTop", "0");

      const tax = getTax(balanceUSDT);
      result = balanceUSDT.sub(tax);
    } else {
      if (!balanceGNET || balanceGNET.isZero())
        return setValue("amountTop", "0");

      const tax = getTax(balanceGNET);
      result = balanceGNET.sub(tax);
    }

    setValue("amountTop", fromBn(result, currency === "GNET" ? 6 : 9));
    handleChangeInput("amountTop");
  };

  useEffect(() => {
    const currency = watchCurrency;
    if (currency === "GNET") setSymbol(true);
    else setSymbol(false);

    // should reset amountTop and amountBottom
    // after change the currency
    resetField("amountTop");
    resetField("amountBottom");
  }, [watchCurrency]);

  const handleChangeInput = useCallback(
    _.debounce((field: string) => {
      const { amountTop, amountBottom, currency } = getValues();
      const value = field === "amountTop" ? amountTop : amountBottom;

      // define what the top and bottom fields are
      const fieldCurrency: IFieldCurrency = {
        amountTop: currency === "GNET" ? "USDT" : "GNET",
        amountBottom: currency === "GNET" ? "GNET" : "USDT",
      };
      const fieldTarget = field === "amountTop" ? "amountBottom" : "amountTop";
      const currencyTarget = fieldCurrency[fieldTarget];

      let swapResult = "";

      if (currencyTarget === "GNET") {
        swapResult = fromBn(getUsdtRate(value ? value : "0"), 9);
      }
      if (currencyTarget === "USDT") {
        swapResult = fromBn(getGnetRate(value ? value : "0"), 6);
      }

      setValue(fieldTarget, swapResult);
    }, 200),
    []
  );

  const amountAfterFee = useMemo(() => {
    const { amountTop } = getValues();

    if (!amountTop) return toBn("0");

    const amountTopBn = toBn(amountTop, 9);

    const tax = getTax(amountTopBn);

    return amountTopBn.add(tax);
  }, [watchAmountTop]);

  const onSubmit = handleSubmit(async data => {
    const swap = await exec({
      currency: data.currency,
      amount: fromBn(amountAfterFee, 9),
    });

    if (swap.status === 1) {
      reset();
      gnet.refetch();
      usdt.refetch();
    }
  });

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gap={{ base: "8", md: "20" }}
      pos={"relative"}
    >
      <Stack
        as="form"
        onSubmit={onSubmit}
        align="center"
        order={{ base: 2, md: 1 }}
      >
        <Stack alignItems="center" mb="5" spacing={"3"}>
          <Stack w={"full"}>
            <HStack>
              <Box
                position={"relative"}
                border={"1px"}
                borderRadius={"3xl"}
                overflow={"hidden"}
              >
                <Text
                  position={"absolute"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  py={"2"}
                  px={"6"}
                  borderRadius={"3xl"}
                  color={"purple.900"}
                  bg={"white"}
                  zIndex={"3"}
                >
                  {t("form.label.from")}
                </Text>
                <FormInput
                  flex={1}
                  ml={"10"}
                  textAlign="center"
                  textColor={"gray.100"}
                  borderRadius={"3xl"}
                  bg="whiteAlpha.100"
                  _focus={{
                    border: "none",
                    bg: "whiteAlpha.200",
                  }}
                  _hover={{
                    border: "none",
                    bg: "whiteAlpha.300",
                  }}
                  control={control}
                  onKeyUp={() => handleChangeInput("amountTop")}
                  name="amountTop"
                  placeholder={"0.0"}
                  type="number"
                  isDisabled={swap.isLoading}
                />
              </Box>
              <Button
                backgroundColor={"#fff"}
                color={"#6d02c9"}
                _hover={{
                  opacity: 0.6,
                }}
                onClick={inputMax}
              >
                {t("common.max")}
              </Button>
            </HStack>
            <Text
              as={"span"}
              fontSize={"sm"}
              color={"whiteAlpha.700"}
              textAlign={"center"}
            >
              {t("form.helperText.afterFee", {
                value: fromBn(amountAfterFee, 9),
                symbol: symbol ? "USDT" : "GNET",
              })}
            </Text>
          </Stack>
          <Stack py={"2"} w={"full"}>
            <SimpleGrid
              columns={2}
              placeItems={"center"}
              bg={"white"}
              w={"full"}
              rounded={"3xl"}
              overflow={"hidden"}
              textColor={"purple.900"}
              pos={"relative"}
            >
              <Text fontWeight={"bold"} color="black">
                {t("form.label.swap")}
              </Text>
              <Icon pos={"absolute"} zIndex={"3"} fontSize={"xl"}>
                <AiOutlineArrowRight />
              </Icon>
              <FormSelect
                bg={"white"}
                textAlign={"center"}
                control={control}
                _focus={{
                  border: "none",
                  bg: "white",
                }}
                _hover={{
                  border: "none",
                  bg: "whiteAlpha.100",
                }}
                name="currency"
                // option={normalizeCurrencies}
                option={[
                  { value: "USDT", label: "USDT" },
                  { value: "GNET", label: "GNET" },
                ]}
                isDisabled={swap.isLoading}
                defaultValue="USDT"
              />
            </SimpleGrid>
          </Stack>
          <Stack w={"full"} pt={"4"}>
            <Box
              position={"relative"}
              w={"full"}
              border={"1px"}
              borderRadius={"3xl"}
              overflow={"hidden"}
            >
              <Text
                position={"absolute"}
                textAlign={"center"}
                fontWeight={"bold"}
                py={"2"}
                px={"6"}
                borderRadius={"3xl"}
                color={"purple.900"}
                bg={"white"}
                zIndex={"3"}
              >
                {t("form.label.to")}
              </Text>
              <FormInput
                ml={"10"}
                textAlign="center"
                textColor={"gray.100"}
                borderRadius={"3xl"}
                bg="whiteAlpha.100"
                _focus={{
                  border: "none",
                  bg: "whiteAlpha.200",
                }}
                _hover={{
                  border: "none",
                  bg: "whiteAlpha.300",
                }}
                control={control}
                onKeyUp={() => handleChangeInput("amountBottom")}
                name="amountBottom"
                placeholder={"0.0"}
                type="number"
                isDisabled={swap.isLoading}
              />
            </Box>
          </Stack>
          <ButtonConnectWrapper>
            <Button
              type="submit"
              // w={{ base: "70%", md: "100%" }}
              w="100%"
              isLoading={isSwapLoading}
              // loadingText={t("common.isConnectingToBlockChain")!}
              color={"purple.900"}
              bg={"white"}
              _hover={{
                bg: "whiteAlpha.500",
              }}
            >
              {t("common.swap")}
            </Button>
          </ButtonConnectWrapper>
        </Stack>
      </Stack>
      <Box
        display={{ base: "none", md: "block" }}
        pos={"absolute"}
        right={"0"}
        left={"0"}
        my={"8"}
        w={"0.5"}
        h={"64"}
        mx={"auto"}
        borderRight={"1px"}
      />
      <Stack
        height={"fit-content"}
        pos="relative"
        mb={{ base: 10, md: 0 }}
        boxShadow="xl"
        borderRadius="2xl"
        px="3"
        order={{ base: 1, md: 2 }}
      >
        <Box zIndex={1}>
          <Text as="h3" textAlign="center" mb="3">
            {t("common.balance")}
          </Text>
          <Stack
            direction="column"
            backgroundImage="linear-gradient(90deg, #6406c4, #7927cd, #6406c4)"
            my="4"
            boxShadow="lg"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              w="full"
              px="8"
              pt="3"
            >
              <AspectRatio ratio={1} width="24px">
                <Image src="/assets/logo/logo-white.png" alt="logo-image" />
              </AspectRatio>
              <Text
                as={"span"}
                fontSize={"sm"}
                color={"whiteAlpha.700"}
                textAlign={"center"}
              >
                {/* TODO: already delete if this calculation good */}
                {/* {fromBn(balanceGNET ?? 0, 9)} GNET */}
                {prettyBn(balanceGNET, 9)} GNET
              </Text>
            </Stack>
            <HStack
              borderTop="1px"
              borderColor="gray.500"
              textAlign="center"
              p="3"
              justifyContent="space-between"
            >
              <Text fontSize="sm">Import GNET</Text>
              <Box display="flex" alignItems="center">
                <CopiableText
                  value={addressGnet}
                  display="flex"
                  alignItems="center"
                  gap="2"
                >
                  {shortenAddress(addressGnet)}
                  <IoCopyOutline />
                </CopiableText>
              </Box>
            </HStack>
          </Stack>
          <Stack
            direction="column"
            backgroundImage="linear-gradient(90deg, #6406c4, #7927cd, #6406c4)"
            my="4"
            boxShadow="lg"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              w="full"
              px="8"
              pt="3"
            >
              <AspectRatio ratio={1} width="24px">
                <Image
                  src="/assets/logo/tether-logo-white.png"
                  alt="logo-image"
                />
              </AspectRatio>
              <Text
                as={"span"}
                fontSize={"sm"}
                color={"whiteAlpha.700"}
                textAlign={"center"}
              >
                {fromBn(balanceUSDT ?? 0, 6)} USDT
              </Text>
            </Stack>
            <HStack
              borderTop="1px"
              borderColor="gray.500"
              textAlign="center"
              p="3"
              justifyContent="space-between"
            >
              <Text fontSize="sm">Import USDT</Text>
              <Box display="flex" alignItems="center">
                <CopiableText
                  value={addressUsdt}
                  display="flex"
                  alignItems="center"
                  gap="2"
                >
                  {shortenAddress(addressUsdt)}
                  <IoCopyOutline />
                </CopiableText>
              </Box>
            </HStack>
          </Stack>
        </Box>
        <Box pos="absolute" bottom="-20%" right="-10%" width="325px">
          <AspectRatio ratio={1}>
            <ClipPathImage />
          </AspectRatio>
        </Box>
      </Stack>
    </SimpleGrid>
  );
};
