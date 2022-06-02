const API_URL = process.env.REACT_APP_API_URL;

export const getAll = async () => {
  try {
    const url = `${API_URL}/snacks`;
    const response = await fetch(url, { method: "GET" });
    const json = await response.json();
    return json.data.snacks;
  } catch (error) {
    console.error(error);
  }
};

export const getOne = async (id) => {
  try {
    const url = `${API_URL}/snacks/${id}`;
    const response = await fetch(url, { method: "GET" });
    const json = await response.json();
    return json.data.snack;
  } catch (error) {
    console.error(error);
  }
};

export const destroy = async (id) => {
  try {
    const url = `${API_URL}/snacks/${id}`;
    const response = await fetch(url, { method: "DELETE" });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

export const create = async (body) => {
  try {
    const url = `${API_URL}/snacks`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);
    const json = await response.json();
    return json.data.snack;
  } catch (error) {
    console.error(error);
  }
};

export const update = async (id, body) => {
  try {
    const url = `${API_URL}/snacks/${id}`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);
    const json = await response.json();
    return json.data.snack;
  } catch (error) {
    console.error(error);
  }
};
