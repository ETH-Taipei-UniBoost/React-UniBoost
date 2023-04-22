import { VStack, Card, Button, TabPanel, Heading } from "@chakra-ui/react"
import { ReactNode, FC } from "react"
import { Form } from "react-router-dom"

interface FormCardProp {
  title?: string
  children: ReactNode
  onSubmit?: () => void
}

export const FormCard: FC<FormCardProp> = ({ title, children, onSubmit }) => {
  return (

    <VStack align={'center'}>
      <Card minW={'480px'} maxW={'600px'} p='20px 40px'>
        <Form onSubmit={onSubmit}>
          <Heading textAlign={'center'} fontSize={'2xl'} mb={2}>{title}</Heading>
          {children}
          <Button w={'100%'} colorScheme="teal" type="submit">Submit</Button>
        </Form>
      </Card>
    </VStack>
  )
}