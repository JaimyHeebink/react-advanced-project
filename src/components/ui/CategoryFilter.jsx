import React from "react";
import { Select } from "@chakra-ui/react";

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <Select
      placeholder="Select a category"
      value={selectedCategory}
      onChange={onCategoryChange}
      mb={10}
      width="50%"
      bgColor="white"
    >
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};
