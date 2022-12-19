import { useRef, useEffect } from "react";
import { animate } from "framer-motion";
import { Text, TextProps } from "@chakra-ui/react";

type Props = TextProps & {
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
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    // ignore non numeric children
    const numeredChildren = Number(children);
    if (isNaN(numeredChildren)) {
      if (typeof children === "string") textRef.current.innerText = children;
      return;
    }

    const currentNumber = Number(textRef.current.innerText);
    const from = isNaN(currentNumber) ? 0 : currentNumber;

    const control = animate(from, numeredChildren, {
      duration,
      onUpdate: value => {
        textRef.current!.innerText = formatter(value);
      },
    });

    return control.stop;
  }, [children, duration]);

  return (
    <Text ref={textRef} {...rest}>
      {typeof children !== "string" ? children : null}
    </Text>
  );
};
