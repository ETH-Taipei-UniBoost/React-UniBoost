import { FormCard } from './FormCard'
import FormInput from './FormInput'
import { useState } from 'react'
import useAddReward from '../hooks/useAddReward'
import useTeaToast from '../hooks/useTeaToast'
import { Heading } from '@chakra-ui/react'

const AddFundForm = () => {
  const [input, setInput] = useState<Input>({
    pool: '',
    rewardAmount: '',
    insuranceAmount: ''
  });

  const updateInput = (field: Partial<Input>) => {
    setInput({ ...input, ...field })
  }

  const { canToast, successToast, errorToast } = useTeaToast()

  const onSuccess = () => {
    if (!canToast) return
    successToast('Transaction Success!')
  }
  const onFail = () => {
    if (!canToast) return
    errorToast('Transaction Failed!')
  }
  const args = [input.pool, input.rewardAmount, input.insuranceAmount]
  const { data, addReward } = useAddReward({ args, onSuccess, onFail })

  const onSubmit = async () => {
    if (!addReward) return
    try {
      addReward()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <FormCard title="Add Fund" onSubmit={onSubmit}>
      <FormInput
        title='Pool Address: '
        type="text"
        value={input.pool}
        onTextChange={(text) => updateInput({ pool: text })}
      />
      <FormInput
        title='Reward Amount: '
        value={input.rewardAmount}
        onTextChange={(text) => updateInput({ rewardAmount: text })}
      />
      <FormInput
        title='Insurance Amount: '
        value={input.insuranceAmount}
        onTextChange={(text) => updateInput({ insuranceAmount: text })}
      />
    </FormCard>
  )
}

export default AddFundForm

interface Input {
  pool: string
  rewardAmount: string
  insuranceAmount: string
}