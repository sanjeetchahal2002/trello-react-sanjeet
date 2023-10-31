import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default async function getBoards() {
  const response = await axios.get(
    `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`
  );
  return response;
}
