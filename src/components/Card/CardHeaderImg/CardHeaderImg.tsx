import { Box, Card, CardBody, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import React from 'react'

export const CardHeaderImg = () => {
  return (
    <Flex w={'full'} justifyContent={'center'} alignItems={'center'} my={4}>
      <Card zIndex={2} minW={{ md:'md' }} maxW={'md'} w={'full'} bg={'purple.600'}>
        <CardBody p={3}>
          <Grid templateColumns='repeat(2, 1fr)' gap={'2.5'} rounded={'lg'} overflow={'hidden'}>
            <GridItem maxH={180} overflow={'hidden'} colSpan={1} rowSpan={1} bg={'red.600'}>
              <Image
                src='https://s3-alpha-sig.figma.com/img/f5ba/c1c0/50bcf82f7ee0c08f80ba2e2b1e477476?Expires=1672617600&Signature=IM1C14R14muno9X4SjJa15bSaFropyDIF0GzIK4wnOdUhD~UEy1K-zUWbmIQeiWINudqikgNJMmEY6st1fszkoCGcYeq60-laDslF2umcJgluSCkbARVTgmriZ175tVpvL65yxjmQxrWB6PKkgKStxFPq8mTPaj4O5F3SiF~IYgwzZcRJ5wHAd1eTnKnu6F8UlQr9SEAFw7QzEMvbwMES7jXg2ZVv4vhhrcstBsaCQkJqFFy1POj3PSDhHL-KJXjeFGuvmfUXdogl4yTaG6yU1uehY-~3VYp3c4qE2Yd7t-Ujpxd1T66CaE0TGeZZ4YjpRcl1roonim85NGWMuMVuQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                alt='Dan Abramov'
                maxW={'full'} h={'full'} w={'full'} objectFit={'cover'}
              />
            </GridItem>
            <GridItem maxH={180} overflow={'hidden'} colSpan={1} rowSpan={1} bg={'red.600'}>
              <Image
                src='https://s3-alpha-sig.figma.com/img/c1a5/c209/1fd3e50bd472802458ec2ecce49476b9?Expires=1672617600&Signature=Nhs1W7AfThGmpHn7MBDJ6s3lXbS5L3c-fZjboe0G-X4f2R8EePlLd8bGXmMneaqCFCkaNdPCQ4yIB5otP896~OLO7i5N~aMxh1bDZk2hsbvhbB2HMctK8S2lDWHf~meIreswWxyAU5qdOA73qRoVmhGkbxzlGU4TWbMyxB-JlaJlL5nTTMfjXW~XnkLApg88tEoUqnmUsP0rSoWlwK-Ic64FElkwO~KKTjzu6V9DhXVqAixA1H4aoK-gKZqi10zx0zpugShaLmoJ0djxfdr23xT1Om1o1A-J74zVvmS~VK~3iXotMWcr1VUCII8oVbjd3gWtYZZswPFg9YoNrt22sw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                alt='Dan Abramov'
                maxW={'full'} h={'full'} w={'full'} objectFit={'cover'}
              />
            </GridItem>
            <GridItem maxH={180} overflow={'hidden'} colSpan={1} rowSpan={1} bg={'red.600'}>
              <Image
                src='https://s3-alpha-sig.figma.com/img/781e/51ca/b1ca7a5c2b86eb807d4fc1cc2cf3d84f?Expires=1672617600&Signature=WI8VH3La2CUCAxpyVbb1cjDyHqFUKCb-J0MSd4xTDV0Ci6XDp1~Ce11AL-l9-xocFvg-PNb64MoARZA3FNm5ee39Y7MwHRT5uBqPu~5-J3Fb57yOwvQQicTvYUaLlUmiiDtHiVxw3lVg2MziaZfgUE54hmAAyxfEITQQCcY5tuQiyKY8PS4i1MMvGeslMnFJnooupNEbqD5B7Ycsr2UKrV2p-TQtE45JHuZCB5dVtls5H1kO5hIAxWDoo7Knk1F2eKfuEiwij8C~Is3MoLiHnhFnMZn6CRo8xPvwp1mdBuAyDYLWQG3sW6tsjVBEosFhYsAUm37TLcFUpL31yNSHJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                alt='Dan Abramov'
                maxW={'full'} h={'full'} w={'full'} objectFit={'cover'}
              />
            </GridItem>
            <GridItem maxH={180} overflow={'hidden'} colSpan={1} rowSpan={1} bg={'red.600'}>
              <Image
                src='https://s3-alpha-sig.figma.com/img/18b6/fac6/318fb25563fa90e9dd5a633f23bd8a84?Expires=1672617600&Signature=kNW7Emi0iH97dn0jE3WdlBPUu6KxnPAXFHxEHIfIr4EywYGz9dK9NFCBVcoQXNgLsUKc3B5yLa9CoEBdTh2R5zvfydqwAWQu-yti9nlwkqy2Xqxsgsh9nX3X83AvjI8NnAoNS34zB86Xh-0oQqaEqfaGcjZ~6b-kooa4uZvhC05de1SHXlYDzb7NuRq-yWn1JJ~DjH58NurWWOG-7mH3Ulegf6Npw5MCy3Id9hchXiTkMk~VZ1dWXGf3rqws8xQx1y2oHyDLvP9A9JNrCXdcdJzNW5nx6tKIaPMg17gTm5mbZNs~fF8T9HQbqnzavzXwq~h80kMGTLgzSqDZJ~1tfw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                alt='Dan Abramov'
                maxW={'full'} h={'full'} w={'full'} objectFit={'cover'}
              />
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </Flex>
  )
}
