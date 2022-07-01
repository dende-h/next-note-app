import { Link, HStack, Center, Box, Stack } from "@chakra-ui/react";
import { memo } from "react";

export const TitleFooter = memo(() => {
	return (
		<>
			<Center bg={"teal.100"} h={"150px"} padding={10}>
				<Stack>
					<Box textAlign={"center"} fontSize={"30px"} fontFamily={"Century Gothic"} color={"blackAlpha.700"}>
						Info My Portfolio and SNS
					</Box>
					<HStack
						color={"blackAlpha.600"}
						fontSize={["15px", "20px", "25px"]}
						spacing={["20px", "30px", "100px"]}
						textAlign={"center"}
					>
						<Link href="https://github.com/dende-h" isExternal={true}>{`DenDe's Github page`}</Link>
						<Link href="https://twitter.com/dende49592814" isExternal={true}>
							Twitter
						</Link>
						<Link href="https://qiita.com/dende-h" isExternal={true}>
							Qiita My page
						</Link>
						<Link
							href="https://perpetual-hemisphere-7a3.notion.site/My-Portfolio-b03392c7d5cf4ed6a3d5615bba1bb51e"
							isExternal={true}
						>{`Development memo's`}</Link>
						<Link href="https://app.build-up.info/portfolio/b5UTNgoTd" isExternal={true}>{`BuildUp portfolio`}</Link>
					</HStack>
				</Stack>
			</Center>
		</>
	);
});
