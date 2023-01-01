import { Badge, Button, FormControl, Select, Stack } from "@chakra-ui/react";
import { FormInput } from "components/FormUtils";
import { useSwap } from "hooks";
import { useForm } from "react-hook-form";

export const FormSwap = () => {
  const swap = useSwap();
  console.log(swap.currency.gnet.pair);
  const { register, handleSubmit, control } = useForm();
  const onSwap = (e: any) => {
    console.log("quantity", e.quantity);
  };
  return (
    <Stack>
      <Stack direction={"row"} alignItems="center">
        <FormControl>
          <Select placeholder="Token">
            <option value="USDT">USDT</option>
            <option value="GNET">GNET</option>
          </Select>
        </FormControl>
        <FormInput
          control={control}
          name="Quantity"
          placeholder={"Quantity"}
        ></FormInput>
        <Badge>100 USDT</Badge>
      </Stack>
      <Button type="submit">Swap</Button>
    </Stack>
  );
};
