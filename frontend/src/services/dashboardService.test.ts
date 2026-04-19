import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";

import {
  addProduct,
  deleteProduct,
  fetchWrapper,
  getProductById,
  getProducts,
  updateProduct,
} from "./dashboardService";

describe("dashboardService", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("fetchWrapper sends request with default headers and credentials", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ data: "ok" }),
    });

    const response = await fetchWrapper<{ data: string }>("/api/products", "GET");

    expect(fetch).toHaveBeenCalledWith("/api/products", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: undefined,
    });
    expect(response).toEqual({ data: "ok" });
  });

  it("fetchWrapper serializes body for write requests", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ id: "1" }),
    });

    await fetchWrapper("/api/products", "POST", {
      body: { name: "Keyboard", quantity: 2 },
    });

    expect(fetch).toHaveBeenCalledWith("/api/products", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Keyboard", quantity: 2 }),
    });
  });

  it("fetchWrapper throws when response is not ok", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      json: vi.fn(),
    });

    await expect(fetchWrapper("/api/products", "GET")).rejects.toThrow(
      "API request failed",
    );
  });

  it("getProducts performs a GET request", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([{ id: "1" }]),
    });

    const data = await getProducts<{ id: string }[]>("/api/products");

    expect(fetch).toHaveBeenCalledWith("/api/products", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: undefined,
    });
    expect(data).toEqual([{ id: "1" }]);
  });

  it("getProductById performs a GET request", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ id: "p1" }),
    });

    const data = await getProductById<{ id: string }>("/api/products/p1");

    expect(fetch).toHaveBeenCalledWith("/api/products/p1", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: undefined,
    });
    expect(data).toEqual({ id: "p1" });
  });

  it("addProduct performs a POST request with body", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ created: true }),
    });

    const payload = { sku: "SKU-100", productName: "Desk" };
    const data = await addProduct<{ created: boolean }>("/api/products", payload);

    expect(fetch).toHaveBeenCalledWith("/api/products", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    expect(data).toEqual({ created: true });
  });

  it("updateProduct performs a PUT request with body", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ updated: true }),
    });

    const payload = { productName: "Updated Desk" };
    const data = await updateProduct<{ updated: boolean }>(
      "/api/products/p1",
      payload,
    );

    expect(fetch).toHaveBeenCalledWith("/api/products/p1", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    expect(data).toEqual({ updated: true });
  });

  it("deleteProduct performs a DELETE request", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ deleted: true }),
    });

    const data = await deleteProduct<{ deleted: boolean }>("/api/products/p1");

    expect(fetch).toHaveBeenCalledWith("/api/products/p1", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: undefined,
    });
    expect(data).toEqual({ deleted: true });
  });
});
