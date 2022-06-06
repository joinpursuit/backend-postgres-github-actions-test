import * as snacks from "./snacks.api";

const API_URL = process.env.REACT_APP_API_URL;

async function checkServerStatus() {
  try {
    const url = `${API_URL}/ping`;
    const response = await fetch(url, { method: "GET" });
    return response.status === 204;
  } catch (error) {
    console.error(error);
  }
}

const api = {
  checkServerStatus,
  snacks,
};

export default api;
