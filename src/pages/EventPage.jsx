import React, { useState } from "react";
import {
  Image,
  Heading,
  Text,
  Box,
  Grid,
  SimpleGrid,
  Flex,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EditEvent } from "../components/ui/EditEvent";
import { DelEvent } from "../components/ui/DelEvent";
import img from "../images/goumbik.jpg";

export const loader = async ({ params }) => {
  const usersResponse = await fetch("http://localhost:3000/users");
  const users = await usersResponse.json();

  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const categories = await categoriesResponse.json();

  const eventResponse = await fetch(
    `http://localhost:3000/events/${params.id}`
  );
  const event = await eventResponse.json();

  return { users, categories, event };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const navigate = useNavigate();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const currentUser = users.find((user) => user.id === event.createdBy);
  const currentCategorie = event.categoryIds.map((id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : null;
  });

  const startTime = new Date(event.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = new Date(event.endTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box
      p={2}
      align="center"
      minH="100vh"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Flex justify="center" align="center" direction="column">
        <Image
          src={event.image}
          alt={event.title}
          w="60vh"
          objectFit="cover"
          borderRadius="md"
        />
      </Flex>
      <Grid>
        <SimpleGrid columns={2} mt={10}>
          <Box w={"100%"}>
            <Stack spacing={5}>
              <Heading size="xl" m={2}>
                {event.title}
              </Heading>
              <Text fontSize="sm" as="b" textTransform="uppercase" m={2}>
                Category: {currentCategorie.join(", ")}
              </Text>
              <Text fontSize="lg">{event.description}</Text>
              <Text fontSize="lg" as="b">
                Starttime: {startTime}
              </Text>
              <Text fontSize="lg" as="b">
                Endtime: {endTime}
              </Text>
            </Stack>
          </Box>
          <Box w={"100%"}>
            <Heading size="md">Created by:</Heading>
            {currentUser ? (
              <>
                <Text m={3} fontSize="lg">
                  {currentUser.name}
                </Text>
                <Image
                  src={currentUser.image}
                  boxSize="150px"
                  borderRadius="full"
                  fit="cover"
                  alt={currentUser.name}
                />
              </>
            ) : (
              <Text>No user found</Text>
            )}
            <Stack spacing={6} mt={10} mb={10} align="center">
              <Button
                colorScheme="orange"
                shadow="0px 0px 30px rgba(254, 133, 0)"
                variant="outline"
                bg="orange.200"
                _hover={{ bg: "orange.300" }}
                onClick={() => setEditModalOpen(true)}
                width="100px"
              >
                Edit Event
              </Button>
              <DelEvent eventId={event.id} />
            </Stack>
          </Box>
        </SimpleGrid>
      </Grid>

      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditEvent
              eventId={event.id}
              onClose={() => {
                setEditModalOpen(false);
                navigate(0);
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
