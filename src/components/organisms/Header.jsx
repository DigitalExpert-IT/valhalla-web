import React from 'react'
import {Box, Flex, Spacer} from '@chakra-ui/react'
import { Globes, TextHeader } from 'components/';


export const Header = () => {

  return (
    <Box>
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
