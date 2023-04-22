import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Flex, Grid, GridItem, VStack } from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"

export default function RootLayout() {
  const pathname = useLocation().pathname

  const isHome = pathname === '/'
  return (
    <Grid templateColumns={'240px repeat(5, 1fr)'}>
      <GridItem
        as="aside"
        colSpan={{ base: isHome ? 0 : 6, lg: isHome ? 0 : 1 }}
        bg='tea.300'
        px={{ base: '12px', lg: '20px' }}
        py={{ base: '24px', lg: '36px' }}
        display={isHome ? 'none' : 'unset '}
      >
        <Sidebar />
      </GridItem>
      <GridItem
        as="main"
        colSpan={{ base: 6, lg: isHome ? 6 : 5 }}
        bg='tea.100'
        minHeight='100vh'
      >
        <Flex flexDir={'column'} minH={'100vh'}>
          <Navbar />
          <Outlet />
        </Flex>
      </GridItem>
    </Grid>
  )
}
