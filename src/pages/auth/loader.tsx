import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';

interface LoadingProps {
  size?: string;
  color?: string;
}

const Loader: React.FC<LoadingProps> = ({ size = 'xl', color = 'blue.500' }) => {
  return (
    <Center h="100vh">
      <Spinner size={size} color={color} thickness="4px" speed="0.65s" emptyColor="gray.200" />
    </Center>
  );
};

export default Loader;  