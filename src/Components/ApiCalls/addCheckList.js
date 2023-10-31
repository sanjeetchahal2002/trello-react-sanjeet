import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default async function addCheckLists(id, newCheckListName) {
  const response = await axios.post(
    `https://api.trello.com/1/cards/${id}/checklists?key=${apiKey}&token=${token}&name=${newCheckListName}`
  );
  return response;
}
