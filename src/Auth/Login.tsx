import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Stack,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/auth.service";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    try {
      const response = await loginUser(formData);
      if (response && response.success === true) {
        alert("Login Successful");
        navigate("/dashboard");
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <Container maxW="container.xl" p={0}>
      <Flex h="100vh">
        {/* Left Image Section */}
        <Box flex="1" bg="cyan.50" display={{ base: "none", md: "block" }}>
          <Image
            src="/placeholder-image.png"
            alt="Login visual"
            objectFit="cover"
            h="full"
          />
        </Box>

        {/* Right Form Section */}
        <Flex flex="1" align="center" justify="center" p={{ base: 8, md: 16 }}>
          <Stack w="full" maxW="md">
            <Stack>
              <Heading size="lg">Sign in to Chakra</Heading>
              <Text color="gray.600">Start using Chakra in your projects</Text>
            </Stack>

            <Stack gap="4">
              <Input
                p={3}
                type="email"
                name="email"
                placeholder="Enter your email"
                size="xs"
                value={formData.email}
                onChange={handleLoginChange}
              />

              <Input
                p={3}
                type="password"
                name="password"
                placeholder="Enter your password"
                size="xs"
                value={formData.password}
                onChange={handleLoginChange}
              />

              <Button
                size="sm"
                w="full"
                type="button"
                onClick={handleLoginSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </Container>
  );
}
