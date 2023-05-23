import React from "react";
import { posterImageUrl } from "../helpers/eventHelper";

function Event({ event }) {
  
  const truncateString = (str, num) => {
    if( !str ){ return "" }
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
  }

  return (
    <div key={`event_${event.id}`} className="cell">
      <div className="card event align-stretch">
        { event.attributes.Poster.data && 
          <img src={posterImageUrl(event.attributes.Poster)} />
        }
        <div className="card-section">
          <h3>{event.attributes.Title}</h3>
          <p>{truncateString(event.attributes.DescriptionText, 120)}</p>
          <p>
            <a href={`event-page.html?eventId=${event.id}`} className="button primary medium">
              MORE INFO
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Event;
