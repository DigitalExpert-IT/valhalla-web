import { useForm } from "react-hook-form";
import { fromBn } from "evm-bn";
import { useTranslation } from "react-i18next";
import { Box, Button, Stack } from "@chakra-ui/react";
import { ButtonConnectWrapper } from "components/Button";
import { FormInput, FormSelect } from "components/FormUtils";
import { useAsyncCall, useSwap } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { getGnetRate, getUsdtRate } from "utils";

interface ISwapToken {
  price: string;
  amount: string;
  currency: string;
}

export const FormSwap = () => {
  const { t } = useTranslation();
  const [price, setPrice] = useState("");
  const [symbol, setSymbol] = useState(false);
  const { handleSubmit, control, watch } = useForm<ISwapToken>();
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
  });

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
          isDisabled={!initialized}
        />
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
              min={0}
              isDisabled
              value={price}
            />
          </Box>
          <Box>
            <FormSelect
              control={control}
              label={t("form.label.swap")}
              name="currency"
              option={normalizeCurrencies}
              isDisabled={!initialized}
              defaultValue="USDT"
            />
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
