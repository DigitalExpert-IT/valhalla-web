import { fromBn } from "evm-bn";
import { useForm } from "react-hook-form";
import { useAsyncCall, useSwap } from "hooks";
import { useTranslation } from "react-i18next";
import { getGnetRate, getUsdtRate } from "utils";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ButtonConnectWrapper } from "components/Button";
import { FormInput, FormSelect } from "components/FormUtils";
import { AiOutlineArrowRight } from "react-icons/ai";

interface ISwapToken {
  price: string;
  amount: string;
  currency: string;
}

export const FormSwapV2 = () => {
  const { t } = useTranslation();
  const [price, setPrice] = useState("");
  const [symbol, setSymbol] = useState(false);
  const { handleSubmit, control, watch, reset } = useForm<ISwapToken>();
  const { currency, swapCurrency, initialized } = useSwap();

  const { exec, isLoading: isSwapLoading } = useAsyncCall(
    swapCurrency,
    t("form.message.swapSucces")
  );

  const normalizeCurrencies = useMemo(() => {
    return Object.values(currency).map(c => {
      const USDTPair = c.pair.name === "USDT";
      return {
        ...c,
        value: c.pair.name,
        label: USDTPair ? "USDT" : "GNET",
      };
    });
  }, [currency]);

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
  }, [watch, currency]);

  const onSubmit = handleSubmit(async data => {
    await exec({
      currency: data.currency,
      amount: data.price,
    });
    reset();
  });

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gap={{ base: "8", md: "20" }}
      pos={"relative"}
    >
      <Stack as="form" onSubmit={onSubmit}>
        <Stack alignItems="center" mb="5">
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
                isDisabled={!initialized}
              />
            </Box>
            <Text
              as={"span"}
              fontSize={"sm"}
              textAlign={"center"}
              color={"whiteAlpha.500"}
            >
              {t("form.helperText.balance", {
                balanceOf: symbol
                  ? fromBn(currency.usdt.balance, 6)
                  : fromBn(currency.gnet.balance, 9),
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
                option={normalizeCurrencies}
                isDisabled={!initialized}
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
              color={"whiteAlpha.500"}
              textAlign={"center"}
            >
              {t("form.helperText.balance", {
                balanceOf: symbol
                  ? fromBn(currency.gnet.balance, 9)
                  : fromBn(currency.usdt.balance, 6),
                symbol: symbol ? "GNET" : "USDT",
              })}
            </Text>
          </Stack>
        </Stack>
        <ButtonConnectWrapper>
          <Button
            type="submit"
            isLoading={isSwapLoading || !initialized}
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
      <Stack justifyContent={"center"}>
        <Image src="/assets/SwapImage.png" alt="Image Swap" w={"full"} />
      </Stack>
    </SimpleGrid>
  );
};
