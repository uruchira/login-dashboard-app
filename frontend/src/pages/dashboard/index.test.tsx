import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

import Dashboard from "./index";
import { deleteProduct, getProducts } from "../../services/dashboardService";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom",
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("./LogoutLink", () => ({
  default: () => <span>Logout</span>,
}));

vi.mock("../../services/dashboardService", () => ({
  getProducts: vi.fn(),
  deleteProduct: vi.fn(),
}));

const sampleProducts = [
  {
    id: "1",
    sku: "SKU-001",
    productName: "First Product",
    price: 100,
    quantity: 2,
    category: "Tools",
    description: "Primary item",
    status: true,
  },
  {
    id: "2",
    sku: "SKU-002",
    productName: "Second Product",
    price: 75,
    quantity: 5,
    category: "Parts",
    description: "",
    status: false,
  },
];

function renderDashboard() {
  return render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>,
  );
}

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state before data resolves", () => {
    (getProducts as Mock).mockReturnValue(new Promise(() => {}));

    renderDashboard();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state when product fetch fails", async () => {
    (getProducts as Mock).mockRejectedValue(new Error("API request failed"));

    renderDashboard();

    expect(
      await screen.findByText("Error Occured: API request failed"),
    ).toBeInTheDocument();
  });

  it("renders product rows and fallback description", async () => {
    (getProducts as Mock).mockResolvedValue(sampleProducts);

    renderDashboard();

    expect(await screen.findByText("First Product")).toBeInTheDocument();
    expect(screen.getByText("Second Product")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("navigates to product details on product name click", async () => {
    const user = userEvent.setup();
    (getProducts as Mock).mockResolvedValue(sampleProducts);

    renderDashboard();

    await user.click(await screen.findByText("First Product"));
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard/1");
  });

  it("shows empty state when there are no products", async () => {
    (getProducts as Mock).mockResolvedValue([]);

    renderDashboard();

    expect(await screen.findByText("No products found.")).toBeInTheDocument();
  });

  it("does not call delete api when delete is canceled", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(false);
    (getProducts as Mock).mockResolvedValue(sampleProducts);

    renderDashboard();

    await user.click((await screen.findAllByAltText("Delete"))[0]);
    expect(deleteProduct).not.toHaveBeenCalled();
    expect(getProducts).toHaveBeenCalledTimes(1);
  });

  it("deletes a product and refreshes the list when confirmed", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(true);
    (getProducts as Mock)
      .mockResolvedValueOnce(sampleProducts)
      .mockResolvedValueOnce([sampleProducts[1]]);
    (deleteProduct as Mock).mockResolvedValue("1");

    renderDashboard();

    await user.click((await screen.findAllByAltText("Delete"))[0]);

    await waitFor(() => {
      expect(deleteProduct).toHaveBeenCalledWith("/api/products/1");
      expect(getProducts).toHaveBeenCalledTimes(2);
    });

    expect(screen.queryByText("First Product")).not.toBeInTheDocument();
    expect(screen.getByText("Second Product")).toBeInTheDocument();
  });
});
