import { useRef, useEffect, useState } from "react";
import { animate } from "framer-motion";
import { Text, TextProps } from "@chakra-ui/react";

type Props = TextProps & {
  children: string | number;
  duration?: number;
  formatter?: (val: number) => string;
};

const defaultFormatter = (val: number) => "" + Math.round(val);

export const TextAnimation = (props: Props) => {
  const {
    children,
    duration = 1,
    formatter = defaultFormatter,
    ...rest
  } = props;
  const [head, setHead] = useState("");
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const split = ("" + children).split(/\./);
    if (split.length === 2) {
      setHead(`${split[0]}.`);
    } else {
      setHead("");
    }
    const numeredChildren = Number(split?.[1] ? split?.[1] : split?.[0]);

    const currentNumber = Number(textRef.current.innerText);
    const from = isNaN(currentNumber) ? 0 : currentNumber;
    if (from > numeredChildren) return;
    const control = animate(from, numeredChildren, {
      duration,
      onUpdate: value => {
        textRef.current!.innerText = formatter(value);
      },
    });

    return control.stop;
  }, [children, duration]);

  return (
    <Text {...rest}>
      {head}
      <Text as="span" ref={textRef} />
    </Text>
  );
};
