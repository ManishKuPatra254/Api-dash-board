import { Button as ChakraButton } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";

const defaultStyles = {
  padding: "14px 20px",
} as const;

export const Button = (props: ButtonProps) => {
  return <ChakraButton {...defaultStyles} {...props} />;
};

export type { ButtonProps };
