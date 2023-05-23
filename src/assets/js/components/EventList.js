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
        setEvents(json.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return events.map((event) => <Event event={event} />);
};

export default EventList;
