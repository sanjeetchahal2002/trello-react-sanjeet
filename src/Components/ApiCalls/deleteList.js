import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default async function deleteLists(Listid) {
  const response = await axios.put(
    `https://api.trello.com/1/lists/${Listid}/closed?key=${apiKey}&token=${token}&value=true`
  );
  return response;
}
