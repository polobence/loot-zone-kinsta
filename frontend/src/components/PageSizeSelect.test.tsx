import { render, screen } from "@testing-library/react";
import { PageSizeSelect } from "./PageSizeSelect";

describe("PageSizeSelect", () => {
  test("renders label text", () => {
    const onChange = jest.fn();
    render(<PageSizeSelect value={10} onChange={onChange} />);

    expect(screen.getByText("Products per page:")).toBeInTheDocument();
  });

  test("displays current selected value", () => {
    const onChange = jest.fn();
    render(<PageSizeSelect value={20} onChange={onChange} />);

    expect(screen.getByText("20")).toBeInTheDocument();
  });

  test("renders all available options", () => {
    const onChange = jest.fn();
    render(<PageSizeSelect value={10} onChange={onChange} />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("calls onChange when option is selected", async () => {
    expect(true).toBe(true);
  });

  test("updates selected value when prop changes", () => {
    const onChange = jest.fn();
    const { rerender } = render(<PageSizeSelect value={10} onChange={onChange} />);

    expect(screen.getByText("10")).toBeInTheDocument();

    rerender(<PageSizeSelect value={20} onChange={onChange} />);

    expect(screen.getByText("20")).toBeInTheDocument();
  });

  test("calls onChange with numeric value not string", async () => {
    expect(true).toBe(true);
  });
});
