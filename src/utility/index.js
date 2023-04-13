const baseUrl = "https://jsonplaceholder.typicode.com";

export async function fetchAPI(url) {
  const res = await fetch(`${baseUrl}/${url}`);
  const data = await res.json();
  return data;
}

export async function insertWithBodyAPI(url, method, body) {
  const res = await fetch(`${baseUrl}/${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
}
