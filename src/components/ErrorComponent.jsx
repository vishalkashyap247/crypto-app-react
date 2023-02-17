import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <Alert status="error" position={"fixed"} bottom={"5"} left={"50%"} transform={"translateX(-50%)"} w={"lg"}>
      <AlertIcon />
      {message}
    </Alert>
  )
}

export default ErrorComponent;