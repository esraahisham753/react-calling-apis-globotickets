import axios from "axios";

export async function getEvents(page) {
  const response = await axios.get(
    `https://ndf395-3333.csb.app/events?page=${page}`,
  );
  return response;
}
