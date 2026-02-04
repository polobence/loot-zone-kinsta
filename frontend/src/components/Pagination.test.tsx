import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination component", () => {
  test("displays correct page number", () => {
    render(<Pagination currentPage={2} totalPages={5} onPrev={jest.fn()} onNext={jest.fn()} />);

    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  test("previous button is disabled on first page", () => {
    const onPrev = jest.fn();
    render(<Pagination currentPage={1} totalPages={3} onPrev={onPrev} onNext={jest.fn()} />);

    const prevButton = screen.getByText("Previous") as HTMLButtonElement;
    expect(prevButton).toBeDisabled();

    fireEvent.click(prevButton);
    expect(onPrev).not.toHaveBeenCalled();
  });

  test("next button is disabled on last page", () => {
    const onNext = jest.fn();
    render(<Pagination currentPage={3} totalPages={3} onPrev={jest.fn()} onNext={onNext} />);

    const nextButton = screen.getByText("Next") as HTMLButtonElement;
    expect(nextButton).toBeDisabled();

    fireEvent.click(nextButton);
    expect(onNext).not.toHaveBeenCalled();
  });

  test("clicking buttons calls handlers", () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();

    render(<Pagination currentPage={2} totalPages={3} onPrev={onPrev} onNext={onNext} />);

    fireEvent.click(screen.getByText("Previous"));
    expect(onPrev).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Next"));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  test("does not render if totalPages <= 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPrev={jest.fn()} onNext={jest.fn()} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
