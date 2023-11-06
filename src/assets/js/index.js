import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventList from "./components/EventList";

let container = document.getElementById("index-events-container");
if(container){
    const root = createRoot(container);
    root.render(<EventList />);
}

function App() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={EventList} />
          <Route path="/event/:id" component={Event} />
        </Switch>
      </Router>
    );
  }
