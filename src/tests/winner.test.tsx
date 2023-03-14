import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import Board from "../App";

describe("Board component", () => {
  let container: RenderResult["container"] | null;
  let squares: (HTMLButtonElement | null)[];
  let resetButton: HTMLButtonElement | null;

  beforeEach(() => {
    const result = render(<Board dimension={3} onPlay ={ () => {}} onEnd ={ () => {}}  />);
    container = result.container;
    squares = Array.from(container.querySelectorAll(".square")) as (HTMLButtonElement | null)[];
    resetButton = container.querySelector(".restart-button");

    // Mock the window.location.reload() method
    Object.defineProperty(window.location, "reload", {
      configurable: true,
    });
    window.location.reload = jest.fn();
  });

  test("renders the board with correct dimensions", () => {
    expect(squares.length).toBe(9); // 3x3 board
  });

  test("clicking on a square updates the board", () => {
    const square = squares[0] as HTMLButtonElement;
    fireEvent.click(square);
    expect(square.textContent).toBe("X");
  });

  test("resets the board when reset button is clicked", () => {
    const square = squares[0] as HTMLButtonElement;
    fireEvent.click(square);
    fireEvent.click(resetButton as HTMLButtonElement);
    expect(square.textContent).toBe("");
  });

  afterEach(() => {
    container = null;
    squares = [];
    resetButton = null;
  });

});
