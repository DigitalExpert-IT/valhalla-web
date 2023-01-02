import { Badge, Button, FormControl, Select, Stack } from "@chakra-ui/react";
import { FormInput, FormSelect } from "components/FormUtils";
import { fromBn } from "evm-bn";
import { useSwap } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { validateRequired } from "utils";

interface ISwapToken {
  quantity: number;
  tokenSelect: string;
}

export const FormSwap = () => {
  const { currency, swapToken } = useSwap();
  const { handleSubmit, control } = useForm<ISwapToken>();
  const { t } = useTranslation();
  const [price, setPrice] = useState(0);
  const [selectCurrency, setSelecCurrency] = useState<string | undefined>();

  const onSubmit = handleSubmit(data => {
    console.log(data.tokenSelect);
  });

  const normalizeCurrencies = useMemo(() => {
    return Object.values(currency).map(c => {
      const USDTPair = c.pair.name === "USDT";
      return {
        ...c,
        value: c.pair.name,
        label: USDTPair ? "GNET / USDT" : "USDT / GNET",
      };
    });
  }, [currency]);

  useEffect(() => {}, []);
  return (
    <Stack as="form" onSubmit={onSubmit}>
      <Stack direction={"row"} alignItems="center">
        <FormSelect
          control={control}
          name="tokenSelect"
          placeholder={t("form.placeholder.selectCurrency")}
          onChange={e => setSelecCurrency(e.target.value)}
          option={normalizeCurrencies}
        ></FormSelect>
        <FormInput
          control={control}
          name="quantity"
          rules={{
            required: validateRequired(t("form.label.swap")),
            minLength: 1,
          }}
          placeholder={t("form.placeholder.quantity")}
        ></FormInput>
        {selectCurrency && (
          <Badge>
            {price} {selectCurrency}
          </Badge>
        )}
      </Stack>
      <Button type="submit">{t("common.swap")}</Button>
    </Stack>
  );
};
