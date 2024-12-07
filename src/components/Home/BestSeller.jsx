import { Box, Text, Stack, Image, Flex, IconButton, useToast, Button } from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi"; // Import Plus and Minus Icons
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data } from "./img";
import "./home.css";

export const BestSeller = () => {
  const [cartItems, setCartItems] = useState({});
  const toast = useToast();
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.products.cart);


  // Function to handle incrementing the item count
  const incrementCount = (id) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [id]: (prevItems[id] || 0) + 1,
    }));
  };

  // Function to handle decrementing the item count
  const decrementCount = (id) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [id]: prevItems[id] > 0 ? prevItems[id] - 1 : 0,
    }));
  };

  const handleAddCart = (e) => {
    console.log(e);
    
    dispatch({type: "ADD_TO_CART", payload: e})

    if (cartItems[e.id] > 0) {      
      toast({
        title: `${e.title} added to cart (${cartItems[e.id]})`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log(cart);
      

    } else {
      toast({
        title: `Please select at least 1 item to add to cart.`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Stack width={"100%"}>
      <Flex flexWrap={"wrap"}>
        {data.map((e) => {
          
          return (
            <Box
              key={e.id}
              className="transition"
              role={"group"}
              p={6}
              width="20%"
              boxShadow={"md"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}
            >
              <Box
                rounded={"lg"}
                mt={-12}
                pos={"relative"}
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 5,
                  left: 0,
                  filter: "blur(15px)",
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: "blur(20px)",
                  },
                }}
              >
                <Image
                  rounded={"lg"}
                  height={230}
                  width={282}
                  objectFit={"contain"}
                  src={e.imgUrl}
                />
              </Box>
              <Stack textAlign={"left"} spacing={3}>
                <Text color={"gray.500"} fontSize={"sm"}>
                  {e.brand}
                </Text>
                <Text color={"black"} fontSize={"12px"}>
                  {e.title}
                </Text>
                <Stack direction={"row"} alignItems={"center"}>
                  <Text color={"black"} fontSize={"sm"}>
                    Rs {e.price}
                  </Text>
                  <Text
                    textDecoration={"line-through"}
                    fontSize={"sm"}
                    color={"black"}
                  >
                    <span className="linethrough">Mrp</span> {e.strikedPrice}
                  </Text>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <MdLocalShipping size={28} />
                  <Text fontSize={"sm"} color={"black"}>
                    {Math.floor(Math.random() * 7) + 1} business days delivery
                  </Text>
                </Stack>

                {/* Counter Buttons */}
                <Flex alignItems="center" justifyContent="center" gap="2">
                  <IconButton
                    aria-label="Decrease count"
                    icon={<FiMinus />}
                    size="sm"
                    onClick={() => decrementCount(e.id)}
                    isDisabled={!cartItems[e.id]}
                  />
                  <Text fontSize="md">{cartItems[e.id] || 0}</Text>
                  <IconButton
                    aria-label="Increase count"
                    icon={<FiPlus />}
                    size="sm"
                    onClick={() => incrementCount(e.id)}
                  />
                </Flex>

                <Button
                  bg="#84c225"
                  color="white"
                  _hover={{ bg: "#6ea019" }}
                  mt="2"
                  onClick={() => handleAddCart(e)}
                >
                  Add to Cart
                </Button>
              </Stack>
            </Box>
          );
        })}
      </Flex>
    </Stack>
  );
};
