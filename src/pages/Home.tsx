import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Heading, Link, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount, useConnect } from 'wagmi'
import GitHubIcon from '../assets/GitHubIcon'

const Home = () => {
  const { connect, connectors } = useConnect()
  const connectWallet = () => {
    connect({ connector: connectors[0], chainId: 10200 })
  }
  const { address } = useAccount()
  const navigate = useNavigate()
  useEffect(() => {
    if (address) navigate('/pools')
  }, [address])
  return (
    <Flex justify={'center'} align={'center'} flexGrow={1} flexDirection={'column'}>
      <Box textAlign={'center'}>
        <Heading fontSize={64} fontWeight={700} lineHeight={'77px'} mb={4}>UniBoost</Heading>
        <Text color="#888888" fontSize={24} lineHeight={'28px'} w={420} mb={10} fontWeight={300}>
          A permissionless liquidity boosting protocol specifically for <span style={{ color: '#319795', fontWeight: 600 }}>Uniswap V3</span> with insurance protection.
        </Text>
        <ButtonGroup spacing={4}>
          <Link href='https://github.com/ETH-Taipei-UniBoost' target='_blank'>
            <Button size={'lg'} colorScheme='gray' leftIcon={<GitHubIcon style={{ fontSize: 28 }} />}>
              GitHub
            </Button>
          </Link>
          <Button size={'lg'} colorScheme='teal' rightIcon={<ChevronRightIcon />} onClick={connectWallet}>
            Connect Wallet
          </Button>
        </ButtonGroup>
      </Box >
    </Flex>
  )
}

export default Home