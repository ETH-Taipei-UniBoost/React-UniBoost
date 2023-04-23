import { Box, Button, Flex, HStack, Heading, Spacer, Tooltip, useToast } from "@chakra-ui/react"
import GnosisIcon from "../assets/GnosisIcon"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { copyToClipboard, getCroppedStringIfAddress } from "../utils/utils"
import { useState } from "react"

const Navbar = () => {
  const { connect, connectors } = useConnect()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()

  const connectWallet = () => {
    connect({ connector: connectors[0], chainId: 10200 })
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex as='nav' p='12px 20px' align="center" bg={'tea.200'}>
      <HStack spacing={'8px'}>
        <Box w={'40px'} h={'40px'} color={'tea.400'}>
          {/* <GnosisIcon /> */}
          <img src="/UniBoost-logo.png" alt="uniboost" width={36} height={36} />
        </Box>
        <Heading size={'lg'}>UniBoost</Heading>
      </HStack>

      <Spacer />

      <HStack spacing={'12px'}>
        {isConnected && address
          ? <>
            <Tooltip label="click to copy" hasArrow openDelay={500}>
              <Button colorScheme="teal" onClick={() => { copyToClipboard(address) }} >
                {getCroppedStringIfAddress(address)}
              </Button>
            </Tooltip>

            <Button colorScheme="teal" onClick={() => { disconnect() }} >
              Disconnect
            </Button>
          </>
          : <Button colorScheme="teal" onClick={connectWallet} >
            Connect
          </Button>}
      </HStack>
    </Flex >
  )
}

export default Navbar