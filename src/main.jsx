import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventsPage, loader as EventsPageLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { EventPage, loader as EventPageLoader } from "./pages/EventPage";
import {
  AddEventPage,
  loader as AddEventPageLoader,
} from "./pages/AddEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: EventsPageLoader,
      },
      {
        path: "/events/:id",
        element: <EventPage />,
        loader: EventPageLoader,
      },
      {
        path: "/add-events",
        element: <AddEventPage />,
        loader: AddEventPageLoader,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
