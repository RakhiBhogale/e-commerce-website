import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchtoCart, removeItem } from "../../Redux/product/action";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Text,
  Heading,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Navigate, useNavigate } from "react-router";
import { Topnavbar } from "../Navbar/Topnavbar";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);

  // Maintain quantity of each cart item locally
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0)

  // useEffect(() => {
  //   dispatch(fetchtoCart());

  //   // Initialize quantities with current cart items
  //   const initialQuantities = {};
  //   cart.forEach((item) => {
  //     initialQuantities[item._id] = item.quantity || 1; // Default to 1 if not provided
  //   });
  //   setQuantities(initialQuantities);
  // }, [dispatch, cart.length]);
  // useEffect(() => {
  //   dispatch(fetchtoCart()).then((response) => {
  //     console.log("Fetched Cart Data:", response);
  //   });
  // }, [dispatch]);
  
  // useEffect(() => {
  //   dispatch(fetchtoCart());
  //   const initialQuantities = {};
  //   cart.forEach((item) => {
  //     if (item && item._id) {
  //       initialQuantities[item._id] = item.quantity || 1;
  //     }
  //   });
  //   setQuantities(initialQuantities);
  // }, [dispatch, cart]);
  const handleTotal = () => {
    const total = cart.reduce((acc, item) => {
      const quantity = quantities[item.id] || 1;
      return acc + quantity * Math.floor(item.price - (10 * item.price) / 100);
    }, 0);

    console.log(total);
    

    setTotal(total)
  }

  useEffect(() => handleTotal )
  
  const handleDelete = (id) => {
    dispatch({type: "REMOVE_TO_CART", payload: id});
  };

  const incrementQuantity = (id) => {    
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));

    handleTotal();
  };

    const decrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] > 1 ? prevQuantities[id] - 1 : 1,
    }));

    handleTotal()
  };

  // Calculate total price and savings
  
  // const total = (cart || []).reduce((acc, item) => {
  //   if (item && item._id) {
  //     const quantity = quantities[item._id] || 1;
  //     return acc + quantity * Math.floor(item.price - (10 * item.price) / 100);
  //   }
  //   return acc;
  // }, 0);
  

  const saved = cart.reduce((acc, item) => {
    const quantity = quantities[item._id] || 1;
    return (
      acc + quantity * (Math.floor(item.price) - Math.floor(item.price - (10 * item.price) / 100))
    );
  }, 0);

  return (
    <Box width="100%">
      <Topnavbar />
      <Box width="75%" m={"auto"}>
        <Box width="100%" margin="auto" p="1rem" mt="1.5rem" border="1px solid #e8e8e8">
          <Text fontSize={"24px"} textAlign={"left"} fontWeight={300} pb={"6px"}>
            YOUR BASKET {cart.length}
          </Text>
          <TableContainer width="99%">
            <Table variant="simple">
              <Thead width="99%">
                <Tr bg={"#555555"} color={"white"}>
                  <Th color={"white"}>ITEM DESCRIPTION</Th>
                  <Th color={"white"}>UNIT PRICE</Th>
                  <Th color={"white"}>QUANTITY</Th>
                  <Th color={"white"}>SUBTOTAL</Th>
                  <Th color={"#555555"}>Actions</Th>
                  <Th color={"black"} bg={"#c6cc74"}>Saving</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cart?.map((item) => {
                  console.log(item);
                  
                  const itemId = item.id;
                  const quantity = quantities[itemId] || 1;
                  const discountedPrice = Math.floor(item.price - (10 * item.price) / 100);
                  return (
                    <Tr key={itemId} fontSize={"12px"}>
                      <Td>{item.brand}<br />{item.title}</Td>
                      <Td>Rs {discountedPrice}</Td>
                      <Td>
                        <Button variant={"outline"} onClick={() => decrementQuantity(itemId)}>-</Button>
                        <Button variant={"outline"}>{quantity}</Button>
                        <Button variant={"outline"} onClick={() => incrementQuantity(itemId)}>+</Button>
                      </Td>
                      <Td>Rs {discountedPrice * quantity}</Td>
                      <Td><CloseIcon onClick={() => handleDelete(itemId)} /></Td>
                      <Td>Rs {Math.floor(item.price - discountedPrice) * quantity}</Td>
                    </Tr>
                  );
                })}
                {/* {cart?.map((item) => {
  if (!item || !item._id) return null;
  const itemId = item._id;
  const quantity = quantities[itemId] || 1;
  const discountedPrice = Math.floor(item.price - (10 * item.price) / 100);
  return (
    <Tr key={itemId} fontSize={"12px"}>
      <Td>{item.brand}<br />{item.title}</Td>
      <Td>Rs {discountedPrice}</Td>
      <Td>
        <Button variant={"outline"} onClick={() => decrementQuantity(itemId)}>-</Button>
        <Button variant={"outline"}>{quantity}</Button>
        <Button variant={"outline"} onClick={() => incrementQuantity(itemId)}>+</Button>
      </Td>
      <Td>Rs {discountedPrice * quantity}</Td>
      <Td><CloseIcon onClick={() => handleDelete(itemId)} /></Td>
      <Td>Rs {Math.floor(item.price - discountedPrice) * quantity}</Td>
    </Tr>
  );
})} */}

              </Tbody>
            </Table>
          </TableContainer>

          {/* Summary Section */}
          <Flex justifyContent={"space-between"} mt={8}>
            <Box width={"45%"}>
              <Button variant={"outline"} onClick={() => navigate("/product")}>Continue Shopping</Button>
            </Box>
            <Box width={"45%"} border="1px solid #e8e8e8 ">
              <Flex justifyContent={"space-between"} p="1rem" fontSize="14px" fontWeight={400}>
                <Box>
                  <Text>SubTotal</Text>
                  <Text>Delivery Charges</Text>
                </Box>
                <Box>
                  <Text>Rs {total}</Text>
                  <Text>Free</Text>
                </Box>
                <Box color="red" pl="2px">
                  <Text>You saved!</Text>
                  <Text>Rs {saved}</Text>
                </Box>
              </Flex>
              <Flex textAlign={"left"} border={"1px solid #e8e8e8"} padding="2rem" justify={"space-around"}>
                <Heading as={"h6"}>TOTAL</Heading>
                <Heading as={"h6"}>Rs {total}</Heading>
              </Flex>
              <Box float={"right"}>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    if (cart.length !== 0) {
                      navigate("/checkout");
                    } else {
                      alert("Your Cart is Empty!");
                    }
                  }}
                >
                  Checkout
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
