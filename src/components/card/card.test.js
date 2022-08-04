import Card from "./card.component";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const mockMonster = {
    name: "jack",
    id: 1,
    email: "qq1111@gmail.com",
  };

  const tree = renderer.create(<Card monster={mockMonster} />).toJSON();
  expect(tree).toMatchSnapshot();
});
