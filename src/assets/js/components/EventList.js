import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import apiFetch from "../lib/fetch";
import Event from "./Event";
import PropTypes from "prop-types";
import moment from "moment";

const EventList = ({ offset, limit, showPagination }) => {
  const [events, setEvents] = useState([]);
  const [hasMorePages, setHasMorePages] = useState(false);
  const pageOffset = useRef(offset);

  useEffect(() => {
    getNextPage();
  }, []);

  const getNextPage = () => {
    const currentDate = moment().format("YYYY-MM-DD");
    apiFetch(
      `/events?publicationState=live&filters[StartAt][$gte]=${currentDate}&pagination[start]=${pageOffset.current}&pagination[limit]=${limit}&populate=*`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.data);
        const sortedEvents = json.data.sort(
          (a, b) =>
            new Date(a.attributes.StartAt) - new Date(b.attributes.StartAt)
        );
        setEvents([...events, ...sortedEvents]);
        const paginationMeta = json.meta.pagination;
        pageOffset.current = paginationMeta.start + paginationMeta.limit;
        console.log(paginationMeta);
        setHasMorePages(pageOffset.current <= paginationMeta.total);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {events.map((event) => (
        <a key={event.id} href={`/event-page.html?eventId=${event.id}`}>
          <Event event={event} />
        </a>
      ))}

      {showPagination && hasMorePages && (
        <div className="grid-container text-center">
          <div className="grid-x">
            <div className="cell">
              <button className="button primary medium" onClick={getNextPage}>
                LOAD MORE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

EventList.propTypes = {
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  showPagination: PropTypes.bool,
};

EventList.defaultProps = {
  limit: 10,
  offset: 1,
  showPagination: true,
};

export default EventList;
