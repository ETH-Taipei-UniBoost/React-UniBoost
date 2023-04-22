import { Box, Button, Card, Flex, Grid, Text } from "@chakra-ui/react";
import useIsPrivatePage from "../hooks/useIsPrivatePage";
import { formatDate } from "../utils/utils";

export default function Pools() {
  useIsPrivatePage(true)
  return (
    <Flex flexDir={'column'} p={'40px'} gap={6} overflow={'scroll'} w='100%' >
      {data.map(pool => (
        <Card key={pool.id} p={4} w={'100%'} minW={'760px'} maxW={'1280px'} m={'auto'}>
          <Grid templateColumns={'100px 80px 60px 1fr 1fr 1fr 1fr'} alignItems={'center'}>
            <Text>{pool.name}</Text>
            <Text>{pool.fee}</Text>
            <Text>{pool.boostRate}</Text>
            <Box>
              <Text fontSize={'sm'} color={'gray'}>Reward Remaining</Text>
              <Text>{pool.rewardRemaining} {pool.rewardToken}</Text>
            </Box>
            <Box>
              <Text fontSize={'sm'} color={'gray'}>Insurance</Text>
              <Text>{pool.insurance} {pool.insuranceToken}</Text>
            </Box>
            <Box>
              <Text fontSize={'sm'} color={'gray'}>Ends At</Text>
              <Text>{formatDate(pool.boostEnds)}</Text>
            </Box>
            <Button>Stake</Button>
          </Grid>
        </Card>
      ))}
    </Flex>
  )
}

interface Pool {
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

const data: Pool[] = [
  {
    id: '1',
    address: '0x12345',
    name: 'AAA/ETH',
    fee: '0.05%',
    boostRate: '1.5x',
    rewardRemaining: '50000',
    rewardToken: 'AAA',
    insurance: '40000',
    insuranceToken: 'ETH',
    boostEnds: '1697968800',
  },
  {
    id: '2',
    address: '0x12345',
    name: 'BBB/ETH',
    fee: '0.05%',
    boostRate: '1.5x',
    rewardRemaining: '50000',
    rewardToken: 'BBB',
    insurance: '40000',
    insuranceToken: 'ETH',
    boostEnds: '1697868800',
  },
  {
    id: '3',
    address: '0x12345',
    name: 'CCC/ETH',
    fee: '0.05%',
    boostRate: '1.5x',
    rewardRemaining: '50000',
    rewardToken: 'CCC',
    insurance: '40000',
    insuranceToken: 'ETH',
    boostEnds: '1698968800',
  },
]