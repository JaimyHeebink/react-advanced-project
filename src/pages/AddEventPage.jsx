import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import img from "../images/goumbik.jpg";

export const loader = async () => {
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const usersResponse = await fetch("http://localhost:3000/users");

  return {
    categories: await categoriesResponse.json(),
    users: await usersResponse.json(),
  };
};

export const AddEventPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [location, setLocation] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const toast = useToast();
  const { categories, users } = useLoaderData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      createdBy: parseInt(createdBy),
      title,
      description,
      image,
      location,
      categoryIds: [parseInt(selectedCategory)],
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        toast({
          title: "Event added.",
          description: "Your event has been successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        setTitle("");
        setDescription("");
        setStartTime("");
        setEndTime("");
        setImage("");
        setSelectedCategory("");
        setLocation("");
        setCreatedBy("");
      } else {
        throw new Error("Failed to add event.");
      }
    } catch (error) {
      toast({
        title: "Error adding event.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={4}
      align="center"
      minH="100vh"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Heading size="xl" mt={5} mb={10}>
        Add New Event
      </Heading>
      <Box width="100%" maxWidth="500px">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel>Event Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              sx={{ "::placeholder": { color: "black" } }}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              sx={{ "::placeholder": { color: "black" } }}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Location</FormLabel>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter event location"
              sx={{ "::placeholder": { color: "black" } }}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
              sx={{ "::placeholder": { color: "black" } }}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Category</FormLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Created By</FormLabel>
            <Select
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}{" "}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            colorScheme="green"
            shadow="5px 5px 10px green"
            bg={"green.200"}
            variant="outline"
            _hover={{ bg: "green.300" }}
            mt={5}
          >
            Add Event
          </Button>
        </form>
      </Box>
    </Box>
  );
};
