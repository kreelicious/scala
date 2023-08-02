import React from "react";
import { Link } from 'react-router-dom';
import { bannerImageUrl, formattedDate, formattedTime } from "../helpers/eventHelper";

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
        { event.attributes.Banner.data && 
          <img src={bannerImageUrl(event.attributes.Banner)} />
        }
        <div className="card-section">
          <h3>{event.attributes.Title}</h3>
          <div><strong>On {formattedDate(event.attributes.StartAt)}</strong> </div>
          <div><small>From {formattedTime(event.attributes.StartAt, event.attributes.EndAt)}</small></div>
          <br />
          <p>
            <Link to={`/event/${event.id}`} className="button primary medium">
              MORE INFO
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Event;
