import { TabList, Tab, Tabs, TabPanels, TabPanel, VStack } from "@chakra-ui/react";
import useIsPrivatePage from "../hooks/useIsPrivatePage";
import ClostRoundForm from "../components/ClostRoundForm";
import AddFundForm from "../components/AddFundForm";
import EnableBoostForm from "../components/EnableBoostForm";

export default function Boost() {
  useIsPrivatePage(true)
  return (
    <Tabs isFitted>
      <TabList>
        <Tab>Enable Boost</Tab>
        <Tab>Add Fund</Tab>
        <Tab>Close Boost Round</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <EnableBoostForm />
        </TabPanel>

        <TabPanel>
          <VStack spacing={10}>
            <AddFundForm />
          </VStack>
        </TabPanel>

        <TabPanel>
          <ClostRoundForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

