import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useColorModeValue } from "@chakra-ui/react";
import { forwardRef } from "react";

function InputFloating(
  {
    border,
    type,
    label,
    onChange,
    variant,
    bgColor = false,
    error,
    color = false,
    ...rest
  },
  ref
) {
  return (
    <FormControl variant="floating" id={label} isInvalid={error}>
      <Input
        placeholder=" "
        type={type}
        onChange={onChange}
        variant={variant ? variant : "outline"}
        _focus={border && { borderColor: border }}
        ref={ref}
        {...rest}
      />
      <FormLabel
        color={color ? color : "gray.400"}
        bgColor={useColorModeValue("gray.50!important", "gray.900!important")}
      >
        {label}
      </FormLabel>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}

export default forwardRef(InputFloating);
