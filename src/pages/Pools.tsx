import { Box, Button, Card, Collapse, Flex, Grid, Input, SimpleGrid, Text } from "@chakra-ui/react";
import useIsPrivatePage from "../hooks/useIsPrivatePage";
import { formatDate, roundString } from "../utils/utils";
import { FC, useState } from "react";
import usePool, { PoolSetting } from "../hooks/usePool";

export default function Pools() {
  useIsPrivatePage(true)

  return (
    <Flex flexDir={'column'} p={'40px'} gap={6} overflow={'scroll'} w='100%' >
      {MOCK_POOLS.map(pool => (
        <PoolCard key={pool.id} poolSetting={pool} />
      ))}
    </Flex>
  )
}








interface PoolCardProp {
  poolSetting: PoolSetting
}

const PoolCard: FC<PoolCardProp> = ({ poolSetting }) => {
  const { pool, stakeLP, isApproved, approve } = usePool(poolSetting)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const toggleForm = () => setOpen(prev => !prev)

  const onStake = async () => {
    try {
      await stakeLP(value)
    } catch (e) {
      console.log(e)
    }
  }

  if (!pool) return null
  const { id, address, name, fee, boostRate, rewardRemaining, rewardToken, insurance, insuranceToken, boostEnds, liquidatePrice } = pool
  return (
    <Card key={id} p={4} w={'100%'} minW={'760px'} maxW={'1280px'} m={'auto'}>
      <Grid templateColumns={'88px 88px 1fr 1fr 1fr 1fr 100px'} alignItems={'center'}>
        <Box>
          <Text>{name}</Text>
          <Text>{fee}%</Text>
        </Box>
        <Box>
          <Text fontSize={'sm'} color={'gray'}>{rewardToken} APR</Text>
          <Text>{boostRate}x</Text>
        </Box>
        <Box>
          <Text fontSize={'sm'} color={'gray'}>Reward Remaining</Text>
          <Text fontSize={'15px'}>{rewardRemaining} {rewardToken}</Text>
        </Box>
        <Box>
          <Text fontSize={'sm'} color={'gray'}>Insurance</Text>
          <Text fontSize={'15px'}>{insurance} {insuranceToken}</Text>
        </Box>
        <Box>
          <Text fontSize={'sm'} color={'gray'}>Ends At</Text>
          <Text fontSize={'15px'}>{formatDate(boostEnds)}</Text>
        </Box>
        <Box>
          <Text fontSize={'sm'} color={'gray'}>Liquidate Price</Text>
          <Text fontSize={'15px'}>{roundString(liquidatePrice, 6)}</Text>
        </Box>
        <Button onClick={toggleForm}>Expand</Button>
      </Grid>

      <Collapse in={open}>
        <SimpleGrid columns={2} w={'100%'} gap={'16px'} p={'16px'} mt={5} bg={'gray.50'} alignItems={'stretch'}>
          <Input placeholder="token id" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          {
            isApproved
              ? <Button bg={'gray.200'} onClick={onStake}>Stake</Button>
              : <Button bg={'gray.200'} onClick={approve}>Approve</Button>
          }
        </SimpleGrid>
      </Collapse>
    </Card>
  )
}


const MOCK_POOLS: PoolSetting[] = [
  {
    id: '1',
    address: '0x5b98B0bBCBA43e8C63215BCBE5D98638eAe7cC8c',
    name: 'WBTC/RKT',
    fee: '0.3%',
    rewardToken: 'RKT',
    insuranceToken: 'WBTC',
  },
  {
    id: '2',
    address: '0x78B05EA36bf73BB22f88230FEa4aE536417D7Ee1',
    name: 'WBTC/DEV',
    fee: '1%',
    rewardToken: 'DEV',
    insuranceToken: 'WBTC',
  },
  {
    id: '3',
    address: '0x493D28D4264F2c309DD3207352D93E4dd4977c43',
    name: 'USDC/RKT',
    fee: '0.05%',
    rewardToken: 'RKT',
    insuranceToken: 'USDC'
  },
  {
    id: '4',
    address: '0x1A973e7B9207153F3450A3aD85145294c345738d',
    name: 'DAI/RKT',
    fee: '0.3%',
    rewardToken: 'RKT',
    insuranceToken: 'USDC'
  },
]