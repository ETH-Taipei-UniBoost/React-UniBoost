import { Box } from "@chakra-ui/react";
import useIsPrivatePage from "../hooks/useIsPrivatePage";

export default function Staked() {
  useIsPrivatePage(true)
  return (
    <Box>
      Staked
    </Box>
  )
}
