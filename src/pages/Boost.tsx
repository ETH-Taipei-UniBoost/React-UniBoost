import { TabList, Tab, Tabs, TabPanels, TabPanel, VStack } from "@chakra-ui/react";
import useIsPrivatePage from "../hooks/useIsPrivatePage";
import ClaimForm from "../components/ClaimForm";
import AddRewardForm from "../components/AddRewardForm";
import EnableBoostForm from "../components/EnableBoostForm";
import AddInsuranceForm from "../components/AddInsuranceForm";

export default function Boost() {
  useIsPrivatePage(true)
  return (
    <Tabs isFitted>
      <TabList>
        <Tab>Enable Boost</Tab>
        <Tab>Add Reward</Tab>
        <Tab>Close Boost Round</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <EnableBoostForm />
        </TabPanel>

        <TabPanel>
          <VStack spacing={10}>
            <AddRewardForm />
            <AddInsuranceForm />
          </VStack>
        </TabPanel>

        <TabPanel>
          <ClaimForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

