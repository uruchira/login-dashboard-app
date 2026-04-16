import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Product } from "../types";
import { NETWORK_DELAY } from "../constants";

describe("dashboard fakeApis", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetModules();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("getAPI returns seeded products and a new array copy", async () => {
    const { getAPI } = await import("./fakeApis");

    const firstCall = getAPI();
    await vi.advanceTimersByTimeAsync(NETWORK_DELAY);
    const firstResult = await firstCall;

    expect(firstResult).toHaveLength(3);

    firstResult.push({
      sku: "TEMP",
      name: "Temp Product",
      price: 1,
      quantity: 1,
      category: "AA",
      status: true,
    });

    const secondCall = getAPI();
    await vi.advanceTimersByTimeAsync(NETWORK_DELAY);
    const secondResult = await secondCall;

    expect(secondResult).toHaveLength(3);
  });

  it("createAPI creates a product with generated sku and persists it", async () => {
    const nowSpy = vi.spyOn(Date, "now").mockReturnValue(1234567890);
    const { createAPI, getAPI } = await import("./fakeApis");

    const payload = {
      name: "Samsung S24",
      price: 999,
      quantity: 15,
      category: "AB",
      description: "Phone",
      status: true,
    };

    const createCall = createAPI(payload);
    await vi.advanceTimersByTimeAsync(NETWORK_DELAY);
    const created = await createCall;

    expect(created).toMatchObject(payload);
    expect(created.sku).toBe("1234567890");
    expect(nowSpy).toHaveBeenCalled();

    const getCall = getAPI();
    await vi.advanceTimersByTimeAsync(NETWORK_DELAY);
    const products = await getCall;

    expect(products).toContainEqual(created);
  });

  it("updateAPI updates an existing product and throws for unknown sku", async () => {
    const { getAPI, updateAPI } = await import("./fakeApis");

    const getCall = getAPI();
    await vi.advanceTimersByTimeAsync(NETWORK_DELAY);
    const products = await getCall;

    const target = products[0];
    const updated: Product = {
      ...target,
      name: "Updated Name",
      quantity: target.quantity + 10,
    };

    const updateCall = updateAPI(updated);
    await vi.advanceTimersByTimeAsync(NETWORK_DELAY);
    await expect(updateCall).resolves.toEqual(updated);

    const missingUpdateCall = updateAPI({
      ...updated,
      sku: "NOT_FOUND",
    });
    const rejectionAssertion = expect(missingUpdateCall).rejects.toThrow(
      "Product is not found",
    );
    await vi.advanceTimersByTimeAsync(NETWORK_DELAY);
    await rejectionAssertion;
  });

  it("deleteAPI removes the product by sku", async () => {
    const { getAPI, deleteAPI } = await import("./fakeApis");

    const firstGetCall = getAPI();
    await vi.advanceTimersByTimeAsync(NETWORK_DELAY);
    const beforeDelete = await firstGetCall;
    const skuToDelete = beforeDelete[0].sku;

    const deleteCall = deleteAPI(skuToDelete);
    await vi.advanceTimersByTimeAsync(NETWORK_DELAY);
    await expect(deleteCall).resolves.toBeUndefined();

    const secondGetCall = getAPI();
    await vi.advanceTimersByTimeAsync(NETWORK_DELAY);
    const afterDelete = await secondGetCall;

    expect(afterDelete.some((product) => product.sku === skuToDelete)).toBe(
      false,
    );
    expect(afterDelete).toHaveLength(beforeDelete.length - 1);
  });
});
