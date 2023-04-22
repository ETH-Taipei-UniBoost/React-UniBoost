import { Contract } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import { useAccount, useSigner } from 'wagmi';
import { UNI_BOOST_ABI } from '../config/abi';
import { sendTxAndWait } from '../utils/utils';
import { FormCard } from './FormCard'
import FormInput from './FormInput'
import { useState } from 'react';

const UNI_BOOST_ADDRESS = import.meta.env.VITE_APP_UNI_BOOST_ADDRESS

const ClostRoundForm = () => {
  const [poolAddress, setPoolAddress] = useState('');

  const { address } = useAccount()
  const { data: signer } = useSigner()
  const UNI_BOOST = new Contract(UNI_BOOST_ADDRESS, UNI_BOOST_ABI.abi, signer!)

  const closeBoost = async () => {
    try {
      await sendTxAndWait(UNI_BOOST, 'closeCurrentBoostRound', [
        poolAddress
      ])
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <FormCard title='Close Boost Round' onSubmit={() => { closeBoost() }}>
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