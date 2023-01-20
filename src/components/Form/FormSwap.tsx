import { useForm } from "react-hook-form";
import { fromBn, toBn } from "evm-bn";
import { useTranslation } from "react-i18next";
import { Box, Button, Stack } from "@chakra-ui/react";
import { ButtonConnectWrapper } from "components/Button";
import { FormInput, FormSelect } from "components/FormUtils";
import { useAsyncCall, useSwap } from "hooks";
import { getGnetPrice, getUsdtPrice } from "utils";
import { useEffect, useMemo, useState } from "react";

interface ISwapToken {
  price?: number;
  amount: string;
  currency: string;
}

export const FormSwap = () => {
  const { t } = useTranslation();
  const [price, setPrice] = useState("");
  const [symbol, setSymbol] = useState(false);
  const { currency, swapCurrency, initialized } = useSwap();
  const { handleSubmit, control, watch } = useForm<ISwapToken>();

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

  const onSubmit = handleSubmit(async data => {
    await exec(data);
  });

  useEffect(() => {
    const subscription = watch(value => {
      if (value.currency === "USDT") {
        const toBigNumb = toBn(value.amount ? value.amount : "0");
        const format = fromBn(getGnetPrice(toBigNumb), 9);
        setPrice(format);
        setSymbol(false);
        return;
      }

      const toBigNumb = toBn(value.amount ? value.amount : "0", 9);
      const format = fromBn(getUsdtPrice(toBigNumb));
      setPrice(format);
      setSymbol(true);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Stack as="form" onSubmit={onSubmit}>
      <Stack alignItems="center" mb="5">
        <FormInput
          control={control}
          label={t("form.label.from")}
          name="price"
          helpertext={t("form.helperText.balance", {
            balanceOf: symbol
              ? fromBn(currency.usdt.balance)
              : fromBn(currency.gnet.balance, 9),
            symbol: symbol ? "USDT" : "GNET",
          })}
          placeholder={"0.0"}
          type="number"
          isDisabled
          value={price ?? undefined}
        ></FormInput>
        <Stack
          direction={{ md: "row", sm: "column", base: "column" }}
          w={"full"}
        >
          <Box flex={1}>
            <FormInput
              control={control}
              label={t("form.label.to")}
              name="amount"
              helpertext={t("form.helperText.balance", {
                balanceOf: symbol
                  ? fromBn(currency.gnet.balance, 9)
                  : fromBn(currency.usdt.balance),
                symbol: symbol ? "GNET" : "USDT",
              })}
              placeholder={"0.0"}
              type="number"
            ></FormInput>
          </Box>
          <Box>
            <FormSelect
              control={control}
              label={t("form.label.swap")}
              name="currency"
              defaultValue={"USDT"}
              option={normalizeCurrencies}
              isDisabled={!initialized}
            ></FormSelect>
          </Box>
        </Stack>
      </Stack>
      <ButtonConnectWrapper>
        <Button type="submit" isLoading={isSwapLoading || !initialized}>
          {t("common.swap")}
        </Button>
      </ButtonConnectWrapper>
    </Stack>
  );
};
