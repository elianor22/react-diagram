import { render } from "@testing-library/react";
import App from "src/App";
describe("<App/>", () => {
  it("Should Render component Resizer", () => {
    const container = render(<App />);

    expect(container).toBeInTheDocument();
  });
});
