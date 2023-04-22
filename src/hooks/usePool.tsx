import { useState } from 'react'
import { useAccount, useContractReads, useProvider, useSigner } from 'wagmi';
import { ERC_721_ABI, UNI_BOOST_ABI } from '../config/abi';
import { BigNumber, Contract, ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils.js';
import { sendTxAndWait } from '../utils/utils';



const UNI_BOOST_ADDRESS = import.meta.env.VITE_APP_UNI_BOOST_ADDRESS

const usePool = (poolSetting: PoolSetting) => {
  const { address } = useAccount()


  const [pool, setPool] = useState<Pool>()
  const [NFTManager, setNFTManager] = useState({ isApproved: false });

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
    }],
    onSuccess
  })

  //* ////////////////////////////

  const ContractNFT = {
    address: '0xFc3d86E2F5cd3d82f488735E4D163AcE5Cfaa3e3' as `0x${string}`,
    abi: ERC_721_ABI,
  } as const

  const { refetch: refetchNFT } = useContractReads({
    contracts: [{
      ...ContractNFT,
      functionName: 'isApprovedForAll',
      args: [address, UNI_BOOST_ADDRESS]
    }],
    onSuccess: (data: [boolean]) => {
      setNFTManager({ isApproved: data[0] })
    }
  })
  //* ////////////////////////////


  const { data: signer } = useSigner()
  const UNI_BOOST = new Contract(UNI_BOOST_ADDRESS, UNI_BOOST_ABI.abi, signer!)
  const NFT_MANAGER = new Contract('0xFc3d86E2F5cd3d82f488735E4D163AcE5Cfaa3e3', ERC_721_ABI, signer!)

  const stakeLP = async (id: string) => {
    await sendTxAndWait(UNI_BOOST, 'stakeLP', [id])
  }

  const approve = async () => {
    await sendTxAndWait(NFT_MANAGER, 'setApprovalForAll', [UNI_BOOST_ADDRESS, true])
    refetchNFT()
    refetchPool()
  }

  return {
    pool,
    isLoading: isFetching,
    isApproved: NFTManager.isApproved,
    stakeLP,
    approve
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

