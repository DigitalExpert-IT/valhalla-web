import {
  Box,
  Text,
  Icon,
  Stack,
  Button,
  SimpleGrid,
  AspectRatio,
} from "@chakra-ui/react";
import { fromBn, toBn } from "evm-bn";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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

interface ISwapToken {
  price: string;
  amount: string;
  currency: string;
}

const addressSwap = SWAP_CONTRACT[CURRENT_CHAIN_ID];

export const FormSwap = () => {
  const { t } = useTranslation();
  const [price, setPrice] = useState("");
  const [symbol, setSymbol] = useState(false);
  const { handleSubmit, control, watch, reset } = useForm<ISwapToken>();

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
    const poolBalance: BigNumber = await swap.contract?.call("getGnetRate", [
      value,
    ]);

    if (balanceGNET.lt(value)) {
      throw {
        code: "NotEnoughBalance",
      };
    }

    if (poolBalance.lt(value)) {
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

    const poolBalance: BigNumber = await swap.contract?.call("getUsdtRate", [
      value,
    ]);

    if (balanceUSDT.lt(value)) {
      throw {
        code: "NotEnoughBalance",
      };
    }

    if (poolBalance.lt(value)) {
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
    const subscription = watch(value => {
      if (value.currency === "GNET") {
        const format = fromBn(getUsdtRate(value.price ? value.price : "0"), 9);
        setPrice(format);
        setSymbol(true);
        return;
      }
      const format = fromBn(getGnetRate(value.price ? value.price : "0"), 6);
      setPrice(format);
      setSymbol(false);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = handleSubmit(async data => {
    const swap = await exec({
      currency: data.currency,
      amount: data.price,
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
                name="price"
                placeholder={"0.0"}
                type="number"
                isDisabled={swap.isLoading}
              />
            </Box>
            <Text
              as={"span"}
              fontSize={"sm"}
              textAlign={"center"}
              color={"whiteAlpha.700"}
            >
              {t("form.helperText.balance", {
                balanceOf: symbol
                  ? fromBn(balanceUSDT ?? 0, 6)
                  : fromBn(balanceGNET ?? 0, 9),
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
              <Text fontWeight={"bold"}>{t("form.label.swap")}</Text>
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
                name="price"
                placeholder={"0.0"}
                type="number"
                isDisabled
                value={price}
              />
            </Box>
            <Text
              as={"span"}
              fontSize={"sm"}
              color={"whiteAlpha.700"}
              textAlign={"center"}
            >
              {t("form.helperText.balance", {
                balanceOf: symbol
                  ? fromBn(balanceGNET ?? 0, 9)
                  : fromBn(balanceUSDT ?? 0, 6),
                symbol: symbol ? "GNET" : "USDT",
              })}
            </Text>
          </Stack>
          <ButtonConnectWrapper>
            <Button
              type="submit"
              // w={{ base: "70%", md: "100%" }}
              w="100%"
              isLoading={isSwapLoading}
              loadingText={t("common.isConnectingToBlockChain")!}
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
      <Stack justifyContent={"center"} mt={{ base: 10, md: 0 }}>
        <AspectRatio ratio={1} ml="-5rem" mt="-4rem">
          <ClipPathImage />
        </AspectRatio>
      </Stack>
    </SimpleGrid>
  );
};
