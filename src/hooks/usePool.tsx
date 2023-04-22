import { useState } from 'react'
import { useContractReads } from 'wagmi';
import { UNI_BOOST_ABI } from '../config/abi';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils.js';

const UNI_BOOST_ADDRESS = import.meta.env.VITE_APP_UNI_BOOST_ADDRESS

const usePool = (poolSetting: PoolSetting) => {

  const [pool, setPool] = useState<Pool>()

  const onSuccess = (data: Data) => {
    if (data.some(i => !i)) return setPool(undefined)

    setPool({
      id: poolSetting.address,
      address: poolSetting.address,
      name: poolSetting.name,
      fee: String(data[0].fee * 0.0001),
      boostRate: data[1].data.boostRate,
      rewardRemaining: formatEther(data[1].data.boostRewardBalance),
      rewardToken: poolSetting.rewardToken,
      insurance: formatEther(data[1].data.insuranceBalance),
      insuranceToken: poolSetting.insuranceToken,
      boostEnds: data[1].data.boostEndTime,
    })
  }

  const contract = {
    address: UNI_BOOST_ADDRESS as `0x${string}`,
    abi: UNI_BOOST_ABI.abi,
  } as const

  const { isFetching } = useContractReads({
    contracts: [{
      ...contract,
      functionName: 'getPoolInfo',
      args: [poolSetting.address]
    }, {
      ...contract,
      functionName: 'getBoostRoundData',
      args: [poolSetting.address]
    }],
    onSuccess
  })

  return {
    pool,
    isLoading: isFetching
  }
}

export default usePool

interface PoolInfo {
  isValidBoostInfo: boolean
  fee: number
  token0: string
  token1: string
  isToken0Healthy: boolean
  isToken1Healthy: boolean
}

interface PoolRoundData {
  index: BigNumber
  data: {
    fee: number
    incentivizer: string
    boostEndTime: string
    boostRate: string
    insuranceTriggerPriceInTick: string
    boostRewardBalance: BigNumber
    insuranceBalance: BigNumber
    totalInsuranceWeight: BigNumber
  }
}

type Data = [
  PoolInfo,
  PoolRoundData
]

export interface PoolSetting {
  id: string
  address: string
  name: string
  fee: string
  rewardToken: string
  insuranceToken: string
}

export interface Pool {
  id: string
  address: string
  name: string
  fee: string
  boostRate: string
  rewardRemaining: string
  rewardToken: string
  insurance: string
  insuranceToken: string
  boostEnds: string
}

