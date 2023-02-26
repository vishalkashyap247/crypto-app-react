import { Avatar, Box, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.700"} minH={"48"} px={"16"} py={["16","8"]}>
        <Stack direction={["column","row"]} h={"full"} alignItems={"center"}>
            <VStack w={"full"} alignItems={["center","flex-start"]}>
                <Text fontWeight={"bold"}>About Us</Text>
                <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center", "left"]}>We are the best crypto info app in India, we provide our guidance at a very resonable price. Feel free to connect with us.</Text>
            </VStack>
            <VStack css={{"&:hover":{transform:"scale(1.1)"}}} transition={"all 0.3s"} >
                <Avatar boxSize={"28"} mt={["4","0"]} src={"./myImg.jpg"} />
                <Text>Our Founder</Text>
            </VStack>  
        </Stack>
        <HStack alignItems={"center"} justifyContent={"center"} mt={"3"}>
          <a href={"https://www.linkedin.com/in/vishal-kashyap-447a451ba"} target={"blank"}><i class="fa-brands fa-linkedin fa-lg"></i></a>
          <a href={"https://github.com/vishalkashyap247"} target={"blank"}><i class="fa-brands fa-github fa-lg"></i></a>
        </HStack>
        <HStack justifyContent={"center"} my={"5"}>
          <p>{year} &#x24B8; Vishal Kashyap</p>
        </HStack>
    </Box>
  )
}

export default Footer