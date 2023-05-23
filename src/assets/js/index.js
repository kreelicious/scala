import React from "react";
import { createRoot } from "react-dom/client";
import EventList from "./components/EventList";

let container = document.getElementById("index-events-container");
if(container){
    const root = createRoot(container);
    root.render(<EventList />);
}
