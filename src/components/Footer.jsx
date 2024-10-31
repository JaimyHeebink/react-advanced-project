import React from "react";
import { Box, Flex, Text, Link, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Footer = () => {
  return (
    <Box as="footer" backgroundColor="gray.800" color="white" py={2}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 8 }}
      >
        <Text fontSize="lg" fontWeight="bold">
          My Events App
        </Text>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 4, md: 6 }}
          mt={{ base: 4, md: 0 }}
          align="center"
        >
          <Link
            as={RouterLink}
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            _hover={{ textDecor: "underline" }}
          >
            Home
          </Link>
          <Link href="#" _hover={{ textDecor: "underline" }}>
            About
          </Link>
          <Link href="#" _hover={{ textDecor: "underline" }}>
            Services
          </Link>
          <Link href="#" _hover={{ textDecor: "underline" }}>
            Contact
          </Link>
        </Stack>
      </Flex>

      <Box mt={4} textAlign="center">
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} My Events App, made by Jaimy
          Heebink. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};
