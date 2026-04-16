import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { delay } from "./utils";

describe("delay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not resolve before the given timeout", async () => {
    let resolved = false;
    const promise = delay(1000).then(() => {
      resolved = true;
    });

    await vi.advanceTimersByTimeAsync(999);
    expect(resolved).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await promise;
    expect(resolved).toBe(true);
  });

  it("resolves after the specified timeout", async () => {
    const promise = delay(500);

    await vi.advanceTimersByTimeAsync(500);
    await expect(promise).resolves.toBeUndefined();
  });
});
