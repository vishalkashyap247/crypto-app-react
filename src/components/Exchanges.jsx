import React, {useEffect, useState} from "react";
import { Button, Container, HStack } from "@chakra-ui/react";
import axios from "axios";
import { server } from "../index";
import ExchangeCard from "./ExchangeCard";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  const [exchanges , setExchanges] = useState([]);
  const [loading , setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const btns = new Array(6).fill(1);

  const changePage = (page) =>{
    setPage(page);
    setLoading(true);
  }

  const handleSamePage = (event) =>(event.preventDefault());//for handling same page

  useEffect(() => {
    const fetchExchanges = async () =>{
    try {
        const { data } = await axios.get(`${server}/exchanges?page=${page}`);
        // console.log(data);
        setExchanges(data);
        setLoading(false);
      }
      catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchExchanges();
  }, [page]);
  if(error){
    return (<ErrorComponent message={"Error while fetching exchanges"}/>)
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (<Loader />):(<>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
        {
          exchanges.map((i)=>(
            <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
          ))
        }
      </HStack>
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

export default Exchanges