import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Toggle password visibility
  const handleClick = () => setShow(!show);

  // Form submission handler
  const submitHandler = async () => {
      // Input validations
      if (!name || !email || !phone || !password || !confirmPassword) {
          toast({
              title: "All fields are required.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
          });
          return;
      }

      // Validate phone number (basic 10-digit validation)
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(phone)) {
          toast({
              title: "Invalid phone number. Must be 10 digits.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
          });
          return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
          toast({
              title: "Passwords do not match.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
          });
          return;
      }

      // Password strength validation
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordPattern.test(password)) {
          toast({
              title: "Password must be at least 8 characters with uppercase, lowercase, and a number.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
          });
          return;
      }

      setLoading(true);

      try {
          // Axios POST request to your registration API
          const config = {
              headers: { "Content-type": "application/json" },
          };
          await axios.post(
              "https://web-production-ae8c.up.railway.app/register",
              { name, email, phone, password },
              config
          );

          toast({
              title: "Registration Successful",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
          });

          // Reset form fields
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setConfirmPassword("");
      } catch (error) {
          console.error(error.message);
          toast({
              title: error.response?.data?.message || "Registration failed",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
          });
      } finally {
          setLoading(false);
      }
  };

  return (
      <VStack spacing={"5px"} width="100%">
          {/* Name Input */}
          <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
          </FormControl>

          {/* Email Input */}
          <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
          </FormControl>

          {/* Phone Number Input */}
          <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength="10"
              />
          </FormControl>

          {/* Password Input */}
          <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                  <Input
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick} bg="#84c225">
                          {show ? "Hide" : "Show"}
                      </Button>
                  </InputRightElement>
              </InputGroup>
          </FormControl>

          {/* Confirm Password Input */}
          <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                  <Input
                      type={show ? "text" : "password"}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick} bg="#84c225">
                          {show ? "Hide" : "Show"}
                      </Button>
                  </InputRightElement>
              </InputGroup>
          </FormControl>

          {/* Submit Button */}
          <Button
              width="100%"
              bg="#84c225"
              color="white"
              onClick={submitHandler}
              isLoading={loading}
          >
              Sign Up
          </Button>
      </VStack>
  );
};

export default SignUp;
