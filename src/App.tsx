import { Fragment } from "react/jsx-runtime";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardRoot,
  HStack,
} from "@chakra-ui/react";
import { Avatar } from "./components/ui/avatar";

function App() {
  return (
    <Fragment>
      <HStack style={{ padding: "10px" }}>
        <Button style={{ padding: "10px" }}>Click me</Button>
        <Button style={{ padding: "10px" }}>Click me</Button>
      </HStack>

      <CardRoot width="320px" style={{ padding: "10px" }}>
        <CardBody gap={2}>
          <Avatar
            src="https://picsum.photos/200/300"
            name="Nue Camp"
            size="lg"
            shape="rounded"
          />
          <Card.Title mt="2">Nue Camp</Card.Title>
          <Card.Description>
            This is the card body. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
            Curabitur nec odio vel dui euismod fermentum.
          </Card.Description>
        </CardBody>
        <CardFooter justifyContent="flex-end">
          <Button variant="outline" style={{ padding: "10px" }}>
            View
          </Button>
          <Button style={{ padding: "10px" }}>Join</Button>
        </CardFooter>
      </CardRoot>
    </Fragment>
  );
}

export default App;
