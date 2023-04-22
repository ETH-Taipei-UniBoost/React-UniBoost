import { FormControl, FormLabel, Input, FormHelperText, Button, Box } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import useIsPrivatePage from "../hooks/useIsPrivatePage";

export default function Boost() {
  useIsPrivatePage(true)
  return (
    <Box maxW={'480px'}>
      <Form>
        <FormControl isRequired mb={"40px"}>
          <FormLabel mb={1}>Reward Token:</FormLabel>
          <Input size={'sm'} type="text" name="title" />
          <FormHelperText mt={1}>Enter the reward token address</FormHelperText>
        </FormControl>

        <Button colorScheme="purple" type="submit">Submit</Button>
      </Form>
    </Box>
  )
}
