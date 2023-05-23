import React from "react";
import { createRoot } from "react-dom/client";
import EventDetails from "./components/EventDetails";

const container = document.getElementById("event_container");
if(container){
  const queryParams = new URLSearchParams(window.location.search)
  const eventId = queryParams.get("eventId")
  if(eventId){
    const root = createRoot(container);
    root.render(<EventDetails eventId={eventId} />);
  }
  
}
