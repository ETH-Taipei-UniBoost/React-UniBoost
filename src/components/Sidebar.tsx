import { FC } from "react"
import { Button, List, ListItem, Text } from "@chakra-ui/react"
import { NavLink, useLocation } from "react-router-dom"

const Sidebar = () => {
  return (
    <List color="tea.500" fontSize={'1.2em'} spacing={4}>
      <NavButton to="/pools" title="Pools" />
      <NavButton to="/staked" title="Staked Positions" />
      <NavButton to="/boost" title="Boost Pools" />
    </List>
  )
}

export default Sidebar


interface NavButtonProp {
  to: string
  title: string
}

const NavButton: FC<NavButtonProp> = ({ to, title }) => {
  const pathname = useLocation().pathname
  return (
    <ListItem
      bg={pathname === to ? 'tea.400' : 'tea.300'}
      color={pathname === to ? 'tea.200' : 'tea.500'}
      borderRadius={'md'}
    >
      <NavLink to={to}>
        <Button
          px="3"
          w="100%"
          textAlign={'left'}
          variant={'unstyled'}
          _hover={{ boxShadow: 'md' }}
          _active={{ boxShadow: 'base' }}
        >
          <Text>{title}</Text>
        </Button>
      </NavLink>
    </ListItem>
  )
}