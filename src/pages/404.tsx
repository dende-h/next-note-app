import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";

import { PrimaryButton } from "../components/atoms/PrimaryButton";
import { Head } from "../components/templates/Head";

const Custom404 = memo(() => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>404Page -Note me</title>
			</Head>
			<Box
				backgroundImage={`/Na_June_67.jpg`}
				backgroundPosition="top"
				backgroundSize="cover"
				textAlign={"center"}
				w="100%"
				h={"1100px"}
			>
				<Box>
					<a href="https://jp.freepik.com/vectors/computer">
						Jcomp - jp.freepik.com によって作成された computer ベクトル
					</a>
				</Box>
				<Box>
					<PrimaryButton bgColor={"cyan.600"} color={"white"}>
						<Link href="/">
							<Text as="a">Topへ戻る</Text>
						</Link>
					</PrimaryButton>
				</Box>
			</Box>
		</>
	);
});
export default Custom404;
