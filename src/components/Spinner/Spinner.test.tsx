import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";
import { describe, it, expect } from "vitest";

describe("Spinner Component", () => {
  it("should render the spinner in the document", () => {
    render(<Spinner />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("should render the text if provided", () => {
    const testText = "Loading...";
    render(<Spinner text={testText} />);

    const textElement = screen.getByTestId("spinner-text");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent(testText);
  });

  it("should not render the text if not provided", () => {
    render(<Spinner />);

    const textElement = screen.queryByTestId("spinner-text");
    expect(textElement).not.toBeInTheDocument();
  });
});
