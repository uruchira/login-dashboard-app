type Params = Record<string, string | number>;

export async function fetchWrapper<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: {
    params?: Params;
    body?: unknown;
  },
): Promise<T> {
  const response = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

export function getProducts<T>(
  url: string,
  params?: Record<string, string | number>,
): Promise<T> {
  return fetchWrapper<T>(url, "GET", { params });
}

export function getProductById<T>(
  url: string,
  params?: Record<string, string | number>,
): Promise<T> {
  return fetchWrapper<T>(url, "GET", { params });
}

export function addProduct<T>(
  url: string,
  body: Record<string, unknown>,
): Promise<T> {
  return fetchWrapper<T>(url, "POST", { body });
}

export function updateProduct<T>(
  url: string,
  body: Record<string, unknown>,
): Promise<T> {
  return fetchWrapper<T>(url, "PUT", { body });
}

export function deleteProduct<T>(
  url: string,
  body: Record<string, unknown>,
): Promise<T> {
  return fetchWrapper<T>(url, "DELETE", { body });
}
