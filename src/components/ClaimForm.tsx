import { FormCard } from './FormCard'
import FormInput from './FormInput'
import { useState } from 'react';

const ClaimForm = () => {
  const [poolAddress, setPoolAddress] = useState('');

  return (
    <FormCard title='Close Boost Round'>
      <FormInput
        title='Pool Address: '
        value={poolAddress}
        onTextChange={(text) => setPoolAddress(text)}
      />
    </FormCard>
  )
}

export default ClaimForm