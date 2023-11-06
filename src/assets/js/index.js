import React from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EventList from "./components/EventList";
import Event from "./components/Event";

let container = document.getElementById("index-events-container");
if(container){
    const root = createRoot(container);
    root.render(<EventList limit={6} showPagination={false}/>);
}

function App() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={EventList} />
          <Route path="/event/:id" element={Event} />
        </Routes>
      </Router>
    );
  }
