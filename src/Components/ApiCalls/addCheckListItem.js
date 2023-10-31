import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default async function updateCheckListItems(listId, newItemName) {
  const response = await axios.post(
    `https://api.trello.com/1/checklists/${listId}/checkItems?name=${newItemName}&key=${apiKey}&token=${token}`
  );
  return response;
}
