import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const Home = () => {
  return (
    <Flex justify={'center'} align={'center'} flexGrow={1} flexDirection={'column'}>
      <Box textAlign={'center'}>
        <Heading fontSize={64} fontWeight={700} lineHeight={'77px'} mb={4}>UniBoost</Heading>
        <Text color="#888888" fontSize={24} lineHeight={'28px'} w={500} mb={10} fontWeight={300}>
          A permissionless liquidity boosting protocol specifically for <Text display={'inline'} color="teal.500" fontWeight={600}>Uniswap V2 and V3</Text> with insurance protection.
        </Text>
        <ButtonGroup spacing={4}>
          <Button size={'lg'} colorScheme='gray'>GitHub</Button>
          <Button size={'lg'} colorScheme='teal' rightIcon={<ChevronRightIcon />}>Connect Wallet</Button>
        </ButtonGroup>
      </Box >
    </Flex>
  )
}

export default Home