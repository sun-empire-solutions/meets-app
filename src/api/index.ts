const API_URL = "https://video-chat-app-4804-dev.twil.io";
// const API_URL = "http://localhost:3000";

const request = (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: {}
) => {
  return fetch(url, {
    mode: "cors",
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const getAccessToken = async (username: string, room: string) => {
  const response = await request(`${API_URL}/functions/get_token`, "POST", {
    username,
    room,
  });
  const json = await response.json();
  return json.token;
};

export { getAccessToken };
