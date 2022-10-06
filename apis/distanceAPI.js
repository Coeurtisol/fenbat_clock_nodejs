import axios from "axios";

export async function getDistanceByRoad(start, end) {
  const url = "https://api.openrouteservice.org/v2/directions/driving-car/json";
  const body = {
    coordinates: [
      [start[0], start[1]],
      [end[0], end[1]],
    ],
    units: "km",
  };
  const config = {
    headers: {
      Authorization: process.env.ORS_API_KEY,
    },
  };
  const res = await axios.post(url, body, config);
  const data = res.data;
  const roadDistance = data.routes[0].summary.distance;
  return roadDistance;
}
