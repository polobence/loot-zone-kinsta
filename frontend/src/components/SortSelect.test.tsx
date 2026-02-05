import { render, screen } from "@testing-library/react";
import { SortSelect } from "./SortSelect";
import type { SortOption } from "../types/Sort";
import userEvent from "@testing-library/user-event";

describe("SortSelect", () => {
  test("renders label text", () => {
    const onChange = jest.fn();
    render(<SortSelect value="price-asc" onChange={onChange} />);

    expect(screen.getByText(/Sort by:/)).toBeInTheDocument();
  });

  test("renders all sort options", () => {
    const onChange = jest.fn();
    render(<SortSelect value="price-asc" onChange={onChange} />);

    expect(screen.getByRole("option", { name: "Price: Low → High" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Price: High → Low" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Name: A → Z" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Name: Z → A" })).toBeInTheDocument();
  });

  test("displays current selected value", () => {
    const onChange = jest.fn();
    render(<SortSelect value="price-desc" onChange={onChange} />);

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("price-desc");
  });

  test("calls onChange with correct value when option is selected", async () => {
    const onChange = jest.fn();
    render(<SortSelect value="price-asc" onChange={onChange} />);

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "name-asc");

    expect(onChange).toHaveBeenCalledWith("name-asc");
  });

  test("handles all sort options", async () => {
    const onChange = jest.fn();
    const { rerender } = render(<SortSelect value="price-asc" onChange={onChange} />);

    const sortOptions: SortOption[] = ["price-asc", "price-desc", "name-asc", "name-desc"];

    for (const option of sortOptions) {
      rerender(<SortSelect value={option} onChange={onChange} />);
      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(select.value).toBe(option);
    }
  });

  test("updates selected value when prop changes", () => {
    const onChange = jest.fn();
    const { rerender } = render(<SortSelect value="price-asc" onChange={onChange} />);

    let select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("price-asc");

    rerender(<SortSelect value="name-desc" onChange={onChange} />);

    select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("name-desc");
  });
});
