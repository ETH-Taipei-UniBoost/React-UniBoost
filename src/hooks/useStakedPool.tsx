import { useEffect, useState } from 'react'
import { useAccount, useContractReads, useSigner } from 'wagmi';
import { ERC_721_ABI, UNI_BOOST_ABI } from '../config/abi';
import { BigNumber, Contract } from 'ethers';
import { Dec, sendTxAndWait } from '../utils/utils';



const UNI_BOOST_ADDRESS = import.meta.env.VITE_APP_UNI_BOOST_ADDRESS

const useStakedPool = (poolSetting: PoolSetting, tokenId?: string) => {
  const { address } = useAccount()


  const [pool, setPool] = useState<StakedPool>()
  const [NFTManager, setNFTManager] = useState({ isApproved: false });

  const onSuccess = (data: Data) => {
    if (data.some(i => !i)) return setPool(undefined)

    setPool({
      id: poolSetting.address,
      address: poolSetting.address,
      name: poolSetting.name,
      fee: String(data[0].fee * 0.0001),
      boostRate: String(data[1].data.boostRate * 0.000001 + 1),
      rewardToken: poolSetting.rewardToken,
      stakedTime: data[2].stakedTime.toString(),
      lastClaimTime: data[2].lastClaimTime.toString()
    })
  }
  const PoolContract = {
    address: UNI_BOOST_ADDRESS as `0x${string}`,
    abi: UNI_BOOST_ABI.abi,
  } as const

  const { isFetching, refetch: refetchPool } = useContractReads({
    contracts: [{
      ...PoolContract,
      functionName: 'getPoolInfo',
      args: [poolSetting.address]
    }, {
      ...PoolContract,
      functionName: 'getBoostRoundData',
      args: [poolSetting.address]
    }, {
      ...PoolContract,
      functionName: 'stakedTokenInfoMap',
      args: ['2']
    }],
    onSuccess
  })

  //* ////////////////////////////


  const { data: signer } = useSigner()
  const UNI_BOOST = new Contract(UNI_BOOST_ADDRESS, UNI_BOOST_ABI.abi, signer!)
  const NFT_MANAGER = new Contract('0xFc3d86E2F5cd3d82f488735E4D163AcE5Cfaa3e3', ERC_721_ABI, signer!)

  const unstakeLP = async (id: string) => {
    await sendTxAndWait(UNI_BOOST, 'unstakeLP', [id])
  }

  const claimReward = async (id: string) => {
    await sendTxAndWait(UNI_BOOST, 'claimReward', [id])
  }


  return {
    pool,
    isLoading: isFetching,
    isApproved: NFTManager.isApproved,
    unstakeLP,
    claimReward
  }
}

export default useStakedPool

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
    boostRate: number
    insuranceTriggerPriceInTick: string
    boostRewardBalance: BigNumber
    insuranceBalance: BigNumber
    totalInsuranceWeight: BigNumber
  }
}

interface StakedInfo {
  insuranceWeight: BigNumber
  lastClaimTime: BigNumber
  owner: string
  pool: string
  stakedTime: BigNumber
}

type Data = [
  PoolInfo,
  PoolRoundData,
  StakedInfo
]

export interface PoolSetting {
  id: string
  address: string
  name: string
  fee: string
  rewardToken: string
  insuranceToken: string
}

export interface StakedPool {
  id: string
  address: string
  name: string
  fee: string
  boostRate: string
  rewardToken: string
  stakedTime: string
  lastClaimTime: string
}

