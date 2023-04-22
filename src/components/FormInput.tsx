import { FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react'
import React, { FC } from 'react'

interface Prop {
  title: string
  helper?: string
  value: string
  type?: string
  onTextChange: (t: string) => void
}

const FormInput: FC<Prop> = ({ type, helper, title, value, onTextChange }) => {

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target.value
    onTextChange(t)
  }

  return (
    <FormControl isRequired mb={"16px"}>
      <FormLabel mb={1}>{title}</FormLabel>
      <Input size={'sm'} type={type ?? 'number'} name="title" value={value} onChange={onChange} />
      {helper && <FormHelperText mt={1}>{helper}</FormHelperText>}
    </FormControl>
  )
}

export default FormInput