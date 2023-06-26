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
import { getGnetRate, getUsdtRate } from "utils";
import { SWAP_CONTRACT } from "constant/address";
import { BigNumber } from "ethers";
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
    const { amountTop, currency } = getValues();
    if (!amountTop) return toBn("0");

    const amountTopBn = toBn(amountTop, 9);
    const tax = amountTopBn.mul(5).div(1000);

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
      <Stack as="form" onSubmit={onSubmit} align="center">
        <Stack alignItems="center" mb="5" spacing={"3"}>
          <Stack w={"full"}>
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
        pos="relative"
        mt={{ base: 10, md: 0 }}
        boxShadow="xl"
        borderRadius="2xl"
        px="3"
      >
        <Box mt="8" zIndex={1}>
          <Text as="h3" textAlign="center" mb="3">
            {t("common.balance")}
          </Text>
          <HStack
            backgroundImage="linear-gradient(90deg, #6406c4, #7927cd, #6406c4)"
            px="8"
            py="2"
            my="4"
            boxShadow="lg"
            justifyContent="space-between"
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
              {fromBn(balanceGNET ?? 0, 9)} GNET
            </Text>
          </HStack>
          <HStack
            backgroundImage="linear-gradient(90deg, #6406c4, #7927cd, #6406c4)"
            px="8"
            py="2"
            my="4"
            boxShadow="lg"
            justifyContent="space-between"
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
          </HStack>
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
