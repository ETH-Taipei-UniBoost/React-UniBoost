import { FormCard } from './FormCard'
import FormInput from './FormInput'
import { useState } from 'react';

const ClostRoundForm = () => {
  const [poolAddress, setPoolAddress] = useState('');

  return (
    <FormCard title='Close Boost Round'>
      <FormInput
        title='Pool Address: '
        type='text'
        value={poolAddress}
        onTextChange={(text) => setPoolAddress(text)}
      />
    </FormCard>
  )
}

export default ClostRoundForm