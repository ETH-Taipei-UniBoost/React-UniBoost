import { UnlockIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, HStack, Heading, Spacer, useToast } from "@chakra-ui/react"
import GnosisIcon from "../assets/GnosisIcon"

const Navbar = () => {
  const toast = useToast()

  const showToast = () => {
    toast({
      title: 'Logged out',
      description: 'Successfully logged out',
      duration: 5000,
      isClosable: true,
      status: 'success',
      position: 'top',
      icon: <UnlockIcon />
    })
  }

  return (
    <Flex as='nav' p='12px 20px' align="center" bg={'tea.200'}>
      <HStack spacing={'8px'}>
        <Box w={'40px'} h={'40px'} color={'tea.400'}>
          <GnosisIcon />
        </Box>
        <Heading size={'lg'}>UniBoost</Heading>
      </HStack>

      <Spacer />

      <HStack spacing={'12px'}>
        <Button colorScheme="teal" onClick={showToast}>Connect</Button>
      </HStack>
    </Flex>
  )
}

export default Navbar