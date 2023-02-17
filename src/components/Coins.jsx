import React, {useEffect, useState} from "react";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import axios from "axios";
import { server } from "../index";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins , setCoins] = useState([]);
  const [loading , setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = currency ==="inr"?"₹":currency==="eur"?"€":"$";
  const changePage = (page) =>{
    setPage(page);
    setLoading(true);
  }

  const handleSamePage = (event) =>(event.preventDefault());//for handling same page

  const btns = new Array(130).fill(1);

  useEffect(() => {
    const fetchCoins = async () =>{
    try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false);
      }
      catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoins();
  }, [currency, page]);
  
  if(error){
    return (<ErrorComponent message={"Error while fetching coins"}/>)
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (<Loader />):(<>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
        {
          coins.map((i)=>(
            <CoinCard key={i.id}
            id={i.id}
            name={i.name}
            price={i.current_price}
            img={i.image}
            url={i.url}
            symbol={i.symbol}
            currencySymbol={currencySymbol}
            />
          ))
        }
      </HStack>
      <RadioGroup value={currency} onChange={setCurrency}>  {/* automically save the value into function chakra ui function */}
        <HStack spacing={"6"} p={"8"}>
          <Radio value={"inr"}>INR ₹</Radio>
          <Radio value={"eur"}>EUR €</Radio>
          <Radio value={"usd"}>USD $</Radio>
        </HStack>
      </RadioGroup>
      <HStack px={"8"} justifyContent={"center"}><p>Page {page} of 130</p></HStack>
      <HStack w={"full"} overflowX={"auto"} p={"8"}>
        
        {
          btns.map((item, index)=>(
            <Button key={index} bgColor={(index+1 === page)?"red":"blackAlpha.900"} color={"white"} onClick={()=>index+1===page ? handleSamePage():changePage(index+1) }>{index+1}</Button>
          ))
        }
      </HStack>
      </>)}
    </Container>
    )
}

export default Coins