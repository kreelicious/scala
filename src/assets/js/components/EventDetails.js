import React, { useState, useEffect } from "react";
import apiFetch from "../lib/fetch";
import dateFormat from "dateformat";
import { bannerImageUrl, posterImageUrl } from "../helpers/eventHelper";
import EventBriteCheckout from "./EventBriteCheckout";

function EventDetails({ eventId }) {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    apiFetch(`/events/${eventId}?populate=*`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
        setEvent(json.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formattedDate = (input) => {
    return dateFormat(input, 'fullDate');
  }

  const formattedTime = (from, to) => {
    const fromTime = dateFormat(from, 'h:MM TT')
    let toTime = 'till late'
    if(to){
      toTime = `to ${dateFormat(to, 'h:MM TT')}`
    }
    return `${fromTime} ${toTime}`
  }

  return (
    <>
    { event && 
      <>
      <header className="event-head">
        { event.attributes.Banner.data && 
          <img src={bannerImageUrl(event.attributes.Banner)} width="100%"  />
        }
        <div className="event-head-content">
          <h2>{event.attributes.Title}</h2>
          <p>{formattedDate(event.attributes.StartAt)}</p>
        </div>
      </header>

      <section className="event-frame">
        <div className="grid-container ">
          <div className="grid-x grid-margin-x">
            <div className="cell large-8">
              <div className="grid-x grid-padding-y">
                <div className="cell small-6 medium-3">
                  <p>
                    <i className="fa-regular fa-calendar"></i> {formattedDate(event.attributes.StartAt)}
                  </p>
                </div>
                <div className="cell small-6 medium-3">
                  <p>
                    <i className="fa-regular fa-clock"></i> { formattedTime(event.attributes.StartAt, event.attributes.EndAt) }
                  </p>
                </div>
                {/* <div className="cell small-6 medium-3">
                  <p>
                    {" "}
                    <i className="fa-regular fa-tag"></i>{" "}
                    <a href="#">Country</a>, <a href="#">Acid</a>,{" "}
                    <a href="#">House</a>
                  </p>
                </div> */}
              </div>
              <div className="cell">
                <p>
                  <i className="fa-regular fa-location-dot"></i> The Scala,
                  Merthyr Tydfil
                </p>
              </div>

              <hr />
              <p>
                { event.attributes.DescriptionHtml}
              </p>
              <hr />
              <br />
              <div className="sharethis-inline-share-buttons"></div>
            </div>
            <div className="cell large-4">
              <div className="card">
                { event.attributes.EventbriteId && 
                  <div>
                    <EventBriteCheckout eventId={event.attributes.EventBriteId } />
                  </div>
                }
                { event.attributes.Poster.data && 
                  <p>
                    <img src={posterImageUrl(event.attributes.Poster)} />
                  </p>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
      }
    </>
  );
}

export default EventDetails;
