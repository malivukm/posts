export default async function fetchRequest<T>(
  url: string, 
  config?: RequestInit
): Promise<T> {
  return fetch(url,config).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp;
  }).then(async (resp) => resp.json() as Promise<T>);
}