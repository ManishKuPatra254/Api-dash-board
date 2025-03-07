import { Fragment } from "react/jsx-runtime";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardRoot,
  HStack,
} from "@chakra-ui/react";
import { Avatar } from "./components/ui/avatar";
import { Button } from "./components/ui/button";

function App() {
  return (
    <Fragment>
      <HStack wrap="wrap" gap="6" p={3}>
        <Button variant="solid">Solid</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="surface">Surface</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="plain">Plain</Button>
      </HStack>

      <Box p={3}>
        <CardRoot width="320px" p={3}>
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
            <Button variant="outline">View</Button>
            <Button>Join</Button>
          </CardFooter>
        </CardRoot>
      </Box>
    </Fragment>
  );
}

export default App;
