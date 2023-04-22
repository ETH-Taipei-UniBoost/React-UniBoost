import { useState } from 'react';
import { FormCard } from './FormCard'
import FormInput from './FormInput'

const EnableBoostForm = () => {
  const [input, setInput] = useState<Input>({
    pool: '',
    boostAmount: '',
    insuranceAmount: '',
    liquidationPrice: '',
    rate: '',
    endTime: '',
  });

  return (
    <FormCard title='Enable Boost'>
      <FormInput
        title='Pool: '
        value={input.pool}
        onTextChange={() => { }}
      />
      <FormInput
        title='Boost Amount: '
        value={input.boostAmount}
        onTextChange={() => { }}
      />
      <FormInput
        title='Insurance Amount: '
        value={input.insuranceAmount}
        onTextChange={() => { }}
      />
      <FormInput
        title='Insurance Trigger Price In Tick: '
        value={input.liquidationPrice}
        onTextChange={() => { }}
      />
      <FormInput
        title='Boost Rate: '
        value={input.rate}
        onTextChange={() => { }}
      />
      <FormInput
        title='Boost End Time: '
        value={input.endTime}
        onTextChange={() => { }}
      />
    </FormCard>
  )
}

export default EnableBoostForm

interface Input {
  pool: string
  boostAmount: string
  insuranceAmount: string
  liquidationPrice: string
  rate: string
  endTime: string
}