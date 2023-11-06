import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import apiFetch from "../lib/fetch";
import Event from "./Event";
import PropTypes from 'prop-types';

const EventList = ({limit}) => {
  const [events, setEvents] = useState([]);
  const PAGE_SIZE = 200;

  useEffect(() => {
    apiFetch(`/events?pagination[limit]=${limit}&pagination[${PAGE_SIZE}]=200&populate=*`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
        const currentDate = new Date();
        const sortedAndFilteredEvents = json.data
          .filter(event => new Date(event.attributes.StartAt) >= currentDate)
          .sort((a, b) => new Date(a.attributes.StartAt) - new Date(b.attributes.StartAt));
        setEvents(sortedAndFilteredEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return events.map((event) => (
    <Link key={event.id} to={`/event/${event.id}`}>
      <Event event={event} />
    </Link>
  ));
};


EventList.propTypes = {
  limit: PropTypes.number,
};

export default EventList;
