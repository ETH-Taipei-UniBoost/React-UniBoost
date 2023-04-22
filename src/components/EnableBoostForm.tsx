import { useState } from 'react';
import { FormCard } from './FormCard'
import FormInput from './FormInput'
import { Contract } from 'ethers';
import { useAccount, useSigner } from 'wagmi';
import { UNI_BOOST_ABI } from '../config/abi';
import { Dec, formatDate, sendTxAndWait } from '../utils/utils';
import { parseEther } from 'ethers/lib/utils.js';

const UNI_BOOST_ADDRESS = import.meta.env.VITE_APP_UNI_BOOST_ADDRESS

const EnableBoostForm = () => {
  const [input, setInput] = useState<Input>({
    pool: '',
    boostAmount: '',
    insuranceAmount: '',
    liquidationPriceInTick: '',
    boostRate: '',
    boostEndTime: '',
  });

  const updateInput = (field: Partial<Input>) => {
    setInput({ ...input, ...field })
  }

  const { address } = useAccount()
  const { data: signer } = useSigner()
  const UNI_BOOST = new Contract(UNI_BOOST_ADDRESS, UNI_BOOST_ABI.abi, signer!)

  const enableBoost = async () => {
    try {
      await sendTxAndWait(UNI_BOOST, 'enableBoost', [
        input.pool,
        parseEther(input.boostAmount),
        parseEther(input.insuranceAmount),
        input.liquidationPriceInTick,
        input.boostRate,
        input.boostEndTime
      ])
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <FormCard title='Enable Boost' onSubmit={() => { enableBoost() }}>
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
        value={input.liquidationPriceInTick}
        helper={input.liquidationPriceInTick
          ? 'Liquidation Price: ' + String(Dec('1').div(Dec('1.0001').pow(Dec(input.liquidationPriceInTick))))
          : '-'}
        onTextChange={(t) => updateInput({ liquidationPriceInTick: t })}
      />
      <FormInput
        title='Boost Rate: '
        value={input.boostRate}
        helper='500000 for 1.5x'
        onTextChange={(t) => updateInput({ boostRate: t })}
      />
      <FormInput
        title='Boost End Time: '
        value={input.boostEndTime}
        helper={input.boostEndTime ? formatDate(input.boostEndTime) : 'xxxx-xx-xx'}
        onTextChange={(t) => updateInput({ boostEndTime: t })}
      />
    </FormCard>
  )
}

export default EnableBoostForm

interface Input {
  pool: string
  boostAmount: string
  insuranceAmount: string
  liquidationPriceInTick: string
  boostRate: string
  boostEndTime: string
}