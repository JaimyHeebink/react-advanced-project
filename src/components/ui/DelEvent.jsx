import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const DelEvent = ({ eventId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you wanna delete this event?")) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/events/${eventId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Failed to delete event");

        alert("Event successfully deleted");
        navigate("/");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Button
        colorScheme="red"
        shadow="0px 0px 30px rgba(254, 1, 0)"
        variant="outline"
        bg="red.200"
        _hover={{ bg: "red.300" }}
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete event"}
      </Button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};
