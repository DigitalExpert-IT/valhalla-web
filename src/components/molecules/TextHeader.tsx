import { Box, Button, Flex, Heading, Highlight, Text } from '@chakra-ui/react'
import React from 'react'

export const TextHeader = () => {
  return (
    <Flex w={'full'} alignItems={'center'} justifyContent={'center'} color={'white'} >
      <Box maxW={'3xl'}>
        <Heading my={'8'}>
          <Highlight query='Decentralized' styles={{ px: '1', py: '1', color: '#00C4F4' }}>
            No 1 Decentralized Web3 Network Marketing Platform
          </Highlight>
        </Heading>
        <Text>
          Global network aims to revolutionize the market of network marketing by decentralized millions of users to web3 application. Every application and utility will be build upon decentralized network marketing referral  contract. Get royalty from referral sales up to 100 levels.
        </Text>
        <Box my={4}>
          <Button 
            borderRadius={'full'} 
            bg={'purple.600'}
            px={8}
            mx={4}
          >
            Register
          </Button>
          <Button 
            borderRadius={'full'} 
            bgGradient='linear(to-r, pink.500, purple.500, blue.400)'
            px={8}
            mx={4}
          >
            Telegram
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}
