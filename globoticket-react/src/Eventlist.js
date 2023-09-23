import React, { useEffect } from "react";
import Eventitem from "./Eventitem";
import { fetcher } from "./SwrHelper";
import useSWR from "swr";

export default function Eventlist() {
  const { data, error } = useSWR(
    "https://ndf395-3333.csb.app/events",
    fetcher,
    { suspense: true },
  );

  if (error) {
    throw error;
  }

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
            {data.map((event) => (
              <Eventitem event={event} key={event.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
