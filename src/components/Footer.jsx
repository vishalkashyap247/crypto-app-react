import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.700"} minH={"48"} px={"16"} py={["16","8"]}>
        <Stack direction={["column","row"]} h={"full"} alignItems={"center"}>
            <VStack w={"full"} alignItems={["center","flex-start"]}>
                <Text fontWeight={"bold"}>About Us</Text>
                <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center", "left"]}>We are the best crypto info app in India, we provide our guidance at a very resonable price. Feel free to connect with us.</Text>
            </VStack>
            <a href={"https://github.com/vishalkashyap247"} target={"blank"}>
            <VStack css={{"&:hover":{transform:"scale(1.1)"}}} transition={"all 0.3s"} title="Vishal Kashyap @ GitHub">
                <Avatar boxSize={"28"} mt={["4","0"]} src='https://raw.githubusercontent.com/vishalkashyap247/my-portfolio-ReactJS/main/public/me.jpg' />
                <Text>Our Founder</Text>
            </VStack>
            </a>

        </Stack>
    </Box>
  )
}

export default Footer