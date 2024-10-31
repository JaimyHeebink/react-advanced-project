import React, { useState } from "react";
import { TextInput } from "../components/ui/TextInput";
import { Box, Heading, Button } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { EventItems } from "../components/EventItems";
import { CategoryFilter } from "../components/ui/CategoryFilter";
import img from "../images/goumbik.jpg";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const [searchField, setSearchField] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { events, categories } = useLoaderData();

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const matchedEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchField.toLowerCase());
    const matchesCategory = selectedCategory
      ? event.categoryIds.includes(parseInt(selectedCategory))
      : true;
    return matchesSearch && matchesCategory;
  });

  const getCategoriesForEvent = (event) => {
    return event.categoryIds
      .map((id) => {
        const category = categories.find((cat) => cat.id === id);
        return category ? category.name : null;
      })
      .filter(Boolean);
  };

  const enrichedEvents = matchedEvents.map((event) => ({
    ...event,
    categoryNames: getCategoriesForEvent(event),
  }));

  return (
    <Box
      p={5}
      align="center"
      minH="100vh"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Heading size="2xl" mt={5} mb={10} color="gray.700">
        List of events
      </Heading>
      <TextInput onChange={handleChange} mb={10} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <EventItems events={enrichedEvents} />
      <Link to="/add-events">
        <Button
          colorScheme="purple"
          shadow="0px 0px 30px rgba(0, 0, 128, 1)"
          bg={"gray.300"}
          variant="outline"
          _hover={{ bg: "purple.300" }}
          mt={20}
        >
          Click here to add new events
        </Button>
      </Link>
    </Box>
  );
};
