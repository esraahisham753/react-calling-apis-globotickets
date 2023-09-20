import React, { useState, useEffect } from "react";
import Eventitem from "./Eventitem";
import axios from "axios";

export default function Eventlist() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("https://ndf395-3333.csb.app/events")
      .then((response) => setEvents(response.data));
  }, []);

  return (
    <div className="container" id="eventtable">
      <div className="container">
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Artist</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <Eventitem event={event} key={event.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
