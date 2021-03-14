export async function fetchData(url) {
  let response = null;

  try {
    response = await fetch(url);
  } catch (e) {
    console.error(e);
  }

  return response;
}
