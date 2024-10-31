import { Input } from "@chakra-ui/react";

export const TextInput = ({ onChange, ...props }) => (
  <Input
    variant="filled"
    bgColor="white"
    placeholder="Search for event"
    width="50%"
    onChange={onChange}
    _focus={{ bg: "white" }}
    {...props}
  />
);
