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

  const updateInput = (field: Partial<Input>) => {
    setInput({ ...input, ...field })
  }

  return (
    <FormCard title='Enable Boost'>
      <FormInput
        title='Pool Address: '
        type='text'
        value={input.pool}
        onTextChange={(t) => updateInput({ pool: t })}
      />
      <FormInput
        title='Boost Amount: '
        value={input.boostAmount}
        onTextChange={(t) => updateInput({ boostAmount: t })}
      />
      <FormInput
        title='Insurance Amount: '
        value={input.insuranceAmount}
        onTextChange={(t) => updateInput({ insuranceAmount: t })}
      />
      <FormInput
        title='Insurance Trigger Price In Tick: '
        value={input.liquidationPrice}
        onTextChange={(t) => updateInput({ liquidationPrice: t })}
      />
      <FormInput
        title='Boost Rate: '
        value={input.rate}
        onTextChange={(t) => updateInput({ rate: t })}
      />
      <FormInput
        title='Boost End Time: '
        value={input.endTime}
        onTextChange={(t) => updateInput({ endTime: t })}
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