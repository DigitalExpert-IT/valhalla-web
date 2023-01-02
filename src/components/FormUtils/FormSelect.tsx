import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import {
  Controller,
  ControllerProps,
  FieldValues,
  FieldError,
  FieldPath,
  get,
  useFormState,
} from "react-hook-form";

type Props<T extends FieldValues, TName extends FieldPath<T>> = Omit<
  ControllerProps<T, TName>,
  "render"
> & {
  label?: string | null;
  placeholder?: string | null;
  helperText?: string | null;
  option: { value: string; label: string }[];
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
};

export const FormSelect = <T extends FieldValues, TName extends FieldPath<T>>(
  props: Props<T, TName>
) => {
  const { errors } = useFormState({ control: props.control });
  const error: FieldError | null = get(errors, props.name);

  return (
    <FormControl isRequired={!!props.rules?.required} isInvalid={!!error}>
      {props.label ? <FormLabel>{props.label}</FormLabel> : null}
      <Controller
        control={props.control}
        defaultValue={props.defaultValue}
        rules={props.rules}
        name={props.name}
        render={({ field: { ...rest } }) => (
          <Select
            {...rest}
            placeholder={props.placeholder ?? ""}
            onChange={props.onChange}
          >
            {props.option.map((e, i) => (
              <option value={e.value} key={i}>
                {e.label}
              </option>
            ))}
          </Select>
        )}
      />
      {props.helperText ? (
        <FormHelperText>{props.helperText}</FormHelperText>
      ) : null}
      <FormErrorMessage>{error?.message ?? "Invalid Value"}</FormErrorMessage>
    </FormControl>
  );
};
