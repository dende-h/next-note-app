import { Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react";
import { ReactNode, VFC } from "react";
import { useRecoilState } from "recoil";
import { tabIndexState } from "../../globalState/category/tabIndexState";

type Props = {
	children: ReactNode;
};

export const CategoryTab: VFC<Props> = (props: Props) => {
	const { children } = props;
	const colors = useColorModeValue(
		["red.50", "teal.50", "blue.50", "purple.50"],
		["red.900", "teal.900", "blue.900", "purple.900"]
	);
	const [tabIndex, setTabIndex] = useRecoilState(tabIndexState);
	const bg = colors[tabIndex];
	return (
		<Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
			<TabList fontFamily={"cursive"}>
				<Tab>All</Tab>
				<Tab>Memo</Tab>
				<Tab>Schedule</Tab>
				<Tab>Todo</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>{children}</TabPanel>
				<TabPanel>{children}</TabPanel>
				<TabPanel>{children}</TabPanel>
				<TabPanel>{children}</TabPanel>
			</TabPanels>
		</Tabs>
	);
};
