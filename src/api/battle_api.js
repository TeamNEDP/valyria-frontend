import axios from "axios";

const instance = axios.create({
  timeout: 10000,
});

export function get_stream_websocket(id) {
  return new WebSocket("ws://101.43.76.104:8000/api/games/" + id + "/live");
}

export async function get_games_details(id) {
  return (await instance.get("/api/games/" + id + "/details")).data;
}
