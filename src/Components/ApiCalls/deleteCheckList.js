import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default async function deleteCheckLists(id) {
  const response = await axios.delete(
    `https://api.trello.com/1/checklists/${id}?key=${apiKey}&token=${token}`
  );
  return response;
}
