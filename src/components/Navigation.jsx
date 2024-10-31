import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="gray.800" p={4}>
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        <RouterLink to="/">
          <Button variant="link" color="white" fontSize="xl" fontWeight="bold">
            Events App
          </Button>
        </RouterLink>

        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <Link
            as={RouterLink}
            to="/"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Home
          </Link>
          <Link
            as={RouterLink}
            to="/events/1"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Event
          </Link>
          <Link
            as={RouterLink}
            to="/add-events"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Add Events
          </Link>
        </HStack>

        <Button
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          color="white"
          bg="gray.700"
          _hover={{ bg: "gray.500" }}
        >
          Menu
        </Button>
      </Flex>

      {isOpen && (
        <Box bg="gray.700" p={4} display={{ md: "none" }}>
          <HStack spacing={4} direction="column" align="center">
            <Link
              as={RouterLink}
              to="/"
              color="white"
              _hover={{ textDecoration: "underline" }}
            >
              Eventslist
            </Link>
            <Link
              as={RouterLink}
              to="/events/1"
              color="white"
              _hover={{ textDecoration: "underline" }}
            >
              Event
            </Link>
            <Link
              as={RouterLink}
              to="/add-events"
              color="white"
              _hover={{ textDecoration: "underline" }}
            >
              Add Events
            </Link>
          </HStack>
        </Box>
      )}
    </Box>
  );
};
