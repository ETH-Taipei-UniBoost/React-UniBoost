import { useToast } from '@chakra-ui/react'
import React, { ReactNode, useId } from 'react'

const useTeaToast = () => {
  const id = useId()
  const toast = useToast({
    position: 'top',
    duration: 2000,
    isClosable: true,
    containerStyle: {
      mt: 10
    },
    id: id
  })

  const successToast = (title: string) => {
    toast({
      title,
      status: 'success'
    })
  }
  const errorToast = (title: ReactNode) => {
    toast({
      title,
      status: 'error'
    })
  }
  const canToast = !toast.isActive(id)

  return {
    canToast,
    successToast,
    errorToast
  }
}

export default useTeaToast