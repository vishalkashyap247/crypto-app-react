import React from 'react'
import {VStack, Image, Text, Heading} from "@chakra-ui/react"
import { Link } from 'react-router-dom';


const CoinCard = ({id, name, img, symbol, price, currencySymbol="₹"}) => {
  return (
    <Link to={`/coin/${id}`}>
        <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"8"} transition={"all 0.3s"} margin={"4"} css={{"&:hover":{
          transform:"scale(1.1)"
        }}}>
        <Image src={img} w={"10"} h={"10"} objectfit={"contain"} alt={"Exchange"} />
        <Heading size={"md"} noOfLines={1} >
            {symbol}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price?`${currencySymbol} ${price}`:"NA"}</Text>
        </VStack>
    </Link>
  )
}

export default CoinCard;