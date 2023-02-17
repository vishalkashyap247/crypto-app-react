import {
  Badge,
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';
  const [days, setDays] = useState('24');
  const [chartArray, setChartArray] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        // console.log('data is : ', data);
        // console.log(chartData);
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id, currency, days]);

  if (error) {
    return <ErrorComponent message={'Error while fetching coin'} />;
  }

  const handleDayChange = event => {
    setDays(event.target.value);
    setLoading(true);
  };

  // const utcTimestamp = coin.market_data.last_updated;
  // const date = new Date(utcTimestamp);
  // const options = { timeZone: "Asia/Kolkata" };
  // const istTimestamp = date.toLocaleString("en-US", options);

  // console.log(istTimestamp); // Output: "2/15/2023, 4:03:07 PM"

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={'full'} borderWidth={1} p={"1"} mt={"4"}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>
          <Flex flexWrap="wrap" pt={"5"} px={["4","16"]}>
            <Box>
              <Select
                value={days}
                onChange={handleDayChange}
              >
                <option value={'1'}>last 24 hrs</option>
                <option value={'7'}>last 7 days</option>
                <option value={'15'}>last 15 days</option>
                <option value={'24'}>last 24 days</option>
                <option value={'30'}>last 30 days</option>
                <option value={'100'}>last 100 days</option>
                <option value={'365'}>last 1 yrs</option>
                <option value={'max'}>max</option>
              </Select>
            </Box>
            <Box m={"0"} p={"9px"}>
              <RadioGroup value={currency} onChange={setCurrency}>
                {/* automically save the value into function chakra ui function */}
                <HStack spacing={'6'}>
                  <Radio value={'inr'}>INR ₹</Radio>
                  <Radio value={'eur'}>EUR €</Radio>
                  <Radio value={'usd'}>USD $</Radio>
                </HStack>
              </RadioGroup>
            </Box>
          </Flex>

          <VStack spacing={'4'} p={["4","16"]} pt={'5'} alignItems={'flex-start'}>
            <Text fontSize={'small'} alignSelf="center" opacity={0.7}>
              Last Updated on{' '}
              {new Date(coin.market_data.last_updated).toLocaleString('en-US', {
                timeZone: 'Asia/Kolkata',
              })}
            </Text>

            <Image
              src={coin.image.large}
              w={'16'}
              h={'16'}
              objectFit={'contain'}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol} {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge
              fontSize={'2xl'}
              bgColor={'blackAlpha.800'}
              color={'white'}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar
              high={coin.market_data.high_24h[currency]}
              low={coin.market_data.low_24h[currency]}
              actual={coin.market_data.current_price[currency]}
              currency={currency}
            />

            <Box w={'full'} p="4">
              <Item title={'Max supply'} value={coin.market_data.max_supply} />
              <Item
                title={'Circulating supply'}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={'Market cap'}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={'All time low'}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={'All time high'}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

function CustomBar({ high, low, actual, currency }) {
  const ans = ((actual - low) / (high - low)) * 100;
  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

  return (
    <VStack w={'full'}>
      <Progress value={ans} colorScheme={'teal'} w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'}>
        <Badge children={`${currencySymbol}${low}`} colorScheme={'red'} />
        <Text fontSize={'sm'}>24hrs range</Text>
        <Badge children={`${currencySymbol}${high}`} colorScheme={'green'} />
      </HStack>
    </VStack>
  );
}

function Item({ title, value }) {
  return (
    <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
      {/* margin vertical 4 */}
      <Text letterSpacing={'widest'}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  );
}

export default CoinDetails;
