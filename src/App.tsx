import { Fragment } from "react/jsx-runtime";
import { Button, HStack } from "@chakra-ui/react";

function App() {
  return (
    <Fragment>
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
    </Fragment>
  );
}

export default App;
