import { useContractReads } from 'wagmi'
import { UNI_BOOST_ABI } from '../config/abi'

const usePoolInfo = () => {

  const contract = {
    address: '0xaaaaa',
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

  return {
    data,
    isLoading
  }
}

export default usePoolInfo