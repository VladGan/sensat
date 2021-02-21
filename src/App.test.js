import App from "./App";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders correctly react-test-renderer", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
