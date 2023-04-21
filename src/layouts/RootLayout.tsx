import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Grid, GridItem } from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"

export default function RootLayout() {
  return (
    <Grid templateColumns={'240px repeat(5, 1fr)'}>
      <GridItem
        as="aside"
        colSpan={{ base: 6, lg: 1, xl: 1 }}
        bg='tea.300'
        px={{ base: '12px', lg: '20px' }}
        py={{ base: '24px', lg: '36px' }}
      >
        <Sidebar />
      </GridItem>
      <GridItem
        as="main"
        colSpan={{ base: 6, lg: 5, xl: 5 }}
        bg='tea.100'
        minHeight='100vh'
      >
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  )
}
