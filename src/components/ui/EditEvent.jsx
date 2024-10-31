import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";

export const EditEvent = ({ eventId, onClose }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        if (!response.ok) throw new Error("Event not found");
        const data = await response.json();
        setEvent(data);
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setLocation(data.location);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      id: eventId,
      createdBy: event.createdBy,
      title,
      description,
      image,
      categoryIds: event.categoryIds,
      location,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) throw new Error("Failed to update event");
      alert("Event updated successfully");
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <Spinner size="lg" />;
  if (error) return <Text color="red.500">Error: {error}</Text>;
  if (!event) return <Text>Event not found</Text>;

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Edit Event
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Title:</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Description:</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event description"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Image URL:</FormLabel>
          <Input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Location:</FormLabel>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Event location"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Start Time:</FormLabel>
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>End Time:</FormLabel>
          <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" type="submit">
          Update Event
        </Button>
      </form>
    </Box>
  );
};
