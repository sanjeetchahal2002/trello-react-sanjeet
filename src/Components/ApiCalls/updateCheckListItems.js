import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default async function updateCheckListItems(cardId, itemId, state) {
  const response = await axios.put(
    `https://api.trello.com/1/cards/${cardId}/checkItem/${itemId}?key=${apiKey}&token=${token}&state=${state}`
  );
  return response;
}
