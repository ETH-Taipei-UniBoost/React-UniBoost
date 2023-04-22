import { Box } from "@chakra-ui/react";
import useIsPrivatePage from "../hooks/useIsPrivatePage";

export default function Pools() {
  useIsPrivatePage(true)
  return (
    <Box>
      Pools
    </Box>
  )
}
