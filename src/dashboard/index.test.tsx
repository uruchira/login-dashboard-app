import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Dashboard from "./index";

const mockNavigate = vi.fn();
const mockUpdateProducts = vi.fn();
const mockGetProducts = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom",
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../contexts/ProductContext", () => ({
  useProducts: () => ({
    updateProducts: mockUpdateProducts,
  }),
}));

vi.mock("./services", () => ({
  getProducts: () => mockGetProducts(),
}));

vi.mock("./LogoutLink", () => ({
  default: () => <span>Logout</span>,
}));

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders basic dashboard UI elements", () => {
    mockGetProducts.mockResolvedValueOnce([]);

    render(<Dashboard />);

    expect(screen.getByRole("heading", { name: "Products" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add New" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("loads products on mount, renders rows, and updates product context", async () => {
    const products = [
      {
        sku: "AN001",
        name: "HP Laptop",
        price: 1000,
        quantity: 2,
        category: "AA",
        description: "",
        status: true,
      },
      {
        sku: "AN002",
        name: "Phone",
        price: 500,
        quantity: 1,
        category: "AB",
        description: "In stock",
        status: false,
      },
    ];
    mockGetProducts.mockResolvedValueOnce(products);

    render(<Dashboard />);

    await waitFor(() => {
      expect(mockUpdateProducts).toHaveBeenCalledWith(products);
    });

    expect(screen.getByText("AN001")).toBeInTheDocument();
    expect(screen.getByText("$1000")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("navigates to add product page when Add New is clicked", () => {
    mockGetProducts.mockResolvedValueOnce([]);

    render(<Dashboard />);

    fireEvent.click(screen.getByRole("button", { name: "Add New" }));

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard/new");
  });

  it("navigates to product details when a row is clicked", async () => {
    const products = [
      {
        sku: "AN00K",
        name: "Mac Book 4",
        price: 150,
        quantity: 10,
        category: "AB",
        description: "Demo",
        status: false,
      },
    ];
    mockGetProducts.mockResolvedValueOnce(products);

    render(<Dashboard />);

    const skuCell = await screen.findByText("AN00K");
    const row = skuCell.closest("tr");

    expect(row).not.toBeNull();
    fireEvent.click(row as HTMLTableRowElement);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard/AN00K");
  });
});
