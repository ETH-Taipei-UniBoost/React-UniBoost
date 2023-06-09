import { Box, Button, Card, Collapse, Flex, Grid, Input, SimpleGrid, Text } from "@chakra-ui/react";
import useIsPrivatePage from "../hooks/useIsPrivatePage";
import { MOCK_POOLS } from "./Pools";
import { FC, useState } from "react";
import usePool, { PoolSetting } from "../hooks/usePool";
import { formatDate, roundString } from "../utils/utils";
import useStakedPool from "../hooks/useStakedPool";
import useTeaToast from "../hooks/useTeaToast";
import { getLocalStorage, removeStakedTokenId } from "../utils/storageHelper";

export default function Staked() {
  useIsPrivatePage(true)



  return (
    <Flex flexDir={'column'} p={'40px'} gap={6} overflow={'scroll'} w='100%' >
      {MOCK_POOLS.map(pool => {
        const data = getLocalStorage()
        if (!data[pool.address]) return null
        return data[pool.address].map((tokenId: string) => (
          <StakedPoolCard key={pool.id} poolSetting={pool} tokenId={tokenId} />
        ))
      })}
    </Flex>
  )
}


interface StakedPoolCardProp {
  poolSetting: PoolSetting,
  tokenId: string
}

const StakedPoolCard: FC<StakedPoolCardProp> = ({ poolSetting, tokenId }) => {
  const { pool, unstakeLP, claimReward } = useStakedPool(poolSetting, tokenId)

  const [open, setOpen] = useState(false);
  const toggleForm = () => setOpen(prev => !prev)
  const { successToast, errorToast } = useTeaToast()


  if (!pool) return null

  const onUnstake = async () => {
    try {
      await unstakeLP(tokenId)
      successToast('Stake successful.')
      removeStakedTokenId(poolSetting.address, tokenId)
    } catch (e) {
      console.log(e)
      errorToast('Something wrong.')
    }
  }
  const onClaim = async () => {
    try {
      await claimReward(tokenId)
      successToast('Claim successful.')
    } catch (e) {
      console.log(e)
      errorToast('Something wrong.')
    }
  }
  const { id, address, name, fee, boostRate, rewardToken, stakedTime, lastClaimTime } = pool
  return (
    <Card key={id} p={4} w={'100%'} minW={'760px'} maxW={'1280px'} m={'auto'}>
      <Grid templateColumns={'100px 120px 100px 1fr 1fr 100px'} alignItems={'center'}>
        <Box>
          <Text>{name}</Text>
          <Text>{fee}%</Text>
        </Box>
        <Box>
          <Text fontSize={'sm'} color={'gray'}>Boost Factor</Text>
          <Text>{boostRate}x</Text>
        </Box>
        <Box>
          <Text fontSize={'sm'} color={'gray'}>Token ID</Text>
          <Text fontSize={'15px'}>{tokenId}</Text>
        </Box>
        <Box>
          <Text fontSize={'sm'} color={'gray'}>Stake Time</Text>
          <Text fontSize={'15px'}>{formatDate(stakedTime, 'yyyy-mm-dd HH:MM:ss')}</Text>
        </Box>
        <Box>
          <Text fontSize={'sm'} color={'gray'}>lastClaim Time</Text>
          <Text fontSize={'15px'}>{formatDate(lastClaimTime, 'yyyy-mm-dd HH:MM:ss')}</Text>
        </Box>
        <Button onClick={toggleForm}>Expand</Button>
      </Grid>

      <Collapse in={open}>
        <SimpleGrid columns={2} w={'100%'} gap={'16px'} p={'16px'} mt={5} bg={'gray.50'} alignItems={'stretch'}>
          <Button bg={'gray.200'} onClick={onClaim}>Claim</Button>
          <Button bg={'gray.200'} onClick={onUnstake}>Unstake</Button>
        </SimpleGrid>
      </Collapse>
    </Card>
  )
}