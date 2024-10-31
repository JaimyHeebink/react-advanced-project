import React from "react";
import { Flex } from "@chakra-ui/react";
import { EventCard } from "./EventCard";
import { Link } from "react-router-dom";

export const EventItems = ({ events }) => {
  return (
    <Flex
      gap={8}
      width="100%"
      flexWrap="wrap"
      flexDir={["column", "row"]}
      justify="center"
      alignItems="center"
      mt={50}
    >
      {events.map((event) => (
        <Link
          to={`/events/${event.id}`}
          key={event.id}
          style={{ textDecoration: "none" }}
        >
          <EventCard event={event} categories={event.categoryNames} />
        </Link>
      ))}
    </Flex>
  );
};
