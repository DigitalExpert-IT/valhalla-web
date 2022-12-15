import React from 'react'
import {Box, Flex, Spacer} from '@chakra-ui/react'
import { Globes, TextHeader } from 'components/molecules/';


export const Header = () => {

  return (
    <Box bg={'#21005D'}>
      <Flex 
        flexDirection={{base: 'column', lg: 'row'}}
        px={8}
      >
        <TextHeader />
        <Spacer/>
        <Globes />
      </Flex>
    </Box>
  )
}
