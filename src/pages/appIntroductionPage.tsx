import { memo } from "react";
import { Flex } from "@chakra-ui/react";
import { Head } from "../components/templates/Head";
import FirstPageFooterLayout from "../components/templates/FirstPageFooterLayout";
import { AppIntroductionImage } from "../components/organism/AppIntroductionImage";
import { AppIntroduction } from "../components/organism/AppIntroduction";
import { NextPage } from "next";

const AppIntroductionPage: NextPage = memo(() => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>IntroducePage -Note me</title>
			</Head>
			<FirstPageFooterLayout>
				<Flex>
					<AppIntroductionImage />
					<AppIntroduction />
				</Flex>
			</FirstPageFooterLayout>
		</>
	);
});
export default AppIntroductionPage;
