import React from "react";
import { createRoot } from "react-dom/client";
import EventList from "./components/EventList";

const container = document.getElementById("events-container");
if(container){
  const root = createRoot(container);
  root.render(<EventList />);
}

