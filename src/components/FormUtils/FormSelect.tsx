import {
  Select,
  FormLabel,
  SelectProps,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  get,
  FieldPath,
  FieldError,
  Controller,
  FieldValues,
  useFormState,
  ControllerProps,
} from "react-hook-form";

interface FormSelectProps
  extends Omit<SelectProps, "placeholder" | "defaultValue"> {
  label?: string | null;
  helperText?: string | null;
  placeholder?: string;
  option: { value: string; label: string }[];
}

type Props<T extends FieldValues, TName extends FieldPath<T>> = Omit<
  ControllerProps<T, TName>,
  "render"
> &
  FormSelectProps;

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
        // defaultValue={props.defaultValue}
        rules={props.rules}
        name={props.name}
        render={({ field: { ...rest } }) => (
          <Select {...rest} defaultValue={props.defaultValue} {...props}>
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
