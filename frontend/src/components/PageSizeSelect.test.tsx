import { render, screen } from "@testing-library/react";
import { PageSizeSelect } from "./PageSizeSelect";
import userEvent from "@testing-library/user-event";

describe("PageSizeSelect", () => {
  test("renders label text", () => {
    const onChange = jest.fn();
    render(<PageSizeSelect value={10} onChange={onChange} />);

    expect(screen.getByText("Products per page:")).toBeInTheDocument();
  });

  test("displays current selected value", () => {
    const onChange = jest.fn();
    render(<PageSizeSelect value={20} onChange={onChange} />);

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("20");
  });

  test("renders all available options", () => {
    const onChange = jest.fn();
    render(<PageSizeSelect value={10} onChange={onChange} />);

    expect(screen.getByRole("option", { name: "10" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "20" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "30" })).toBeInTheDocument();
  });

  test("calls onChange when option is selected", async () => {
    const onChange = jest.fn();
    render(<PageSizeSelect value={10} onChange={onChange} />);

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "30");

    expect(onChange).toHaveBeenCalledWith(30);
  });

  test("updates selected value when prop changes", () => {
    const onChange = jest.fn();
    const { rerender } = render(<PageSizeSelect value={10} onChange={onChange} />);

    let select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("10");

    rerender(<PageSizeSelect value={20} onChange={onChange} />);

    select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("20");
  });

  test("calls onChange with numeric value not string", async () => {
    const onChange = jest.fn();
    render(<PageSizeSelect value={10} onChange={onChange} />);

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "20");

    expect(onChange).toHaveBeenCalledWith(20);
    expect(typeof onChange.mock.calls[0][0]).toBe("number");
  });
});
