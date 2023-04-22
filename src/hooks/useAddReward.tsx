import { BigNumber } from 'ethers'
import { UNI_BOOST_ABI } from '../config/abi'
import { useContractReads, useContractWrite, usePrepareContractWrite } from 'wagmi'
interface Prop {
  args: unknown[]
  onSuccess: () => void
  onFail: () => void
}
const UNI_BOOST_ADDRESS = import.meta.env.VITE_APP_UNI_BOOST_ADDRESS

const useAddReward = ({ args, onSuccess, onFail }: Prop) => {
  const contract = {
    address: UNI_BOOST_ADDRESS,
    abi: UNI_BOOST_ABI.abi,
  } as const

  const { data, isLoading } = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: 'getPoolInfo',
      }
    ],
  })


  const { config } = usePrepareContractWrite({
    ...contract,
    functionName: 'addFund',
    args: args,
    onSuccess: onSuccess,
    enabled: args.map(i => i).length === 3,
    onError: () => { }
  })
  const { data: receipt,
    isLoading: isWriting,
    isSuccess: isWriteSuccess,
    writeAsync: addReward
  } = useContractWrite(config)


  return {
    data: data as [PoolInfo],
    receipt,
    isLoading,
    isWriting,
    isWriteSuccess,
    addReward
  }
}

export default useAddReward

interface PoolInfo {
  isValidBoostPool: boolean
  fee: BigNumber
  token0: string
  token1: string
  isToken0Healthy: boolean
  isToken1Healthy: boolean
}