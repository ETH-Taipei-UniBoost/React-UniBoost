import { FormCard } from './FormCard'
import FormInput from './FormInput'
import { useState } from 'react'
import useAddReward from '../hooks/useAddReward'
import useTeaToast from '../hooks/useTeaToast'
import { Heading } from '@chakra-ui/react'

const AddRewardForm = () => {
  const [amount, setAmount] = useState('');

  const { canToast, successToast, errorToast } = useTeaToast()

  const onSuccess = () => {
    if (!canToast) return
    successToast('Transaction Success!')
  }
  const onFail = () => {
    if (!canToast) return
    errorToast('Transaction Failed!')
  }

  const { data } = useAddReward({ args: [], onSuccess, onFail })

  return (
    <FormCard title="Add Reward" onSubmit={() => { onSuccess() }}>
      <FormInput
        title='Amount: '
        value={amount}
        onTextChange={(text) => setAmount(text)}
      />
    </FormCard>
  )
}

export default AddRewardForm