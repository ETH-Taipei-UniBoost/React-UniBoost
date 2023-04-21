import { FC } from "react"
import { Button, List, ListItem, Text } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"

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
  return (
    <ListItem>
      <NavLink to={to}>
        <Button
          px="2"
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