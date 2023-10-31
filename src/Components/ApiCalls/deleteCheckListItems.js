import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default async function updateCheckListItems(listId, id) {
  const response = await axios.delete(
    `https://api.trello.com/1/checklists/${listId}/checkItems/${id}?key=${apiKey}&token=${token}`
  );
  return response;
}
