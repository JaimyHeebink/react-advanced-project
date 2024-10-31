import {
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export const EventCard = ({ event, categories }) => {
  const startTime = new Date(event.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = new Date(event.endTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      borderRadius="xl"
      shadow="0px 0px 40px rgba(0, 0, 128, 1)"
      maxW="xs"
      h="30rem"
      cursor="pointer"
      backgroundColor="gray.300"
      _hover={{ transform: "scale(1.01)" }}
    >
      <Image
        h={60}
        w="sm"
        borderRadius="10px 10px 0 0"
        src={event.image}
        alt={event.title}
      />
      <CardBody>
        <Flex flexDir="column">
          <Stack spacing="4" align="center">
            <Text
              fontSize={"xs"}
              color={"gray.500"}
              as={"b"}
              textTransform={"uppercase"}
            >
              {categories.join(", ")}
            </Text>
            <Heading size="md" align="center">
              {event.title}
            </Heading>
            <Text>{event.description}</Text>
            <Text color="green">Starttime: {startTime}</Text>
            <Text color="red">Endtime: {endTime}</Text>
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  );
};
