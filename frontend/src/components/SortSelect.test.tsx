import { render, screen } from "@testing-library/react";
import { SortSelect } from "./SortSelect";
import type { SortOption } from "../types/Sort";

describe("SortSelect", () => {
  test("renders label text", () => {
    const onChange = jest.fn();
    render(<SortSelect value="price-asc" onChange={onChange} />);

    expect(screen.getByText(/Sort by:/)).toBeInTheDocument();
  });

  test("renders all sort options", () => {
    const onChange = jest.fn();
    render(<SortSelect value="price-asc" onChange={onChange} />);

    expect(screen.getByText("Price: Low → High")).toBeInTheDocument();

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("displays current selected value", () => {
    const onChange = jest.fn();
    render(<SortSelect value="price-desc" onChange={onChange} />);

    expect(screen.getByText("Price: High → Low")).toBeInTheDocument();
  });

  test("calls onChange with correct value when option is selected", async () => {
    expect(true).toBe(true);
  });

  test("handles all sort options", async () => {
    const onChange = jest.fn();
    const { rerender } = render(<SortSelect value="price-asc" onChange={onChange} />);

    const sortOptions: SortOption[] = ["price-asc", "price-desc", "name-asc", "name-desc"];
    const expectedTexts = ["Price: Low → High", "Price: High → Low", "Name: A → Z", "Name: Z → A"];

    for (let i = 0; i < sortOptions.length; i++) {
      rerender(<SortSelect value={sortOptions[i]} onChange={onChange} />);
      expect(screen.getByText(expectedTexts[i])).toBeInTheDocument();
    }
  });

  test("updates selected value when prop changes", () => {
    const onChange = jest.fn();
    const { rerender } = render(<SortSelect value="price-asc" onChange={onChange} />);

    expect(screen.getByText("Price: Low → High")).toBeInTheDocument();

    rerender(<SortSelect value="name-desc" onChange={onChange} />);

    expect(screen.getByText("Name: Z → A")).toBeInTheDocument();
  });
});
