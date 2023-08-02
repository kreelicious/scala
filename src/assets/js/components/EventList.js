import React, { useEffect, useState } from "react";
import apiFetch from "../lib/fetch";
import Event from "./Event";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    apiFetch("/events?populate=*")
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
        .filter(event => new Date(event.attributes.StartAt) >= currentDate)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedAndFilteredEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return events.map((event) => <Event key={event.id} event={event} />);
};

export default EventList;
