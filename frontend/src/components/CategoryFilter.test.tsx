import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryFilter } from "./CategoryFilter";

describe("CategoryFilter", () => {
  const categories = ["all", "mouse", "keyboard"] as const;

  test("renders all category buttons", () => {
    const onSelect = jest.fn();
    render(<CategoryFilter categories={categories} selected="all" onSelect={onSelect} />);

    expect(screen.getByText("ALL")).toBeInTheDocument();
    expect(screen.getByText("MOUSE")).toBeInTheDocument();
    expect(screen.getByText("KEYBOARD")).toBeInTheDocument();
  });

  test("highlights selected category", () => {
    const onSelect = jest.fn();
    const { rerender } = render(
      <CategoryFilter categories={categories} selected="all" onSelect={onSelect} />,
    );

    const allButton = screen.getByText("ALL");
    expect(allButton).toHaveStyle("background: #6c5ce7");
    expect(allButton).toHaveStyle("color: rgb(255, 255, 255)");

    rerender(<CategoryFilter categories={categories} selected="mouse" onSelect={onSelect} />);

    const mouseButton = screen.getByText("MOUSE");
    expect(mouseButton).toHaveStyle("background: #6c5ce7");
    expect(mouseButton).toHaveStyle("color: rgb(255, 255, 255)");
  });

  test("calls onSelect with correct category when button is clicked", () => {
    const onSelect = jest.fn();
    render(<CategoryFilter categories={categories} selected="all" onSelect={onSelect} />);

    fireEvent.click(screen.getByText("KEYBOARD"));
    expect(onSelect).toHaveBeenCalledWith("keyboard");
  });

  test("converts category to uppercase", () => {
    const onSelect = jest.fn();
    render(
      <CategoryFilter
        categories={["lowercase", "UPPERCASE"]}
        selected="lowercase"
        onSelect={onSelect}
      />,
    );

    expect(screen.getByText("LOWERCASE")).toBeInTheDocument();
    expect(screen.getByText("UPPERCASE")).toBeInTheDocument();
  });
});
